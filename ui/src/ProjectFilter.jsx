/* eslint "react/prefer-stateless-function": "off" */

import React from 'react';

export default class ProjectFilter extends React.Component {
  render() {
    return (
      <div>
        <a href="/#/projects">All Projects</a>
        {' | '}
        <a href="/#/projects?status=New">New Projects</a>
        {' | '}
        <a href="/#/projects?status=Assigned">Assigned Projects</a>
      </div>
    );
  }
}
