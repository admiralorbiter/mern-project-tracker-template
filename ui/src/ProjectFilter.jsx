/* eslint "react/prefer-stateless-function": "off" */

import React from 'react';
import {Link} from 'react-router-dom';

export default class ProjectFilter extends React.Component {
  render() {
    return (
      <div>
        <Link to="/projects">All Projects</Link>
        {' | '}
        <Link to={{ pathname: '/projects', search: '?status=New' }}>
        New Issues
        </Link>
        {' | '}
        <Link to={{ pathname: '/projects', search: '?status=Assigned' }}>
        Assigned Issues
        </Link>
      </div>
    );
  }
}
