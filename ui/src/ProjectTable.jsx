import React from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';
import {Button, Tooltip, OverlayTrigger} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {trash} from '@fortawesome/free-solid-svg-icons';


const ProjectRow = withRouter(({project, location:{search}, closeProject, deleteProject, index}) => {
  const selectLocation = { pathname: `/projects/${project.id}`, search };
  const closeTooltip = (
    <Tooltip id="close-tooltip" placement="top">Close Project</Tooltip>
  );
  const deleteTooltip = (
    <Tooltip id="delete-tooltip" placement="top">Delete Project</Tooltip>
  );
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
        {' | '}
        <OverlayTrigger delayShow={1000} overlay={closeTooltip}>
          <Button bsSize="xsmall" onClick={() => { closeIssue(index); }}>
            <FontAwesomeIcon icon={trash}/>
          </Button>
        </OverlayTrigger>
        {' '}
        <OverlayTrigger delayShow={1000} overlay={deleteTooltip}>
          <Button bsSize="xsmall" onClick={() => { deleteIssue(index); }}>
             <i class="fas fa-trash"></i>
          </Button>
        </OverlayTrigger>
      </td>
    </tr>
  );
});

export default function ProjectTable({ projects, closeProject, deleteProject }) {
  const projectRows = projects.map((project, index) => (
    <ProjectRow key={project.id} project={project} closeProject={closeProject} deleteProject={deleteProject} index={index}/>
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
