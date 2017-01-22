import  {forEach} from '../util';
import enhance from './modules/raphaelEnhance'
import nodeShapeRelative from  './renderModule/nodeShapeRelative'
import ChildrenRenderFactory from './renderModule/ChildrenRenderFactory'
import EdgeDraw from './modules/EdgeDraw'
import NodeModel from './schema/nodeModal'
let Raphael = require('raphael');



function Renderer({canvasId}){

    this.canvasDom = document.getElementById(canvasId);
    this.paper = new Raphael(this.canvasDom);

    //Raphael Extension  &&  Custom Attr Value
    enhance(this.paper);
}

Renderer.prototype = {

    constructor: Renderer,

    /**
     * 渲染NodeModel到Paper Canvas(效果:思维导图节点&&父边)
     * @param nodeModel
     * @private
     */
    renderNodeModel: function(nodeModel){

        if(nodeModel.shape){
            nodeModel.shape[0].remove();
            nodeModel.shape[1].remove();
        }

        var paper = this.paper;
        var label = paper.text(nodeModel.x, nodeModel.y, nodeModel.label);
        var rect = paper.rect(nodeModel.x, nodeModel.y,
            NodeModel.DEFAULT_WIDTH,NodeModel.DEFAULT_HEIGHT, 4)
            .data('id', nodeModel.id);

        label.toFront();

        nodeModel.shape = paper.set().push(label).push(rect);
        nodeModel.shape.nodeShape(nodeModel);

        let fatherEdgeModel = nodeModel.connectFather;
        if(fatherEdgeModel){
            EdgeDraw.create(fatherEdgeModel).render();
            //EdgeDraw(fatherEdgeModel).drawEdge();
        }

        //绑定相关监听事件
        nodeModel.listener().dblclick(function(event){
            var {x,y,fill} = this.attr();
            var fontSize = this.attr()['font-size'];
            var fontFamily = this.attr()['font-family'];

            var paper = this.paper;
            var viewBoxX =   0;
            var viewBoxY =   0;

            if(paper._viewBox){
                viewBoxX = paper._viewBox[0];
                viewBoxY = paper._viewBox[1];
            }

            var width = this[0].clientWidth;
            var height = this[0].clientHeight;

            //input 绝对定位为
            var left = x-width/2-viewBoxX;
            var top = y-height/2-viewBoxY;
            var inputEle = document.createElement('input');
            inputEle.setAttribute('value',this.attr('text'));
            inputEle.setAttribute('type','text');
            inputEle.setAttribute('id','tempText');
            inputEle.style.position = 'absolute';
            inputEle.style.top = top+'px';
            inputEle.style.left = left+'px';
            inputEle.style.border = 'none';
            inputEle.style.lineHeight = '1';
            inputEle.style.fontSize = fontSize+'px';
            inputEle.style.fontFamily = fontFamily;
            inputEle.style.color = fill;
            inputEle.style.backgroundColor = 'transparent';
            inputEle.style.zIndex = '1000';
            inputEle.style.width = width+'px';

            var mindmapCanvas = document.getElementById('mindmap-canvas');
            mindmapCanvas.appendChild(inputEle);
            this.attr({text:''});
            $(inputEle).focus();
        });

        nodeModel.shape.mousedown(function(){
            nodeModel.graph.setSelected(nodeModel);
        });

        nodeModel.shape.mousedown(function(event){
            nodeModel.graph._listener().beginDrag(event);
        });
        nodeModel.shape.mousemove(function(event){
            nodeModel.graph._listener().dragging(event);
        });
        nodeModel.shape.mouseup(function(event){
            nodeModel.graph._listener().endDrag(event);
        });
    },

    /**
     * 删除节点渲染
     * 需要先断开父节点的children和connectChildren连接才能重新调整当前节点层的节点
     * @param node
     */
    removeNode: function(node){
        this._removeNodeModelShape(node);
        //删除节点后,重新计算并渲染所删除节点的同级节点(为了调整位置)
        this._reRenderChildrenNode(node.father);
        if(node.father){
            if(node.father.childrenCount() > 0 || node.childrenCount() > 1){
                //删除节点后,重新计算并递归渲染所删节点的父节点的同级节点(为了调整位置)
                this._resetBrotherPosition(node.father, -nodeShapeRelative.getNodeAreaHeight(node));
            }
        }
    },

    /**
     * 选择节点时的渲染
     * @param node 被选中的节点
     * @param oldSelected: 之前被选中的节点
     */
    setSelectedRender: function(node, oldSelected){
        if(node && node.shape){
            node.shape.selectedShape();
        }
        if(oldSelected && oldSelected.shape){
            oldSelected.shape.unSelectedShape(oldSelected);
        }
    },
    /**
     * 重新设置当前节点的子节点的位置
     * @param node 当前节点
     * @private
     */
    _reRenderChildrenNode: function(nodeModel){
        var childrenRenderStrategy = ChildrenRenderFactory.createRenderStrategy(nodeModel);
        childrenRenderStrategy.reRenderChildrenNode(nodeModel);
    },

    /**
     * 调整当前节点的兄弟节点的位置
     * @params node 当前节点
     * @params nodeAreaHeight 需要调整的高度(一般为最初改变的节点的高度的一半)
     */
    _resetBrotherPosition: function(node, nodeAreaHeight){
        var brother,  //同级节点
            brotherY,   //兄弟节点的高度
            curY = node.y,  //当前节点的高度
            moveY = nodeAreaHeight / 2; //需要移动的高度

        //移动兄弟节点
        if(node.father){
            forEach(node.father.children, function(brother){
                //当同级结点与当前结点direction相同时才上下移动
                if(brother.direction === node.direction){
                    if(brother !== node){
                        brotherY = brother.y;
                        //如果兄弟节点在当前节点的上面,则向上移动
                        if(brotherY < curY){
                            brother.translate(0, -moveY);
                        }
                        //否则,向下移动
                        else{
                            brother.translate(0, moveY);
                        }
                    }
                }
            });

        }

        //递归父节点
        if(node.father){
            this._resetBrotherPosition(node.father, nodeAreaHeight);
        }

    },
    /**
     * 递归删除节点的shape
     * @param node
     * @private
     */
    _removeNodeModelShape: function(node){
        var self = this;
        //删除节点和边的shape
        if(node.shape){
            node.shape.remove();
            node.shape = null;
        }
        if(node.connectFather.shape){
            node.connectFather.shape.remove();
            node.connectFather = null;
        }

        forEach(node.children, function(child){
            self._removeNodeModelShape(child);
        });
    },

    /**
     * 设置node的拖动
     * @param node
     * @private
     */
    _setDrag: function(node){
        var DragHandle = Drag(node, {
            viewportHandle: this.viewportHandle
        });

        DragHandle.setDrag();
    }
};


export default Renderer;