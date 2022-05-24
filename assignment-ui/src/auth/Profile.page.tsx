import React, { ReactElement, RefAttributes, useEffect, useState } from "react";
import { Button, Card, Col, Form, FormControl, Image, InputGroup, Row } from "react-bootstrap";
import { getUser, getUserById, updateImageUser, updateUser } from "./auth.service";
import { decodeToken } from "../common/http";
import ImagePreview from "../common/Image.preview";
import { ToastSuccessMsg } from "../common/toast";



export default function ProfilePage({ }: any): ReactElement {

    let [id, setId]: any = useState({});
    let [user, setUser]: any = useState({});

    useEffect(() => {
        (async () => {
            await loadUserId();
        })();

    }, [])


    const loadUserId = async () => {

        let res = await getUser()
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            setId(data?.id)
            setUser(data)
            console.log('getUserById', data.id)
        }
    }



    const [formData, setFormData]: any = useState(user)

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onInputFileChange = (e: any) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.files[0]
        })

    }

    const onUploadAction = async (e: any) => {

        let data = new FormData();

        data.append('firstname', user.firstname)
        data.append('lastname', user.lastname)
        data.append('dateOfbirth', user.dateOfbirth)
        data.append('address', user.address)

        data.append('short_bio', user.short_bio)
        data.append('bio', user.bio)

        console.log("data", data)

        const res = await updateUser(id, data)
        if (res.ok) {
            const result = await res.json()
            console.log('msg', data);
            ToastSuccessMsg("Update Successfully");
        } else if (res.status === 401) {
            alert("failed")
        } else {
            alert("Error submitting form!");
        }

    }


    const updateImage = async (e: any) => {
        let data = new FormData();
        data.append('profile_image', formData.profile_image ? formData.profile_image : user.profile_image)

        console.log("data", data)

        const res = await updateImageUser(id, data)
        if (res.ok) {
            const result = await res.json()
            console.log('msg', data);
            ToastSuccessMsg("Update Successfully");
        } else if (res.status === 401) {
            alert("failed")
        } else {
            alert("Error submitting form!");
        }
    }

   

    return (

        <div className="mt-4 container-fluid">

            {user &&
                <Card>
                    <Card.Header>
                        <Row>
                            <Col> User Name: {user.firstname} - UserId: {user.id}</Col>
                        </Row>
                    </Card.Header>

                    <Card.Body>

                        <Form>

                            <Col lg={4} sm={12}>
                                <ImagePreview imagePath={user.profile_image} inputName="profile_image" onInputFileChange={onInputFileChange} />
                                <Button className="mt-3 shadow-none" type="button" size="sm" onClick={updateImage}> Update Profile Image </Button>
                            </Col>


                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> First Name</Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="firstname" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={user.firstname}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Last Name </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="lastname" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={user.lastname}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Date of Birth </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="date" name="dateOfbirth" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={user.dateOfbirth}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Address </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="address" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={user.address}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Short Bio </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="short_bio" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={user.short_bio}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Bio </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="bio" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={user.bio}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <div className="float-right"> 
                                <Button type="button" size="sm" className="shadow-none" onClick={onUploadAction}> Update </Button>
                            </div>

                        </Form>

                    </Card.Body>

                </Card>
            }
        </div>


    )
};