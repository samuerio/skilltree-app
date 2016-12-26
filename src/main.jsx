require('./assets/stylus/main.styl');
require('font-awesome-webpack');

import 'antd/dist/antd.css';
//
//import React from 'react';
//import {render} from 'react-dom';
//import {Provider} from 'react-redux';
//import {Router,browserHistory} from 'react-router';
//import routes from './routes/index.jsx';
//import store from './store';
//
//
//
//render(
//    <Provider store={store}>
//        <Router routes = {routes} history={browserHistory} />
//    </Provider>,
//    document.getElementById('root')
//);

import {initDrawBoard} from './designer/drawBoard'
import Renderer from './designer/Renderer'
import Graph,{getChildrenNodeData} from './designer/Graph'



let nodeDatas = require('./json/nodeData.json');


//初始化设计器画板
initDrawBoard();

var renderer = new Renderer({
    canvasId: 'mindmap-canvas'
});

//获取根节点
let [rootNodeData] = getChildrenNodeData(null,nodeDatas);
var graph = new Graph(renderer,rootNodeData);

renderToParent(graph.root,nodeDatas);
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



$('#node-plus').click(function(){
    if(graph.selected){
        graph.addNode(graph.selected, {});
    }
});

$('#save-graphy').on('click',function(){
    console.log(JSON.stringify(graph.getJSON()));
});

$('#node-cancel').click(function(){
    if(graph.selected){
        if(graph.selected.isRootNode()){
            console.log('cannot cancel root node');
        }else{
            graph.removeNode(graph.selected);
            graph.setSelected(null);
        }
    }
});






