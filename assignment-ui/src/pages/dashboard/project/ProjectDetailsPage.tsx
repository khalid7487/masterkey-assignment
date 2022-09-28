import React, { ReactElement, RefAttributes, useEffect, useState } from "react";
import { Button, Card, Col, Form, FormControl, Image, InputGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
// @ts-ignore
import { getVehicleById, updateVehicle } from "./project.service";


import { ToastFailedMsg, ToastSuccessMsg } from "../../../common/toast";


export default function VehicleDetailsPage({ }: any): ReactElement {

    let { id }: any = useParams();
    let [vehicle, setVehicle]: any = useState({});

   
    useEffect(() => {
        console.log('msg', id);

        (async () => {
            await loadVehicleDetails(id);
        })();


    }, [id])

    const loadVehicleDetails = async (id: any) => {

        let res = await getVehicleById(id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            setVehicle(data)

        } else {
            //let error = await res.json()
        }
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVehicle({
            ...vehicle,
            [e.target.name]: e.target.value
        })
    }


    const [formData, setFormData]: any = useState(vehicle)





    const onUploadAction = async (e: any) => {


        let data = new FormData();

        data.append('vehicle_model', vehicle.vehicle_model)
        data.append('vehicle_color', vehicle.vehicle_color)
        data.append('vehicle_sits', vehicle.vehicle_sits)
        data.append('vehicle_plate_no', vehicle.vehicle_plate_no)
        
        console.log(data)

        const res = await updateVehicle(id, data)
        if (res.ok) {
            const result = await res.json()
            console.log('msg', result);
            ToastSuccessMsg("Update Successfully")
        } else if (res.status === 401) {
            console.log("failed")
        } else {
            console.log("Error submitting form!");
            ToastFailedMsg("Update falied")
        }

    }


    return (

        <div className="mt-4 container-fluid">

            {vehicle &&
                <Card>
                    <Card.Header>
                        <Row>
                            <Col> Project Name: {vehicle?.project_name} </Col>
                            <Col>
                                {/*<Button className="float-right" size="sm"> Add New</Button>*/}
                                <div className="float-right">
                                    {/*Source: {vehicle.sourceType} | Domain: {vehicle.domain}*/}
                                </div>
                            </Col>
                        </Row>
                    </Card.Header>

                    <Card.Body>


                        <Form>

            
                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Project Name </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="project_name"
                                            aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={vehicle.project_name ? vehicle.project_name : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Project Title </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="project_title"
                                            aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={vehicle.project_title ? vehicle.project_title : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Project Description </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="project_description"
                                            aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={vehicle.project_description ? vehicle.project_description : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>


  
            
                   


                            <div className="float-right">
                                <Button type="button" size="sm" onClick={onUploadAction}> Update </Button>
                            </div>


                        </Form>


                    </Card.Body>


                    <Card.Footer>
                        {/*none*/}
                    </Card.Footer>
                </Card>
            }
        </div>


    )
};