import React from 'react';
import PropTypes from 'prop-types';

export default class ProjectAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.projectAdd;
    const project = {
      owner: form.owner.value,
      title: form.title.value,
      due: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10),
    };
    const { createProject } = this.props;
    createProject(project);
    form.owner.value = ''; form.title.value = '';
  }

  render() {
    return (
      <form name="projectAdd" onSubmit={this.handleSubmit}>
        <input type="text" name="owner" placeholder="Owner" />
        <input type="text" name="title" placeholder="Title" />
        <button type="submit">Add</button>
      </form>
    );
  }
}

ProjectAdd.propTypes = {
  createProject: PropTypes.func.isRequired,
};
