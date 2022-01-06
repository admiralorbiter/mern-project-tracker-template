import React from 'react';
import { Link } from 'react-router-dom';
import NumInput from './NumInput.jsx';
import TextInput from './TextInput.jsx';

import graphQLFetch from './graphQLFetch.js';

export default class ProjectEdit extends React.Component {
    constructor(){
        super();
        this.state = {
            project: {},
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        const { match: { params: { id: prevId } } } = prevProps;
        const { match: { params: { id } } } = this.props;
        if (id !== prevId) {
          this.loadData();
        }
      }
    
      onChange(event, naturalValue) {
        const { name, value: textvalue } = event.target;
        const value = naturalValue === undefined ? textValue : naturalValue;
        this.setState(prevState => ({
          project: { ...prevState.project, [name]: value },
        }));
      }
    
      async handleSubmit(e) {
        e.preventDefault();
        const { project } = this.state;
        console.log(project); // eslint-disable-line no-console
        const query = `mutation projectUpdate(
          $id: Int!
          $changes: ProjectUpdateInputs!
        ) {
          projectUpdate(
            id: $id
            changes: $changes
          ) {
            id title status owner
            effort created due description
          }
        }`;

        const {id, created, ...changes} = project;
        const data = await graphQLFetch(query, {changes, id});
        if (data) {
          this.setState({ project: data.projectUpdate });
          alert('Updated issue successfully'); // eslint-disable-line no-alert
        }

      }
    
      async loadData() {
        const query = `query project($id: Int!) {
          project(id: $id) {
            id title status owner
            effort created due description
          }
        }`;
    
        const { match: { params: { id } } } = this.props;
        const data = await graphQLFetch(query, { id });
        this.setState({ project: data.project ? data.project : {} });
      }
    
      render() {
        const { project: { id } } = this.state;
        const { match: { params: { id: propsId } } } = this.props;
        if (id == null) {
          if (propsId != null) {
            return <h3>{`project with ID ${propsId} not found.`}</h3>;
          }
          return null;
        }

        const { project: { title, status } } = this.state;
        const { project: { owner, effort, description } } = this.state;
        const { project: { created, due } } = this.state;
    
        return (
          <form onSubmit={this.handleSubmit}>
            <h3>{`Editing project: ${id}`}</h3>
            <table>
              <tbody>
                <tr>
                  <td>Created:</td>
                  <td>{created.toDateString()}</td>
                </tr>
                <tr>
                  <td>Status:</td>
                  <td>
                    <select name="status" value={status} onChange={this.onChange}>
                      <option value="New">New</option>
                      <option value="Assigned">Assigned</option>
                      <option value="Fixed">Fixed</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Owner:</td>
                  <td>
                    <TextInput
                      name="owner"
                      value={owner}
                      onChange={this.onChange}
                      key={id}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Effort:</td>
                  <td>
                    <NumInput
                      name="effort"
                      value={effort}
                      onChange={this.onChange}
                      key={id}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Due:</td>
                  <td>
                    <input
                      name="due"
                      value={due}
                      onChange={this.onChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Title:</td>
                  <td>
                    <TextInput
                      size={50}
                      name="title"
                      value={title}
                      onChange={this.onChange}
                      key={id}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Description:</td>
                  <td>
                    <TextInput
                      tag="textarea"
                      rows={8}
                      cols={50}
                      name="description"
                      value={description}
                      onChange={this.onChange}
                      key={id}
                    />
                  </td>
                </tr>
                <tr>
                  <td />
                  <td><button type="submit">Submit</button></td>
                </tr>
              </tbody>
            </table>
            <Link to={`/edit/${id - 1}`}>Prev</Link>
            {' | '}
            <Link to={`/edit/${id + 1}`}>Next</Link>
          </form>
        );
      }
}
