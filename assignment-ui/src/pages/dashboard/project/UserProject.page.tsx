import React, { ReactElement, useEffect, useState } from "react";
import { Button, Card, Col, Row, Table, Pagination } from 'react-bootstrap';
import { addEnrollment, gets} from "./project.service";
import { ToastFailedMsg, ToastSuccessMsg } from "../../../common/toast";
import { useHistory } from "react-router-dom";
import { getLoggedUserId } from "../../../common/http";


interface Props {

}

export default function UserProjectPage({ }: Props): ReactElement {
    
    let [response, setResponse]: any = useState([]);


    const [filterQueries, setFilterQueries] = useState({
        page: 0,
        limit: '',
        id: '',
        project_status: 'OPEN'
    });


    useEffect(() => {

        (async () => {

            
            await loadData(filterQueries);
            

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

    const approveStatus = async (item: any) => {

        let data = {
            project_id: item?.id,
            member_id: getLoggedUserId()
        }

        let res = await addEnrollment(data)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            await loadData({});
            ToastSuccessMsg("Trip Approved Successfully");
        } else {
            //let error = await res.json()
            ToastFailedMsg("You Already Applied.");
        }
    }


    return (
        <div className="mt-4 container-fluid">


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

                                            <Button className="shadow-none" size="sm" variant="primary"
                                                            onClick={(event => approveStatus(item))}> Applly Enrollment </Button>
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
                            project_status: filterQueries?.project_status
                        })} />
                        <Pagination.Item> Pages: {response?.page}/{response?.totalPage} </Pagination.Item>
                        <Pagination.Next onClick={e => loadData({
                            page: response.page + 1,
                            id: filterQueries?.id,
                            project_status: filterQueries?.project_status
                        })} />
                    </Pagination>
                </div>

                <div>Total: {response?.count}</div>
            </div>

        </div>
    )
};
