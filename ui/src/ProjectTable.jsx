import React from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';
import {Button, Tooltip, OverlayTrigger, Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinusCircle, faTrash} from '@fortawesome/free-solid-svg-icons';
import { LinkContainer } from 'react-router-bootstrap';


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
          <Button size="sm" onClick={() => { closeProject(index); }}>
            <FontAwesomeIcon icon={faMinusCircle}/>
          </Button>
        </OverlayTrigger>
        {' '}
        <OverlayTrigger delayShow={1000} overlay={deleteTooltip}>
          <Button size="sm" onClick={() => { deleteProject(index); }}>
            <FontAwesomeIcon icon={faTrash}/>
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
    <Table bordered condensed hover responsive>
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
    </Table>
  );
}
