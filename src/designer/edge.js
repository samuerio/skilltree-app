let Edge = function (g, source, target, attr) {
    if (!attr) attr = {};
    this.graph = g;

    this.id = ++(this.graph.edgeCount);

    this.graph.edges[this.id] = this;

    //起点节点的引用
    this.source = source;
    //终点节点的引用
    this.target = target;

    //边的图形,其类型为Raphael的element或set对象
    this.shape = null;
};

export default Edge;