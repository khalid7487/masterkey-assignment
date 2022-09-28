import React, { ReactElement, useEffect, useState } from "react";
import { Button, Card, Col, Form, FormControl, InputGroup, Pagination, Row, Table } from 'react-bootstrap';
import { create, deleteItemById, download, gets, update, UpdateEnrollmentStatus } from "./order.service";
import { ToastFailedMsg, ToastSuccessMsg, ToastWarningMsg } from "../../../common/toast";
import { useHistory } from "react-router-dom";


interface Props {

}

export default function OrderPage({ }: Props): ReactElement {
    let history = useHistory();

    let [response, setResponse]: any = useState([]);


    // let orderStatus = ["Pending", "Approved", "Rejected"]

    const [filterQueries, setFilterQueries]: any = useState({
        page: 0,
        limit: '',
        order_status: ''
    });



    useEffect(() => {


        (async () => {
            await loadData(filterQueries);
        })()

    }, [])

    const loadData = async (queries: any) => {

        console.log(queries)

        let res = await gets(queries)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            // if (isMounted) setResponse(data)
            setResponse(data)
        } else {
            //let error = await res.json()
        }
    }


    const approveStatus = async (item: any) => {

        let data = {
        }

        // console.log(data, item.id)
        let res = await UpdateEnrollmentStatus(item.id, data)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('msg', data);
            // if (isMounted) setResponse(data)
            await loadData({});
            ToastSuccessMsg("Order Approved Successfully")
        } else {
            //let error = await res.json()
            ToastFailedMsg("Failed to Approved")
        }
    }



    return (
        <div className="mt-4 container-fluid">

            <Row>
                {response.data?.map((item: any, index: number) => (
                    <Col key={index} className="mt-3 " sm="12">
                        <Card className="shadow-lg bg-white  rounded" role="button">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col lg={4} sm={12} className="h5 text-primary ">Member Id:<span > {item?.member_id}</span></Col>
                                            <Col lg={4} sm={12} className="font-weight-bold text-uppercase ">Project Id:<span > {item?.project_id} </span></Col>
                                            <Col lg={4} sm={12} className=" font-weight-bold">Enrollment Status: {item?.enroll_status ? (<span style={{ color: 'blue' }} >True</span>) : (<span style={{ color: 'blue' }} >False</span>)}</Col>
                                        </Row>

                                        <Row className=" mt-3" >
                                            <Col className="d-flex justify-content-between">
                                                {item?.enroll_status ?
                                                    <Button className="shadow-none " size="sm" variant="primary" >Already Approved</Button>
                                                    :
                                                    <Button className="shadow-none " size="sm" variant="primary" onClick={(event => approveStatus(item))}> Approve  </Button>
                                                }
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
                            trip_id: filterQueries?.trip_id,
                            user_id: filterQueries?.user_id,
                            order_status: filterQueries?.order_status,

                        })} />
                        <Pagination.Item> Pages: {response?.page}/{response?.totalPage} </Pagination.Item>
                        <Pagination.Next onClick={e => loadData({
                            page: response.page + 1,
                            id: filterQueries?.id,
                            trip_id: filterQueries?.trip_id,
                            user_id: filterQueries?.user_id,
                            order_status: filterQueries?.order_status
                        })} />
                    </Pagination>
                </div>

                <div>Total: {response?.count}</div>
            </div>

        </div>
    )
};
