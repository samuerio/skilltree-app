import DrawBoard from './schema/drawBoard'
import Renderer from './Renderer'
import Graph,{getChildrenNodeData} from './Graph'
import deepAssign from 'deep-assign';
import NodeModel from './schema/nodeModal';

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

        //初始化设计器画板
        this._drawBoard = new DrawBoard({containerId:'designer'});

        //初始化思维导图
        this._graph = new Graph(new Renderer({
                canvasId: 'mindmap-canvas'
            }),_nodeDatas,_viewBox);
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
            _graph.addNode(_graph.selected, new NodeModel(_graph,{}));
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
        return this._graph.getViewBox();
    },
    getMindNodes(){
        return this._graph.getMindNodes();
    }
}

export default CanvasRuntime;