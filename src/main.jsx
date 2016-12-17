require('bootstrap/dist/css/bootstrap.css')
require('./assets/sass/material-kit.scss');
require('./assets/css/main.styl');

//require('jquery-ui');

//require('bootstrap');
//require('./assets/js/material.min.js')
//require('./assets/js/material-kit.js')

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router,browserHistory} from 'react-router';
import routes from './routes/index.jsx';
import store from './store';



render(
    <Provider store={store}>
        <Router routes = {routes} history={browserHistory} />
    </Provider>,
    document.getElementById('root')
);


