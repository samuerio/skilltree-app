import  {forEach} from '../util';
import shapeCustomAttr from './renderModule/shapeCustomAttr'
import nodeShapeRelative from  './renderModule/nodeShapeRelative'
import ChildrenRenderFactory from './renderModule/ChildrenRenderFactory'
import Drag from './renderModule/Drag'
import Viewport from './renderModule/Viewport'
import EdgeDraw from './renderModule/EdgeDraw'
import NodeModel from './schema/node'
let Raphael = require('raphael');



function Renderer(options){

    this.canvasDom = document.getElementById(options.canvasId);
    this.paper = new Raphael(this.canvasDom);

    //视窗拉拽事件
    this.viewportHandle = Viewport(this.canvasDom, this.paper);
    this.viewportHandle.setViewportDrag();

    //Raphael Extension  &&  Custom Attr Value
    shapeCustomAttr.init(this.paper);
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
            EdgeDraw(fatherEdgeModel).drawEdge();
        }

        //绑定相关监听事件
        this._setDrag(nodeModel);
    },

    setParentRender: function(node){
        var self = this;

        var childrenWithShapeCount1 = node.father.childrenWithShapeCount();

        self._reRenderChildrenNode(node.father);
        var childrenWithShapeCount2 = node.father.childrenWithShapeCount();

        //向上递归移动父节点的同级节点,只有一个点时不用移动
        if(node.father && node.father.childrenCount() > 1) {
            if(childrenWithShapeCount2 - childrenWithShapeCount1 <= 1){
                self._resetBrotherPosition(node.father, nodeShapeRelative.getNodeAreaHeight(node));
            }
        }

        let fatherEdgeModel = node.connectFather;
        if(fatherEdgeModel){
            EdgeDraw(fatherEdgeModel).drawEdge();
        }
        //设置拖动
        this._setDrag(node);

        forEach(node.children, function(child){
            self.setParentRender(child);
        });

    },


    /**
     * 删除节点渲染
     * 需要先断开父节点的children和connectChildren连接才能重新调整当前节点层的节点
     * @param node
     */
    removeNode: function(node){
        this._reRenderChildrenNode(node.father);
        if(node.father){
            if(node.father.childrenCount() > 0 || node.childrenCount() > 1){
                this._resetBrotherPosition(node.father, -nodeShapeRelative.getNodeAreaHeight(node));
            }
        }
        this._removeNodeModelShape(node);
    },

    /**
     * 选择节点时的渲染
     * @param node 被选中的节点
     * @param oldSelected: 之前被选中的节点
     */
    setSelectedRender: function(node, oldSelected){
        if(node && node.shape){
            node.shape.selectedShape(node);
        }
        if(oldSelected && oldSelected.shape){
            oldSelected.shape.unSelectedShape(oldSelected);
        }
    },

    /**
     * 点击画布时,取消graph的选择
     * @param graph
     */
    setCanvasClick: function(graph) {
        var self = this;
        this.canvasDom.addEventListener('mousedown', function(event){
            if(event.target.nodeName === 'svg'){
                let inputDom = document.getElementById('tempText');
                if(graph.selected && inputDom){
                    var text = inputDom.value;
                    graph.setLabel(graph.selected, text);
                    inputDom.parentNode.removeChild(inputDom);
                }

                graph.setSelected(null);
            }
        });

        this.canvasDom.addEventListener('keyup', function(event){
            if(event.keyCode === 13){
                let inputDom = document.getElementById('tempText');
                if(graph.selected && inputDom){
                    var text = inputDom.value;
                    graph.setLabel(graph.selected, text);
                    inputDom.parentNode.removeChild(inputDom);
                }

                graph.setSelected(null);
            }
        });

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