import React from "react";
import {NavLink} from 'react-router-dom'
import {Navbar, Nav, NavItem, OverlayTrigger, Tooltip, Dropdown} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';

import Contents from "./Contents.jsx";

function NavBar(){
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>
                Project Tracker
            </Navbar.Brand>
            <Nav>
                <Nav.Link href="/">Home</Nav.Link>
                {' | '}
                <Nav.Link href="/projects">Project List</Nav.Link>
                {/*NavLink works smoother, but not sure how to style like the bootstrap buttons yet*/}
                {/* <NavLink to="/projects">Project List</NavLink> */}
                {' | '}
                <Nav.Link href="/report">Report</Nav.Link>
                {/* <NavLink to="/report">Report</NavLink> */}
            </Nav>
            <Nav pullRight>
                {/* <NavItem>
                    <OverlayTrigger
                        placement="left"
                        delayShow={1000}
                        overlay={<Tooltip id="create-project">Create Project</Tooltip>}
                    >
                         <FontAwesomeIcon icon={faPlusCircle}/>
                    </OverlayTrigger>
                </NavItem> */}
                <Dropdown>
                    <Dropdown.Item href="#/action-1">About</Dropdown.Item>
                </Dropdown>
            </Nav>
        </Navbar>
    )
}

export default function Page(){
    return (
        <div>
            <NavBar/>
            <Contents/>
        </div>
    )
}