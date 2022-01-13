import React from 'react';
import PropTypes from 'prop-types';
import {Form, FormControl, FormGroup, FormLabel, Button} from 'react-bootstrap';

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
      <Form inline name="projectAdd" onSubmit={this.handleSubmit}>
        <FormGroup>
          <FormLabel>Owner</FormLabel>
          {' '}
          <FormControl type="text" name="owner" />
        </FormGroup>
        {' '}
        <FormGroup>
          <FormLabel>Title</FormLabel>
          {' '}
          <FormControl type="text" name="title" />
        </FormGroup>
        {' '}
        <Button type="submit">Add</Button>
      </Form>
    );
  }
}

ProjectAdd.propTypes = {
  createProject: PropTypes.func.isRequired,
};
