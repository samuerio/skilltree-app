import DrawBoard from './schema/drawBoard'
import Renderer from './Renderer'
import Graph,{getChildrenNodeData} from './Graph'
import deepAssign from 'deep-assign';



//let nodeDatas = require('../json/nodeData.json');


/**
 * CanvasRuntime Constructor
 * @param viewBox
 * @param nodeDatas
 * @constructor
 */
function CanvasRuntime(viewBox,nodeDatas){
    this._viewBox = deepAssign({},CanvasRuntime.defaults.viewBox,viewBox);
    this._nodeDatas = nodeDatas || [];
    this._init();
}


CanvasRuntime.defaults = {
    viewBox:{
        x:"0",
        y:"0",
        width:"1000",
        height:"1000"
    }
}

CanvasRuntime.prototype = {
    constructor: CanvasRuntime,
    _init(){
        let {_viewBox,_nodeDatas} = this;

        //初始化设计器画板,获取画板对象的引用
        this._drawBoard = new DrawBoard({containerId:'designer'});

        var renderer = new Renderer({
            canvasId: 'mindmap-canvas'
        });

        //获取根节点
        let [rootNodeData] = getChildrenNodeData(null,_nodeDatas);
        var graph = new Graph(renderer,rootNodeData);

        renderToParent(graph.root,_nodeDatas);

        let{x,y,width,height} = _viewBox;
        graph.gRenderer.paper.setViewBox(x,y,width,height,false);

        this._graph = graph;

        /**
         * 递归渲染到父节点上
         * @param parentNodeModel
         * @param sourceNodesData
         */
        function renderToParent(parentNodeModel,sourceNodesData){
            let {id} = parentNodeModel;
            var childrenNodeData = getChildrenNodeData(id,sourceNodesData);
            childrenNodeData.forEach(function(childNodeData){
                var childNodeModel = graph.addNode(parentNodeModel,childNodeData);
                if(childNodeData.isParent === true){
                    renderToParent(childNodeModel,sourceNodesData);
                }
                delete childNodeData.isParent;
            });
        }
    },
    reload(viewBox,nodeDatas){
        this._graph.remove();
        this._drawBoard.remove();

        //Prepare data
        this._viewBox = deepAssign({},CanvasRuntime.defaults.viewBox,viewBox);
        this._nodeDatas = nodeDatas || [];
        this._init();
    },
    addNode(){
        let {_graph} = this;
        if(_graph.selected){
            _graph.addNode(_graph.selected, {});
        }
    },
    deleteNode(){
        let graph = this._graph;
        if(graph.selected){
            if(graph.selected.isRootNode()){
                console.log('cannot cancel root node');
            }else{
                graph.removeNode(graph.selected);
                graph.setSelected(null);
            }
        }
    },
    getViewBox(){
        return this._graph.gRenderer.paper.canvas.getAttribute('viewBox');
    },
    getMindNodes(){
        return this._graph.getJSON();
    }
}

export default CanvasRuntime;