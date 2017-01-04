
import DataHelper from './otherModule/DataHelper';
import nodeShapeRelative from  './renderModule/nodeShapeRelative'
import Node from './node';
import Edge from './edge';


var Graph = function(gRenderer,rootNodeData){
    //渲染层的对象
    this.gRenderer = gRenderer;
    this.nodeCount = 0;
    this.edgeCount = 0;

    //节点集合
    this.nodes = {};
    //边集合
    this.edges = {};

    this.selected = null;
    //创建graph时则创建一个根节点,根节点id为0x
    this.root = this._initRoot(rootNodeData);
    //@workaround: svg点击事件:如果点击的是canvas,取消selected
    this.gRenderer.setCanvasClick(this);
};

Graph.prototype = {
    constructor: Graph,
    /**
     * 增加节点,需要指定父节点
     * @param parentNodeModel 新增节点的父节点
     * @param nodeData
     * @returns {Node}
     */
    addNode: function(parentNodeModel, nodeData){

        var nodeModel = new Node(this, nodeData);
        //初始化运行时信息
        this._initRunTimeData(parentNodeModel, nodeModel);
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
     * @param node
     */
    removeNode: function(node) {
        this._removeParent(node);
        this.gRenderer.removeNodeRender(node);

        this._removeNodeData(node);

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
            DataHelper.forEach(nodeModel.children, function(child){
                child.translate(gap, 0);
            });
        }else if(nodeModel.direction === -1){//如果改变label的节点为左方向节点,则向左移动该节点(translate回递归)
            nodeModel.translate(-gap, 0);
        }else if(nodeModel.isRootNode()){//如果节点为根结点
            nodeModel.translate(-gap/2, 0);
            DataHelper.forEach(nodeModel.children, function(child){
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
     * 初始化根结点
     * @returns {*}
     * @private
     */
    _initRoot: function(rootNodeData){
        var root = null;
        root = this.addNode(null, rootNodeData || {
            x: this.gRenderer.paper.width / 2 -50,
            y: 200,
            label:'中心主题'}
        );
        return root;
    },
    //重新设置节点的direction和edge等
    _resetChildrenProperty: function(children){
        var self = this;
        DataHelper.forEach(children, function(child){
            child.connectFather = new Edge(this, source, target);


            self._setNodeDirection(child);
            self._resetChildrenProperty(child.children);
        });
    },
    /**
     * 初始化运行时信息, 父节点/父边的引用  子节点/子边的引用  节点的方向信息
     * @param parent
     * @param child
     * @returns {*}
     */
    _initRunTimeData: function(parent, child){

        //如果设置父节点为自己或parent为null时,则返回null
        if(child === parent || parent === null) { return null };

        //如果parent与child的父节点相等,则退出
        if(child.father === parent) { return child.connectFather };

        this._removeParent(child);

        //设置child的father
        child.father = parent;
        //设置新父节点的children;
        child.father.children[child.id] = child;

        //设置child的connectFather,并创建新边Model
        child.connectFather = new Edge(this, parent, child);
        //设置新父节点的connectChildren
        child.father.connectChildren[child.connectFather.id] = child.connectFather;

        this._setNodeDirection(child);
        
        return child.connectFather;
    },
    /**
     * 移除父节点的应用信息 包括NodeModel以及EdgeModel
     * @param nodeModel
     * @private
     */
    _removeParent: function(nodeModel){
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
    _setNodeDirection: function(node){
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

            DataHelper.forEach(root.children, function(rootChild){
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
     * @param node
     * @private
     */
    _removeNodeData: function(node){
        var self = this;
        //删除父节点相关:删除父节点与该节点的边界,从父节点的children上删除该节点,最后删除父节点引用
        //数组中的属性设为undefined,其他引用设为null
        self._removeParent(node);
        node.father = null;
        node.connectFather = null;

        DataHelper.forEach(node.children, function(child){
            self._removeNodeData(child);
        });

        //删除nodes和edges集合中该对象的引用
        delete self.nodes[node.id];
        if(node.connectFather){
            delete self.edges[node.connectFather.id];
        }

    },
    /**
     * 获得node节点所有子节点的集合
     * @param node
     * @returns {{}}
     */
    _getChildrenNodeSet: function(node){
        var self = this;
        var childrenNodeSet = {};
        self._makeChildrenNodeSet(node.children, childrenNodeSet);
        return childrenNodeSet;

    },
    _makeChildrenNodeSet: function(children, childrenNodeSet){
        var self = this;
        DataHelper.forEach(children, function(child){
            childrenNodeSet[child.id] = child;
            self._makeChildrenNodeSet(child.children, childrenNodeSet);
        });
    },
    setParent: function(parentId, childId){
        var self = this;

        var parent = self.nodes[parentId];
        var child = self.nodes[childId];
        if(child === parent || parent ===null) { return null; }
        if(child.father === parent) { return; }
        else{
            //需要设置新父节点的children，才能正确删除重绘子节点时
            delete child.father.children[child.id];
            //在child.connectFather改变之前，递归删除子节点
            this.gRenderer.removeNodeRender(child);
        }

        this._initRunTimeData(parent, child);

        this._resetChildrenProperty(child.children);

        //在新的father上递归添加原节点（递归添加）的渲染
        this.gRenderer.setParentRender(child);

    },
    //获得当前节点可成为父节点候选的节点集
    getParentAddableNodeSet: function(node){
        var self = this;

        var addableNodeSet = {};
        //获得this.nodes的副本
        DataHelper.forEach(self.nodes, function(curNode){
            addableNodeSet[curNode.id] = curNode;
        });

        var notAddableNodeSet = self._getChildrenNodeSet(node);
        notAddableNodeSet[node.id] = node;
        if(node.father){
            notAddableNodeSet[node.father.id] = node.father;
        }

        //在this.nodes副本中除去当前节点及该节点的所有子节点的引用
        DataHelper.forEach(notAddableNodeSet, function(curNode){
            delete addableNodeSet[curNode.id];
        });
        return addableNodeSet;

    },
    getJSON(){
        let nodeJSONList = [];
        getNodeJSON(this.root);

        function getNodeJSON(node){
            nodeJSONList.push(node.toJSON());

            DataHelper.forEach(node.children,function(childrenNode){
                getNodeJSON(childrenNode);
            })
        }
        return nodeJSONList;
    }
};

export default Graph;


/**
 * 获取子节点数据集
 * @param pid
 * @param sourceNodeDatas
 * @returns {Array}
 */
export function getChildrenNodeData(pid,sourceNodeDatas){
    var children = [];
    if(Array.isArray(sourceNodeDatas)){
        sourceNodeDatas.forEach(function(nodeData){
            if(nodeData.punid === pid){
                let {id,x,y,label,isParent} = nodeData;
                children.push({
                    id,
                    x,
                    y,
                    label,
                    isParent
                });
            }
        });
    }
    return children;
}