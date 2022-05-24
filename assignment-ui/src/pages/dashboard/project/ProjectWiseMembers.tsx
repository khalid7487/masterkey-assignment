import React, { ReactElement, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, Row, } from "react-bootstrap";
import { getProjectwiseUser} from "./project.service";



// interface Props {
//     selectedItem: any,
//     show: boolean,
//     handleClose: any,
// }

export default function TripCreatePage({ handleClose }: any): ReactElement {

    let { id }: any = useParams();
    let [user, setUser]: any = useState([]);

    useEffect(() => {
        console.log('msg', id);

        (async () => {
            await loadVehicleDetails(id);
        })();


    }, [ ])

    const loadVehicleDetails = async (id: any) => {

        let res = await getProjectwiseUser(id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json();
            setUser(data);
        } else {
            //let error = await res.json()
        }
    }

    return (

        <div className="mt-4 container-fluid">

        <Row>
            {user?.map((user: any, index: number) => (
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
                                        <Col lg={4} sm={12} className=" text-capitalize "><strong>User Status: </strong> {user?.user_status}</Col>
                                    </Row>

                                    <Row className="mt-1">
                                        <Col lg={4} sm={12} className=" text-capitalize "><strong>Username: </strong> {user.username}</Col>
                                        <Col lg={4} sm={12} className=" text-capitalize "><strong>Email: </strong> {user.email}</Col>
                                        <Col lg={4} sm={12} className=" text-capitalize "><strong>Phone: </strong> {user.phone}</Col>
                                    </Row>

                                

                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            ))
            }
        </Row >



       
    </div>


    )
};