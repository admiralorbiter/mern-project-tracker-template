import React from 'react';

import ProjectAdd from './ProjectAdd.jsx';
import graphQLFetch from './graphQLFetch.js';
import ProjectTable from './ProjectTable.jsx';
import ProjectFilter from './ProjectFilter.jsx';

export default class ProjectList extends React.Component {
  constructor() {
    super();
    this.state = { projects: [] };
    this.createProject = this.createProject.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      projectList {
        id title status owner
        created effort due
      }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ projects: data.projectList });
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
    return (
      <React.Fragment>
        <h1>Project Tracker</h1>
        <ProjectFilter />
        <hr />
        <ProjectTable projects={projects} />
        <hr />
        <ProjectAdd createProject={this.createProject} />
      </React.Fragment>
    );
  }
}
