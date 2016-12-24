import DataHelper from './otherModule/DataHelper';

let Node = function (g, attr) {
    if (!attr) {
        attr = {}
    }
    ;
    this.graph = g;
    this.gRenderer = g.gRenderer;

    //节点的id
    //this.id = attr.id || ++(this.graph.nodeCount);

    if (attr.hasOwnProperty('id')) {
        this.id = attr.id;
    } else {
        this.id = ++(this.graph.nodeCount);
    }

    this.graph.nodes[this.id] = this;


    if (attr.hasOwnProperty('x') && attr.hasOwnProperty('y')) {
        this.x = attr.x;
        this.y = attr.y;
    } else {
        this.x = null;
        this.y = null;
    }


    //节点的父节点引用
    this.father = null;
    //与父节点的边的引用
    this.connectFather = null;

    //节点的直接子节点引用集合
    this.children = {};
    //与子节点的边的引用集合
    this.connectChildren = {};

    //节点的文本
    this.label = attr.label || "任务" + this.id;

    //节点的图形,其类型为Raphael的element或set对象
    this.shape = null;

    //判断在根结点左边还是右边的属性
    this.direction = null;

    this.data = attr.data || null;
};

Node.prototype = {
    construct: Node,
    getRootNode: function () {
        if (this === this.graph.root) {
            return this;
        }

        if (!this.father) {
            return this;
        } else {
            var fatherNode = this.father;
            while (fatherNode.father) {
                fatherNode = fatherNode.father;
            }
            return fatherNode;
        }
    },
    isRootNode: function () {
        return this === this.getRootNode();
    },
    childrenCount: function () {
        return DataHelper.count(this.children);
    },
    childrenWithShapeCount: function () {
        var self = this;
        var count = 0;
        DataHelper.forEach(self.children, function (child) {
            //console.log(child);
            if (child.shape) {
                count++;

            }
        });
        return count;
    },
    isFirstLevelNode: function () {
        return this.father && this.father === this.getRootNode();
    },
    isSecondMoreNode: function () {
        return !this.isRootNode() && !this.isFirstLevelNode();
    },
    /**
     * 平移变换
     * @param dx
     * @param dy
     */
    translate: function (dx, dy) {
        var self = this;
        self.x += dx;
        self.y += dy;

        //进行nodeModel的重新渲染
        this.gRenderer.renderNodeModel(this);
        //节点平移后,进行父连线的重新绘画
        if(this.shape && this.connectFather){
            this.gRenderer._drawEdge(this.connectFather);
        }

        DataHelper.forEach(self.children, function (child) {
            child.translate(dx, dy);
        });

    }
};

export default Node;