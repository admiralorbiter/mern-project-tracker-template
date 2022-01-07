import React from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';
import {Button, Tooltip, OverlayTrigger, Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinusCircle, faTrash} from '@fortawesome/free-solid-svg-icons';
import { LinkContainer } from 'react-router-bootstrap';


const ProjectRow = withRouter(({project, location:{search}, closeProject, deleteProject, index}) => {
  const selectLocation = { pathname: `/projects/${project.id}`, search };
  const editTooltip = (
    <Tooltip id="edit-tooltip" placement="top">Edit Project</Tooltip>
  );
  const closeTooltip = (
    <Tooltip id="close-tooltip" placement="top">Close Project</Tooltip>
  );
  const deleteTooltip = (
    <Tooltip id="delete-tooltip" placement="top">Delete Project</Tooltip>
  );

  function onClose(e){
    e.preventDefault();
    closeProject(index);
  }

  function onDelete(e){
    e.preventDefault();
    deleteProject(index);
  }

  const tableRow = (
    <tr>
      <td>{project.id}</td>
      <td>{project.status}</td>
      <td>{project.owner}</td>
      <td>{project.created.toDateString()}</td>
      <td>{project.effort}</td>
      <td>{project.due ? project.due.toDateString() : ''}</td>
      <td>{project.title}</td>
      <td>
        <Button variant="outline-info" as={Link} to={`/edit/${project.id}`}>
          Edit
        </Button>
        {/* <Link to={`/edit/${project.id}`}>Edit</Link> */}
        {' | '}
        {/* <NavLink to={selectLocation}>Details</NavLink> */}
        <LinkContainer to={selectLocation}>
          <Button variant="outline-info">Details</Button>
        </LinkContainer>
        {' | '}
        <OverlayTrigger delayShow={1000} overlay={closeTooltip}>
          {/* <Button size="sm" onClick={() => { closeProject(index); }}> */}
          <Button size="sm" onClick={onClose}>
            <FontAwesomeIcon icon={faMinusCircle}/>
          </Button>
        </OverlayTrigger>
        {' '}
        <OverlayTrigger delayShow={1000} overlay={deleteTooltip}>
          {/* <Button size="sm" onClick={() => { deleteProject(index); }}> */}
          <Button size="sm" onClick={onDelete}>
            <FontAwesomeIcon icon={faTrash}/>
          </Button>
        </OverlayTrigger>
      </td>
    </tr>
  );

  return(
    <LinkContainer to={selectLocation}>
      {tableRow}
    </LinkContainer>
  );
});

export default function ProjectTable({ projects, closeProject, deleteProject }) {
  const projectRows = projects.map((project, index) => (
    <ProjectRow key={project.id} project={project} closeProject={closeProject} deleteProject={deleteProject} index={index}/>
  ));

  return (
    <Table bordered hover responsive>
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
