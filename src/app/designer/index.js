import {initDrawBoard} from './drawBoard'
import Renderer from './Renderer'
import Graph,{getChildrenNodeData} from './Graph'



//let nodeDatas = require('../json/nodeData.json');


export function initDesigner(viewBox,nodeDatas){
    //初始化设计器画板
    initDrawBoard();

    var renderer = new Renderer({
        canvasId: 'mindmap-canvas'
    });

    //获取根节点
    let [rootNodeData] = getChildrenNodeData(null,nodeDatas);
    var graph = new Graph(renderer,rootNodeData);

    renderToParent(graph.root,nodeDatas);

    let{x,y,width,height} = viewBox;
    graph.gRenderer.paper.setViewBox(x,y,width,height,false);

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


    return graph;
}