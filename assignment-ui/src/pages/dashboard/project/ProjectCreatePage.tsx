import React, { ReactElement, RefAttributes, useState, useEffect } from "react";
import { Container, Button, Card, Col, Form, FormControl, InputGroup, Row, Image } from "react-bootstrap";
import { create, addProject } from "./project.service";
import { getUser } from "../../../auth/auth.service";
import { ToastFailedMsg, ToastSuccessMsg } from "../../../common/toast";


// interface Props {
//     selectedItem: any,
//     show: boolean,
//     handleClose: any,
// }

export default function VehicleCreatePage({ handleClose }: any): ReactElement {

    let [response, setResponse]: any = useState([]);

    const [formData, setFormData]: any = useState({
        project_name: '',
        project_title: '',
        project_description: '',
        user: ''
    })

    const [vehicleImage, setVehicleImage]: any = useState([])
    // const [token, setToken]: any = useState(getToken)

    useEffect(() => {
        (async () => {
            await loadData();
        })()

    }, [])

    const loadData = async () => {
        let res = await getUser()
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()


            // if (isMounted) setResponse(data)
            setResponse(data)
            console.log('id', data.id);
            setFormData({
                ...formData,
                user: data.id
            })
        } else {
            //let error = await res.json()
        }
    }




    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }



    const onUploadAction = async (e: any) => {


        const data = {
            project_name: formData.project_name,
            project_title: formData.project_title,
            project_description: formData.project_description,
            userId: formData.user,

        }
    
        console.log(data)

        const res = await addProject(data)
        if (res.ok) {
            const result = await res.json()
            // console.log('msg', data);
            setFormData({
                project_name: '',
                project_title: '',
                project_description: ''
            })
            ToastSuccessMsg("Vehicle Successfully saved")
        } else if (res.status === 401) {
            ToastFailedMsg("Vehicle Failed to saved")
        } else {
            ToastFailedMsg("Vehicle Failed to saved")
        }

    }



    return (

        <div className="mt-4 container-fluid">

            <Card>
                <Card.Header>
                    <Row>
                        <Col>Project Add Panel</Col>
                    </Row>
                </Card.Header>

                <Card.Body>

                    <Form>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Project Name </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="project_name" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.project_name ? formData.project_name : ''}
                                        onChange={onInputChange} />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Project Title </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="project_title" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.project_title ? formData.project_title : ''}
                                        onChange={onInputChange} />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Project Description </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="project_description" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.project_description ? formData.project_description : ''}
                                        onChange={onInputChange} />
                                </InputGroup>
                            </Col>
                        </Form.Group>


                        <div className="float-right">
                            <Button type="button" size="sm" className="shadow-none" onClick={onUploadAction}> Save </Button>
                        </div>


                    </Form>

                </Card.Body>
            </Card>
        </div>


    )
};