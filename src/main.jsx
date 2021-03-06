require('./assets/stylus/main.styl');
require('font-awesome-webpack');

/**
 * 导入antd组件样式
 */
import 'antd/dist/antd.css';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router,browserHistory} from 'react-router';
import routes from './routes/index.jsx';
import store from './store';


'use strict';



render(
    <Provider store={store}>
        <Router routes = {routes} history={browserHistory} />
    </Provider>,
    document.getElementById('root')
);












