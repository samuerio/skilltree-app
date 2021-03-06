import  {forEach} from '../util';
import nodeShapeRelative from  './renderModule/nodeShapeRelative'
import NodeModel from './schema/nodeModal';
import EdgeModal from './schema/edgeModal';

//初始化Drag参数
let isDragging,lastX,lastY;


var Graph = function(gRenderer,nodeDatas,viewBox){
    //渲染层的对象
    this.gRenderer = gRenderer;
    this.nodeCount = 0;
    this.edgeCount = 0;

    //节点\边集合
    this.nodes = {};
    this.edges = {};

    this.selected = null;
    this.root = null;

    let canvasDom = this.gRenderer.canvasDom;
    this.viewBox = viewBox || {
            x:0,
            y:0,
            width:canvasDom.clientWidth,
            height:canvasDom.clientHeight
    }

    this._init(nodeDatas);
};

Graph.defaults = {

}

Graph.prototype = {
    constructor: Graph,
    /**
     * 初始化
     * @param nodeDatas
     * @param viewBox
     * @private
     */
    _init(nodeDatas){
        let _self = this;
        let [rootNodeData] = getChildrenNodeData(null,nodeDatas);

        _self._initViewBox(this.viewBox);
        _self.root = this._initRoot(rootNodeData);
        //将其他节点数据递归渲染到MindTree上
        renderToParent(_self.root,nodeDatas);

        _self._initEvent();
        
        /**
         * 递归渲染到父节点上
         * @param parentNodeModel
         * @param sourceNodesData
         */
        function renderToParent(parentNodeModel,sourceNodesData){
            let {id} = parentNodeModel;
            var childrenNodeData = getChildrenNodeData(id,sourceNodesData);
            childrenNodeData.forEach(function(childNodeData){
                var childNodeModel = _self.addNode(parentNodeModel,new NodeModel(_self,childNodeData));
                if(childNodeData.isParent === true){
                    renderToParent(childNodeModel,sourceNodesData);
                }
                delete childNodeData.isParent;
            });
        }

        /**
         * 获取子节点数据集
         * @param pid
         * @param sourceNodeDatas
         * @returns {Array}
         */
        function getChildrenNodeData(pid,sourceNodeDatas){
            var children = [];
            if(Array.isArray(sourceNodeDatas)){
                sourceNodeDatas.forEach(function(nodeData){
                    if(nodeData.punid === pid){
                        let {id,x,y,label,isParent} = nodeData;
                        children.push({
                            id,x,y,label,isParent
                        });
                    }
                });
            }
            return children;
        }
    },
    /**
     * 初始化视窗
     * @param viewBox
     * @private
     */
    _initViewBox(viewBox){
        let{x,y,width,height} = viewBox;
        this.gRenderer.paper.setViewBox(x,y,width,height,false);
    },
    /**
     * 初始化根结点
     * @returns {*}
     * @private
     */
    _initRoot: function(rootNodeData){
        var root = null;
        root = this.addNode(null, new NodeModel(this,rootNodeData || {
                x: this.gRenderer.paper.width / 2 -50,
                y: 200,
                label:'中心主题'}));
        return root;
    },
    /**
     * 初始化事件
     * @private
     */
    _initEvent(){

        let _self = this;
        let canvasSVG = this.gRenderer.paper.canvas;

        this.gRenderer.canvasDom.addEventListener('keyup', function(event){
            if(event.keyCode === 13){
                _self._listener().cancelSelect();
            }
        });

        canvasSVG.addEventListener('mousedown', function(event){
            if(event.target.nodeName === 'svg'){
                _self._listener().cancelSelect();
            }
        });

        //添加画布的鼠标点击事件
        canvasSVG.addEventListener('mousedown', _self._listener().beginDrag);

        //添加画布的鼠标移动事件
        canvasSVG.addEventListener('mousemove', _self._listener().dragging);

        //添加画布的鼠标释放事件
        canvasSVG.addEventListener('mouseup', _self._listener().endDrag);

    },
    /**
     * 监听器
     * @returns {{cancelSelect: (function())}}
     * @private
     */
    _listener(){
        let _self = this;

        return{
            cancelSelect(){
                let inputDom = document.getElementById('tempText');
                if(_self.selected && inputDom){
                    var text = inputDom.value;
                    _self.setLabel(_self.selected, text);
                    inputDom.parentNode.removeChild(inputDom);
                }

                _self.setSelected(null);
            },
            beginDrag(event){
                lastX = event.layerX;
                lastY = event.layerY;
                isDragging = true;
            },
            dragging(event){
                if(isDragging){
                    let distanceX = -(event.layerX - lastX);
                    let distanceY = -(event.layerY - lastY);

                    _self.viewBox.x = distanceX + Number(_self.viewBox.x);
                    _self.viewBox.y = distanceY + Number(_self.viewBox.y);

                    _self._initViewBox(_self.viewBox);

                    lastX = event.layerX;
                    lastY = event.layerY;
                }
            },
            endDrag(event){
                if(isDragging){
                    isDragging = false;
                }
            }
        }
    },
    //重新设置节点的direction和edge等
    _resetChildrenProperty: function(children){
        var self = this;
        forEach(children, function(child){
            child.connectFather = new EdgeModal(this, source, target);


            self._setNodeModelDirection(child);
            self._resetChildrenProperty(child.children);
        });
    },
    /**
     * 初始化运行时信息, 父节点/父边的引用  子节点/子边的引用  节点的方向信息
     */
    _prepareRuntimeData: function(parentNodeModel, childNodeModel){

        //如果设置父节点为自己或parent为null或parent与child的父节点相等时,则返回
        if(childNodeModel === parentNodeModel || parentNodeModel === null 
            || childNodeModel.father === parentNodeModel) { 
            return null 
        };

        this._removeParentRel(childNodeModel);

        //设置child的father; 设置child的connectFather,并创建新边Model
        childNodeModel.father = parentNodeModel;
        childNodeModel.connectFather = new EdgeModal(this, parentNodeModel, childNodeModel);

        //设置新父节点的children; 设置新父节点的connectChildren
        parentNodeModel.children[childNodeModel.id] = childNodeModel;
        parentNodeModel.connectChildren[childNodeModel.connectFather.id] = childNodeModel.connectFather;

        this._setNodeModelDirection(childNodeModel);
    },
    /**
     * 移除父节点的应用信息 包括NodeModel以及EdgeModel
     * @param nodeModel
     * @private
     */
    _removeParentRel: function(nodeModel){
        //若child存在旧父节点,则删除旧父节点child上该节点的引用
        if(nodeModel.father) {
            delete nodeModel.father.children[nodeModel.id];
        }
        //若child存在旧父节点,则删除旧父节点connectChildren上与child的边的引用
        if(nodeModel.connectFather) {
            delete nodeModel.father.connectChildren[nodeModel.connectFather.id];
        }
    },
    /**
     * 设置节点的direction属性
     * -1表示左边,1表示右边,null表示未设置
     * @param node
     * @private
     */
    _setNodeModelDirection: function(node){
        let self = this;

        if(node.isRootNode()){
            node.direction = null;
        }

        //如果为第一层节点,则根据左右节点数赋值位置值
        if(node.isFirstLevelNode()){
            if(_isFirstNodeRightMoreThanLeft()){
                node.direction = -1;
            }else{
                node.direction = 1;
            }
        }
        //如果为第n层(n>=2)节点,则按照父节点的direction设置
        else if(!node.isFirstLevelNode() && !node.isRootNode()){
            node.direction = node.father.direction;
        }

        /**
         * 判断第一层节点中右边节点大于(不等于)左边节点
         * @returns boolean
         * @private
         */
        function _isFirstNodeRightMoreThanLeft(){
            var root = self.root;
            var leftCount = 0,
                rightCount = 0;

            forEach(root.children, function(rootChild){
                if(rootChild.direction === -1){
                    leftCount++;
                }else if(rootChild.direction === 1){
                    rightCount++;
                }
            });

            return rightCount > leftCount;
        }
    },
    /**
     * 递归删除节点的数据
     * @param nodeModel
     * @private
     */
    _removeNodeModel: function(nodeModel){
        var self = this;
        //删除父节点相关:删除父节点与该节点的边界,从父节点的children上删除该节点,最后删除父节点引用
        //数组中的属性设为undefined,其他引用设为null
        self._removeParentRel(nodeModel);

        forEach(nodeModel.children, function(childNodeModel){
            self._removeNodeModel(childNodeModel);
        });

        //删除nodes和edges集合中该对象的引用
        delete self.nodes[nodeModel.id];
        if(nodeModel.connectFather){
            delete self.edges[nodeModel.connectFather.id];
        }
    },
    /**
     * 获取思维导图Json数组
     * @returns {Array}
     */
    getMindNodes(){
        let nodeJSONList = [];
        getNodeJSON(this.root);

        function getNodeJSON(node){
            nodeJSONList.push(node.toJSON());

            forEach(node.children,function(childrenNode){
                getNodeJSON(childrenNode);
            })
        }
        return nodeJSONList;
    },
    /**
     * 移除渲染效果
     */
    remove(){
        //移除渲染的效果
        this.gRenderer.paper.remove();
    },
    /**
     * 增加节点,需要指定父节点
     * @param parentNodeModel 新增节点的父节点
     * @param nodeData
     * @returns {NodeModel}
     */
    addNode: function(parentNodeModel, nodeModel){

        //初始化运行时信息
        this._prepareRuntimeData(parentNodeModel, nodeModel);
        if(nodeModel.x && nodeModel.y){//存在节点坐标,则直接渲染
            this.gRenderer.renderNodeModel(nodeModel);
        }else{//不存在节点坐标,先计算出坐标x y再进行渲染

            this.gRenderer._reRenderChildrenNode(nodeModel.father);

            //向上递归移动父节点的同级节点,只有一个点时不用移动
            if(nodeModel.father && nodeModel.father.childrenCount() > 1) {
                this.gRenderer._resetBrotherPosition(nodeModel.father, nodeShapeRelative.getNodeAreaHeight(nodeModel));
            }
        }

        return nodeModel;
    },
    /**
     * 删除节点
     * 先先断开父节点的children和connectChildren连接，再渲染删除，然后删除递归数据
     * @param nodeModel
     */
    removeNode: function(nodeModel) {
        //这一步非常重要,提前去掉父节点对该子节点的引用,以便重新计算其余节点位置
        this._removeParentRel(nodeModel);
        this.gRenderer.removeNode(nodeModel);
        this._removeNodeModel(nodeModel);
    },
    /**
     * 设置节点的文本
     * @param node
     * @param label
     */
    setLabel: function(nodeModel, label){

        var oldWidth = nodeModel.shape[1].attr('width');

        nodeModel.label = label;
        nodeModel.shape.nodeShape(nodeModel);
        var newWidth = nodeModel.shape[1].attr('width');

        var gap = newWidth - oldWidth;

        if(nodeModel.direction === 1){ //如果改变label的节点为右方向节点,则只向右移动该节点的子节点
            forEach(nodeModel.children, function(child){
                child.translate(gap, 0);
            });
        }else if(nodeModel.direction === -1){//如果改变label的节点为左方向节点,则向左移动该节点(translate回递归)
            nodeModel.translate(-gap, 0);
        }else if(nodeModel.isRootNode()){//如果节点为根结点
            nodeModel.translate(-gap/2, 0);
            forEach(nodeModel.children, function(child){
                if(child.direction === 1){
                    child.translate(gap, 0);
                }else if(child.direction === -1){
                    child.translate(-gap/2, 0);
                }
            });
        }
    },
    /**
     * 设置选中的节点
     * @param node
     */
    setSelected: function(node){
        if(this.selected == node) { return };
        var oldSelected = this.selected;
        this.selected = node;

        this.gRenderer.setSelectedRender(this.selected, oldSelected);
    },
    /**
     * 获取视窗
     */
    getViewBox(){
        return this.viewBox;
    }
};

export default Graph;

