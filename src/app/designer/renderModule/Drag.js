import  {forEach} from '../../util';
let Raphael = require('raphael')

/**
 * 拖动模块
 */
var Drag = function(aNode, options){
    var node = aNode;

    var viewportHandle = options.viewportHandle;

    var paper = node.shape[0].paper;
    var graph = node.graph;

    //克隆的占位节点
    var cloneShape = null;
    //当前节点可添加的父节点BBox的集合
    var addableBoxSet = null;
    //最后一个重合的节点id
    var lastOverlapId = null;
    //当前重合的节点id
    var overlapNodeId = null;


    /**
     * 取得克隆的shape：用于占位
     * @param node
     * @returns {*}
     * @private
     */
    function _cloneNodeShape(node){

        var newRect = node.shape[1].clone();
        newRect.attr({
            r: 4
        });
        var newLabel = node.shape[0].clone();
        var newShape = paper.set().push(newLabel).push(newRect);
        return newShape;
    }

    /**
     * 获得可成为当前节点的父节点的Box集合
     * @returns {{}}
     * @private
     */
    function _getAddableBBoxSet(){
        var addableBBoxSet = {};
        var addableSet = graph.getParentAddableNodeSet(node);

        forEach(addableSet, function(curNode){
            addableBBoxSet[curNode.id] = curNode.shape.getBBox();
        });
        return addableBBoxSet;
    }


    /**
     * 获得与当前节点重合的节点的id
     * @returns {*}
     * @private
     */
    function _getOverlapNodeId(){
        var nodeBBox = node.shape.getBBox();
        for(var id in addableBoxSet){
            var curBBox = addableBoxSet[id];
            if(Raphael.isBBoxIntersect(nodeBBox, curBBox)){
                return id;
            }
        }
        return null;
    }

    /**
     * 将子节点及边设为透明
     * @param children
     * @private
     */
    function _setChildrenOpacity(children){
        forEach(children, function(child){
            child.shape.opacityShape(child);
            child.connectFather.shape.opacityShape();
            _setChildrenOpacity(child.children);
        });
    }

    /**
     * 将透明子节点及边设为原样
     * @param children
     * @private
     */
    function _setChildrenNormal(children){
        forEach(children, function(child){
            child.shape.unOpacityShape();
            child.connectFather.shape.unOpacityShape();
            _setChildrenNormal(child.children);
        });
    }

    function moveFnc(dx, dy){
        //如果不可渲染，则不可调用move
        if(!enableRender.canRender) { return false; }

        //移动节点时将鼠标的样式设为move
        node.shape[1].node.style.cursor = 'move';

        node.shape.transform('t' + dx + ',' + dy);

        overlapNodeId = _getOverlapNodeId();

        if(overlapNodeId !== lastOverlapId){
            if(overlapNodeId){

                graph.nodes[overlapNodeId].shape.overlapShape();
            }
            if(lastOverlapId){

                graph.nodes[lastOverlapId].shape.unOverlapShape(graph.nodes[lastOverlapId]);
            }
        }

        lastOverlapId = overlapNodeId;
    }

    function startFnc(){
        //如果不可渲染，则不可调用start
        if(!enableRender.canRender) { return false; }

        //设置节点的选择渲染
        // _selectedHandle();
        node.graph.setSelected(node);

        //创一个克隆的节点占位
        cloneShape = _cloneNodeShape(node);

        //将节点设为未选择样式的透明样式
        node.shape.dragNodeOpacityShape(node);
        cloneShape.opacityShape();
        //@workaround: 改为当前节点，及其子节点和边透明
        _setChildrenOpacity(node.children);

        //获得当前节点可添加的父节点BBox的集合
        addableBoxSet = _getAddableBBoxSet();
        lastOverlapId = null;

    }
    function endFnc(){
        //如果不可渲染，则不可调用end
        if(!enableRender.canRender) { return false; }

        cloneShape.remove();
        cloneShape = null;


        //@workaround：将节点设为被选择样式
        node.shape.selectedShape(node);

        _setChildrenNormal(node.children);

        if(lastOverlapId){
//                graph.nodes[lastOverlapId].shape[1].attr({
//                    'stroke': 'black'
//                });
            var lastOverlapNode = graph.nodes[lastOverlapId];
            lastOverlapNode.shape.nodeShape(lastOverlapNode);
        }

        overlapNodeId = _getOverlapNodeId();

        if(overlapNodeId){
            //节点改变父节点后的操作
            graph.setParent(parseInt(overlapNodeId), node.id);

        }

        node.shape.transform('t' + 0 + ',' + 0);

        node.shape[1].node.style.cursor = 'default';
    }

    return {
        setDrag: function(){
            if(!node.isRootNode()){

                //TODO 由于drag会和dbclick事件冲突.建议使用原生的 mousedown mousemove mouseup来模拟drag效果
                //node.shape.drag(moveFnc, startFnc, endFnc);
                node.shape.mousedown(function(){
                    node.graph.setSelected(node);
                });
            }else{
                node.shape.mousedown(function(event){
                    viewportHandle.mousedownHandle(event);
                });
                node.shape.mousemove(function(event){
                    viewportHandle.mousemoveHandle(event);
                });
                node.shape.mouseup(function(event){
                    viewportHandle.mouseupHandle(event);
                });


                node.shape.mousedown(function(){
                    node.graph.setSelected(node);
                });
            }
            //add label dbClick event
            node.shape[0].dblclick(function(event){
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
        }

    };
};



export default Drag;