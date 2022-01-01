import React from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';

const ProjectRow = withRouter(({project, location:{search}}) => {
  const selectLocation = { pathname: `/projects/${project.id}`, search };
  return (
    <tr>
      <td>{project.id}</td>
      <td>{project.status}</td>
      <td>{project.owner}</td>
      <td>{project.created.toDateString()}</td>
      <td>{project.effort}</td>
      <td>{project.due ? project.due.toDateString() : ''}</td>
      <td>{project.title}</td>
      <td>
        <Link to={`/edit/${project.id}`}>Edit</Link>
        {' | '}
        <NavLink to={selectLocation}>Details</NavLink>
      </td>
    </tr>
  );
});

export default function ProjectTable({ projects }) {
  const projectRows = projects.map(project => (
    <ProjectRow key={project.id} project={project} />
  ));

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Due Date</th>
          <th>Title</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {projectRows}
      </tbody>
    </table>
  );
}
