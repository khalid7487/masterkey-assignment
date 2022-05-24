import React, { ReactElement, useEffect, useState } from "react";
import { Button, Card, Col, Row, Table, Pagination, Form, InputGroup, FormControl } from 'react-bootstrap';
import { create, deleteItemById, download, gets, update, UpdateVehicleStatus } from "./vehicle.service";
import { ToastFailedMsg, ToastSuccessMsg, ToastWarningMsg } from "../../../common/toast";
import { useHistory } from "react-router-dom";
import { getLoggedUserId, getLoggedUserRoles } from "../../../common/http";


interface Props {

}

export default function VehiclePage({ }: Props): ReactElement {
    let history = useHistory();

    let [response, setResponse]: any = useState([]);
    let [projectStatus, setTripStatus]: any = useState([
        { name: 'PROGRESS', value: "PROGRESS" }, { name: 'OPEN', value: "OPEN" }, { name: 'COMPLETE', value: "COMPLETE" }
    ]);


    const [filterQueries, setFilterQueries] = useState({
        page: 0,
        limit: '',
        id: '',
        userId: getLoggedUserId(),
        project_status: ''
    });

    const onDeleteClick = async (item: any) => {
        let res = await deleteItemById(item.id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            await loadData({});
            ToastSuccessMsg("Deleted Successfully");
        } else {
            //let error = await res.json()
            ToastFailedMsg("Failed to Delete");
        }
    }

    const onOpenClick = async (item: any) => {
        history.push(`/me/project/${item.id}`)
    }

    const onAddtripClick = async (item: any) => {
        history.push(`/me/get-project-wise-user/${item.id}`)
    }


    const approveStatus = async (item: any) => {

        let data = {
            project_status: "COMPLETE"
        }

        let res = await UpdateVehicleStatus(item.id, data)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            await loadData({});
            ToastSuccessMsg("Trip Approved Successfully");
        } else {
            //let error = await res.json()
            ToastFailedMsg("Trip Approved faield ");
        }
    }



    useEffect(() => {

        (async () => {

            if (getLoggedUserRoles()?.includes('SUPERVISOR')) {
                filterQueries['userId'] = ''
                await loadData(filterQueries);
            } else {
                await loadData(filterQueries);
            }

        })()
    }, [])


    const loadData = async (queries: any) => {
        console.log("something", queries)
        let res = await gets(queries)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()

            console.log('msg', data);
            // if (isMounted) setResponse(data)
            setResponse(data)
        } else {
            //let error = await res.json()
        }
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterQueries({
            ...filterQueries,
            [e.target.name]: e.target.value
        })
    }



    return (
        <div className="mt-4 container-fluid">

            <Card>
                <Card.Header>
                    <Row>
                        <Col>PRoject Panel</Col>
                    </Row>
                </Card.Header>

                <Card.Body>

                    <Form >
                        <Row>

                            <Col lg={6}>
                                <Form.Label  > Project Status </Form.Label>
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl as="select" className="shadow-none" type="text" name="project_status" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        onChange={onInputChange}>
                                        <option>Select Status Type</option>
                                        {projectStatus?.map((projectStatus: any, index: number) =>
                                            <option value={projectStatus.value} key={index}>{projectStatus.name}</option>
                                        )}
                                    </FormControl>
                                </InputGroup>

                                {/* <Button type="button" size="sm" onClick={loadData}> Update </Button> */}
                                <Button type="button" className="float-right m-1 shadow-none"
                                    onClick={e => loadData({
                                        id: filterQueries?.id,
                                        userId: filterQueries?.userId,
                                        project_status: filterQueries?.project_status
                                    })}

                                    size="sm"> Search </Button>
                            </Col>

                        </Row>
                    </Form>

                </Card.Body>
            </Card>

            <Row>
                {response.data?.map((item: any, index: number) => (
                    <Col key={index} className="mt-3" sm="12">
                        <Card className="shadow-lg bg-white  rounded" role="button">
                            <Card.Body>

                                <Row>
                                    <Col>
                                        <Row className="text-capitalize mt-1">
                                            <Col lg={4} sm={12} ><strong>Project Name:</strong> {item?.project_name}</Col>
                                            <Col lg={4} sm={12} ><strong>Status: {item?.project_status}</strong>
                                                {/* {item.vehicle_status === 0 && (<span style={{ color: 'blue' }} > Pending</span>)} */}
                                            </Col>
                                            <Col lg={4} sm={12} ><strong>Project Title:</strong> {item?.project_title}</Col>
                                        </Row>
                                        <Row className="text-capitalize mt-1">
                                            <Col lg={4} sm={12}><strong>Project Description:</strong> {item?.project_description}</Col>
                                            <Col lg={4} sm={12}><strong>Total Project Members:</strong> {item?.total_project_members}</Col>
                                            <Col lg={4} sm={12}><strong>Enroll Status:</strong> {item?.enroll_status ? "TRUE" : "FALSE"}</Col>
                                        </Row>

                                        <Row className="text-capitalize mt-3">

                                            <Col className="d-flex justify-content-between">
                                                <Button className="shadow-none" size="sm" variant="danger" onClick={(event => onDeleteClick(item))}> Delete </Button> {' '}
                                                {
                                                    item?.project_status == "PROGRESS" ?
                                                        <Button className="shadow-none" size="sm" variant="primary"
                                                            onClick={(event => approveStatus(item))}> Complete Project </Button> : ""
                                                }

                                                <Button className="shadow-none" size="sm" variant="primary" onClick={(event => onOpenClick(item))}> Edit </Button> {' '}
                                                <Button className="shadow-none" size="sm" variant="primary" onClick={(event => onAddtripClick(item))}>Enrolled Members</Button>
                                            </Col>

                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div className="d-flex justify-content-between mt-3">
                <div>Items: {response?.limit}</div>
                <div>
                    <Pagination size="sm">
                        <Pagination.Prev onClick={e => loadData({
                            page: response.page - 1,
                            id: filterQueries?.id,
                            userId: filterQueries?.userId,
                            project_status: filterQueries?.project_status
                        })} />
                        <Pagination.Item> Pages: {response?.page}/{response?.totalPage} </Pagination.Item>
                        <Pagination.Next onClick={e => loadData({
                            page: response.page + 1,
                            id: filterQueries?.id,
                            userId: filterQueries?.userId,
                            project_status: filterQueries?.project_status
                        })} />
                    </Pagination>
                </div>

                <div>Total: {response?.count}</div>
            </div>

        </div>
    )
};
