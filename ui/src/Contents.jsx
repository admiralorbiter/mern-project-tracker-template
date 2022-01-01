import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProjectList from './ProjectList.jsx';
import ProjectReport from './ProjectReport.jsx';
import ProjectEdit from './ProjectEdit.jsx';

const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents() {
 return (
 <Switch>
 <Redirect exact from="/" to="/projects" />
 <Route path="/projects" component={ProjectList} />
 <Route path="/edit/:id" component={ProjectEdit} />
 <Route path="/report" component={ProjectReport} />
 <Route component={NotFound} />
 </Switch>
 );
}