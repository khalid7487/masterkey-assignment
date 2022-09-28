import React, { ReactElement, useState } from "react";
import { Dropdown, DropdownButton, Nav, Navbar, NavItem } from "react-bootstrap";
import { MdClear, MdMenu } from "react-icons/all";
import moment from "moment";

import home from "../icons/home.png";

export default function NavBarComponent({ sidebarToggler, isCollapsed }: any): ReactElement {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)


    const toggle = () => {
        setDropdownOpen(!dropdownOpen)
    }

    return (
        <Navbar className="justify-content-between  mb-5" collapseOnSelect expand="lg" bg="dark" variant="dark">


            <div style={{ color: '#FFFFFF' }} onClick={() => sidebarToggler()}>
                <span>{isCollapsed ? <MdMenu size={30} /> : <MdClear size={30} />}</span>
                <Navbar.Brand> Rental Tool</Navbar.Brand>
            </div>


            <Nav className="" navbar>
                <Navbar.Brand href="/"> <img src={home} alt="alt" /></Navbar.Brand>

            </Nav>


        </Navbar>
    )
};