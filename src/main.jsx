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
import Graph from './designer/Graph'

//初始化设计器画板
initDrawBoard();

var renderer = new Renderer({
    canvasId: 'mindmap-canvas'
});
var graph = new Graph(renderer);
document.graph = graph;

$('#node-plus').click(function(){
    if(graph.selected){
        graph.addNode(graph.selected, {});
    }
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

//$('#label-group button').click(function(){
//    //var text = $('#label-group input').val();
//    var text = $('#tempText').val();
//    if(graph.selected){
//        graph.setLabel(graph.selected, text);
//        $('#tempText').remove();
//    }
//});


