import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';

import Root from './Root';
import routes from './Routes';

import config from 'react-global-configuration';
// Базовый URL
config.set({ BASE_URL: 'http://localhost:7171/api/family_member/'});

Root.assetBaseUrl = window.ASSET_BASE_URL;
Root.propData = window.PROP_DATA;

ReactDOM.render(
    <Router history={browserHistory} children={routes}/>,
    document.getElementById('root')
);