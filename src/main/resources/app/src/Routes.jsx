import React from 'react';
import {IndexRoute, Route} from 'react-router';
import Root from './Root';

import Application from './Application/Application';
import Create from './Application/Create';
import Page from './Page';

let innerRoutes = (
    <Route>
        <IndexRoute component={Page(Application, true)}/>
        <Route path="create" component={Page(Create, true)}/>
    </Route>
);

export default (
    <Route path="/" component={Root}>
        {innerRoutes}
    </Route>
);