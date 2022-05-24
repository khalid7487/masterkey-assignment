import React, { ReactElement, useEffect, useState } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { BrowserRouter as Router, Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'

import { getUserProfileImage, isLoggedIn, unsetToken } from "./http";


interface Props {

}

export default function TopNav({ }: Props): ReactElement {
    const history = useHistory()

    const onLoginClick = async () => {
        history.push(`/login`)
    }

    const onLogoutClick = async () => {
        unsetToken();
        history.push('/login')
    }


    return (
        <div className="main-section">
         
            <Navbar className="d-none d-lg-block " expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/">Assignment</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>


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
  
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* <img className=" d-sm-block d-lg-none" src={back} alt="back" onClick={onBackClick} /> */}


        </div>
    )
}
