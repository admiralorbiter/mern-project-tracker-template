import React from 'react';
import URLSearchParams from 'url-search-params';
import { Route } from 'react-router-dom';

import ProjectAdd from './ProjectAdd.jsx';
import graphQLFetch from './graphQLFetch.js';
import ProjectTable from './ProjectTable.jsx';
import ProjectFilter from './ProjectFilter.jsx';
import ProjectDetail from './ProjectDetail.jsx';

export default class ProjectList extends React.Component {
  constructor() {
    super();
    this.state = { projects: [] };
    this.createProject = this.createProject.bind(this);
    this.closeProject = this.closeProject.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { location: {search: prevSearch} } = prevProps;
    const { location: {search} } = this.props;
    if(prevSearch !== search){
      this.loadData();
    }
  }

  async loadData() {
    const {location: {search}} = this.props;
    const params = new URLSearchParams(search);
    const vars = {};
    if(params.get('status'))vars.status = params.get('status');

    const effortMin = parseInt(params.get('effortMin'), 10);
    if(!Number.isNaN(effortMin))vars.effortMin = effortMin;
    const effortMax = parseInt(params.get('effortMax'), 10);
    if(!Number.isNaN(effortMax))vars.effortMax = effortMax;

    const query = `query projectList(
      $status: StatusType
      $effortMin: Int
      $effortMax: Int
      ) {
      projectList(
        status: $status
        effortMin: $effortMin
        effortMax: $effortMax
      ) {
        id title status owner
        created effort due
      }
    }`;

    const data = await graphQLFetch(query, vars);
    if (data) {
      this.setState({ projects: data.projectList });
    }
  }

  async closeProject(index){
    const query = `mutation projectClose($id: Int!) {
      projectUpdate(id: $id, changes: {status: Closed}) {
        id title status owner
        effort created due description
      }
    }`;

    const { projects } = this.state;
    const data = await graphQLFetch(query, { id: projects[index].id });
    if(data){
      this.setState(prevState => {
        const newList = [...prevState.projects];
        newList[index] = data.projectUpdate;
        return { projects: newList };
      });
    }else{
      this.loadData();
    }
  }

  async createProject(project) {
    const query = `mutation projectAdd($project: ProjectInputs!) {
      projectAdd(project: $project) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { project });
    if (data) {
      this.loadData();
    }
  }

  render() {
    const { projects } = this.state;
    const { match } = this.props;

    return (
      <React.Fragment>
        <h1>Project Tracker</h1>
        <ProjectFilter />
        <hr />
        <ProjectTable projects={projects} closeProject={this.closeProject}/>
        <hr />
        <ProjectAdd createProject={this.createProject} />
        <hr />
        <Route path={`${match.path}/:id`} component={ProjectDetail} />
      </React.Fragment>
    );
  }
}
