/* eslint "react/prefer-stateless-function": "off" */

import React from 'react';
import {Link, withRouter} from 'react-router-dom';



class ProjectFilter extends React.Component {
  constructor() {
    super();
    this.onChangeStatus = this.onChangeStatus.bind(this);
  }

  onChangeStatus(e){
    const status = e.target.value;
    const{history} = this.props;
    history.push({
      pathname: '/projects',
      search: status ? `?status=${status}` : '',
    });
  }

  render() {
    return (
      <div>
        Status:
        {' '}
        <select onChange={this.onChangeStatus}>
          <option value="">(All)</option>
          <option value="New">New</option>
          <option value="Assigned">Assigned</option>
          <option value="Fixed">Fixed</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
    );
  }
}

export default withRouter(ProjectFilter);