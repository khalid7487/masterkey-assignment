import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Col, Form, FormControl, InputGroup, Pagination, Row, Table } from 'react-bootstrap';
import { store } from 'react-notifications-component';

import './Users.scss'
import { deleteUserById, getUsers, UpdateUserStatus } from "./auth.service";
import UsersEditModal from "./UsersEdit.modal";
import UsersDetailsModal from "./UsersDetails.modal";
import React from "react";
import { ToastFailedMsg, ToastSuccessMsg } from "../common/toast";
import { useHistory } from "react-router-dom";

interface Props {

}

export default function UsersPage({ }: Props): ReactElement {
    let history = useHistory();

    let [user, setUser]: any = useState([]);
    let [selectedUser, setSelectedUser]: any = useState();
    let [selectedUserProfile, setSelectedUserProfile]: any = useState({});

    let [userStatus, setTripStatus]: any = useState([
        { name: 'Pending', value: 0 }, { name: 'Approved', value: 1 }, { name: 'Rejected', value: 5 }
    ]);

    let roelName = ["ADMIN", "TO_RENT", "BE_OWNER"]
    const [filterQueries, setFilterQueries] = useState({
        page: 0,
        limit: '',
        id: '',
        name: '',
        status: ''
    });

    // edit modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (selectedUser: any) => {
        setShow(true);
        setSelectedUser(selectedUser);
    }

    // details modal
    const [showUserDetails, setShowUserDetails] = useState(false);
    const handleUserDetailsClose = () => setShowUserDetails(false);
    const handleUserProfileShow = (selectedUserProfile: any) => {
        setShowUserDetails(true);
        setSelectedUserProfile(selectedUserProfile);
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterQueries({
            ...filterQueries,
            [e.target.name]: e.target.value
        })
    }


    useEffect(() => {

        let isMounted = true;

        (async () => {
            await loadData({});
        })()

        return () => { isMounted = false };
    }, [])

    const loadData = async (queries: any) => {
        console.log("something", queries)

        let res = await getUsers(queries)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()

            //console.log('msg', data);
            setUser(data)

        } else {
            //let error = await res.json()
        }
    }

    const onOpenClick = async (item: any) => {
        history.push(`/me/user/${item.id}`)
    }

    const handleDeleteChange = async (item: any) => {
        console.log(item.id)
        let res = await deleteUserById(item.id)
        if (res.status === 200 || res.status === 201) {
            let { data } = await res.json()
            await loadData({});
            ToastSuccessMsg("Deleted Successfully");
        } else {
            //let error = await res.json()
            ToastFailedMsg("Failed to Delete");
        }
    }

    const approveStatus = async (item: any) => {

        let data = {
            status: "1"
        }

        let res = await UpdateUserStatus(item.id, data)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            await loadData({});
            ToastSuccessMsg("Trip Approved Successfully");
            // if (isMounted) setResponse(data)
            // setResponse(data)
        } else {
            //let error = await res.json()
            ToastFailedMsg("Trip Approved faield ");
        }

    }



    return (
        <div className="mt-4 container-fluid">

            <Row>
                {user.data?.map((user: any, index: number) => (
                    <Col key={index} className="mt-3 " sm="12">
                        <Card className="shadow-lg bg-white  rounded" role="button">
                            <Card.Body>
                                <Row>
                                    <Col>

                                        <Row className="mt-1">
                                            <Col lg={4} sm={12} className=" text-capitalize "><strong>User Full Name: </strong> {user.firstname} {user.lastname}</Col>
                                            <Col lg={4} sm={12} className=" text-capitalize "><strong>User Status: </strong>
                                                {user.status === 0 && (<span style={{ color: 'blue' }} >Pending</span>)}
                                                {user.status === 1 && (<span style={{ color: 'green' }}>Approved</span>)}
                                            </Col>
                                            <Col lg={4} sm={12} className=" text-capitalize "><strong>Role:
                                                [ {user.roles?.map((role: any, i: number) =>
                                                    <span key={i}>{role.name} | </span>
                                                )} ] </strong>
                                            </Col>
                                        </Row>

                                        <Row className="mt-1">
                                            <Col lg={4} sm={12} className=" text-capitalize "><strong>Username: </strong> {user.username}</Col>
                                            <Col lg={4} sm={12} className=" text-capitalize "><strong>Email: </strong> {user.email}</Col>
                                            <Col lg={4} sm={12} className=" text-capitalize "><strong>Phone: </strong> {user.phone}</Col>
                                        </Row>

                                        <Row>
                                            <Col className="d-flex justify-content-between mt-2">
                                                <Button className="shadow-none" size="sm" variant="primary" onClick={event => onOpenClick(user)} > Details </Button> {' '}
                                                <Button className="shadow-none" size="sm" variant="danger" onClick={event => handleDeleteChange(user)}> Delete </Button> {' '}
                                                <Button className="shadow-none" size="sm" variant="primary"
                                                    onClick={(event => approveStatus(user))}> Approve</Button> {' '}
                                            </Col>
                                        </Row>

                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
                }
            </Row >

            <div className="d-flex justify-content-between mt-2">
                <div>Items: {user?.limit}</div>

                <div>
                    <Pagination size="sm">
                        <Pagination.Prev onClick={e => loadData({
                            id: filterQueries?.id,
                            page: user.page - 1,
                            name: filterQueries?.name,
                            status: filterQueries?.status
                        })}
                        />
                        <Pagination.Item > Pages: {user?.page}/{user?.totalPage} </Pagination.Item>
                        <Pagination.Next onClick={e => loadData({
                            id: filterQueries?.id,
                            page: user.page + 1,
                            name: filterQueries?.name,
                            status: filterQueries?.status
                        })} />
                    </Pagination>
                </div>

                <div>Total: {user?.count}</div>
            </div>

            <UsersEditModal user={selectedUser} show={show} handleClose={handleClose} />
            <UsersDetailsModal data={selectedUserProfile} show={showUserDetails} handleClose={handleUserDetailsClose} />

        </div>
    )
};