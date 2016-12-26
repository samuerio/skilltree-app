import DataHelper from './otherModule/DataHelper';

let Node = function (g, {id,x,y,label}) {

    this.graph = g;
    this.gRenderer = g.gRenderer;

    this.id = id || newId();
    this.x = x;
    this.y = y;
    this.label = label || "任务";//节点的文本

    this.graph.nodes[this.id] = this;


    //节点的父节点引用
    this.father = null;
    //与父节点的边的引用
    this.connectFather = null;

    //节点的直接子节点引用集合
    this.children = {};
    //与子节点的边的引用集合
    this.connectChildren = {};

    //节点的图形,其类型为Raphael的element或set对象
    this.shape = null;

    //判断在根结点左边还是右边的属性
    this.direction = null;

};

/**
 * Node 宽高的常量值
 * @type {number}
 */
Node.DEFAULT_WIDTH = 70;
Node.DEFAULT_HEIGHT = 38;

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

        DataHelper.forEach(self.children, function (child) {
            child.translate(dx, dy);
        });

    },
    toJSON(){
        let id = this.id;
        let punid = null;
        punid = this.father && this.father.id;

        let x = this.x;
        let y = this.y;
        let label = this.label;
        let isParent = !isEmptyObjet(this.children);


        return {
            id,punid,x,y,label,isParent
        }
    }
};

/**
 * 判别对象是否为空
 * @param obj
 * @returns {boolean}
 */
function isEmptyObjet(obj){
    var result = true;
    for (var key in obj){
        if(obj.hasOwnProperty(key)){
            result = false;
            break;
        }
    }
    return result;
}


function newId() {
    var b = Math.random();
    var a = (b + new Date().getTime());
    return a.toString(16).replace(".", "")
}

export default Node;