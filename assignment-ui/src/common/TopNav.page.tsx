import React, { ReactElement, useEffect, useState } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { BrowserRouter as Router, Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'


import back from '../icons/back.png';
import { getUserProfileImage, isLoggedIn, unsetToken } from "./http";


interface Props {

}

export default function TopNav({ }: Props): ReactElement {
    const history = useHistory()

    const onBackClick = async () => {
        history.push(`/`)
    }

    const onLoginClick = async () => {
        history.push(`/login`)
    }

    const onLogoutClick = async () => {
        unsetToken();
        history.push('/login')
    }

    // const onRegisterClick = async () => {
    //     history.push(`/registration`)
    // }


    return (
        <div className="main-section">
            {/* <h1>Welcome To Rental App </h1>

            <div className="menu">
                <Link to="/login" > Login </Link>
                <Link to="/me" > Home Page </Link>
                <Link to="/registration" > Registration </Link>
                <Link to="/drivers" > Driver </Link>
            </div> */}

            {/* style={{ backgroundColor: "#DFE1E6  !important"}}  */}

            <Navbar className="d-none d-lg-block " expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/">Online Tutor</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">

                            <Nav.Link href="/teachers">Teachers</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            <Nav.Link href="/contacts">Contacts</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>

                            {/*<Button variant="outline-primary" type="button" className="m-1"
                            onClick={onRegisterClick} size="sm"> Sign Up </Button>*/}



                            {!isLoggedIn() ?
                                <>
                                    <Nav.Link className="text-primary" href="/registration">Registration</Nav.Link>
                                    <Button type="button" variant="primary" className="m-1 shadow-none" onClick={onLoginClick}
                                        size="sm"> Login </Button>
                                </>
                                :
                                <>
                                    <Nav.Link className="text-primary" href="/me">
                                        {getUserProfileImage() ?
                                            <img style={{ width: "27px", height: '27px', margin: '0 5px' }} src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + getUserProfileImage()} alt="img" />
                                            :
                                            "Dashboard"
                                        }
                                    </Nav.Link>
                                    <Button type="button" variant="danger" className="m-1 shadow-none" onClick={onLogoutClick}
                                        size="sm"> Logout </Button>
                                </>
                            }

                            {/* <Nav.Link style={{ color: "tomato" }} eventKey="1" href="/login">
                                Login
                            </Nav.Link> */}

                            {/* <Nav.Link eventKey={2} href="/registration">
                                Sign Up
                            </Nav.Link> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* <img className=" d-sm-block d-lg-none" src={back} alt="back" onClick={onBackClick} /> */}


        </div>
    )
}
