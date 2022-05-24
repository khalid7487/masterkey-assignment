import React, {ReactElement, useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import BottomNav from "../common/BottomNav.page";
import {ToastSuccessMsg} from "../common/toast";
import TopNav from "../common/TopNav.page";
import {getUserById, updateUser} from "../auth/auth.service";
import background from '../icons/Driver-background.jpg';

import Footer from "../common/Footer.page";

export default function HireDriver({}: any): ReactElement {

    let {id}: any = useParams();
    let [user, setUser]: any = useState({});

    useEffect(() => {
        console.log('msg', id);

        (async () => {
            await loadUserDetails(id);
        })();
    }, [id])

    const loadUserDetails = async (id: any) => {
        let res = await getUserById(id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            setUser(data)
            console.log(data)
        } else {
            //let error = await res.json()
        }
    }

    const [formData, setFormData]: any = useState(user)


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onUploadAction = async (e: any) => {

        let data = new FormData();

        data.append('firstname', user.firstname)
        data.append('lastname', user.lastname)
        data.append('dateOfbirth', user.dateOfbirth)
        data.append('address', user.address)
        data.append('latitude', user.latitude)
        data.append('longitude', user.longitude)
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


    return (
        <>
            <TopNav/>
            <div>
                <Row style={{marginRight: "0px"}}>
                    <img className="background-img" src={background} alt="alt"/>
                    <div className="top-left text-light ">
                        <h2>Reach your destination</h2>
                        <h2>In just a few taps!</h2>
                    </div>
                </Row>
                <div className="container-fluid ">

                    {user &&
                    <div className="shadow-lg p-3 mb-3 bg-white rounded" style={{marginTop: '-100px'}}>
                        <Col sm={6} md={6}>
                            <img style={{width: "150px", height: '150px'}}
                                 src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + user?.profile_image}
                                 alt="img"/>
                            {/* <DefaultImagePreview imagePath={user?.profile_image} defaultImage={defaultImage} /> */}
                        </Col>
                        <p>Full Name: {user.firstname} {user.lastname}</p>
                        <p>Phone: {user.phone}</p>
                        <p>Address: {user.address}</p>
                        <p>BIO: {user.bio}</p>
                        <p>Birthday: {user.dateOfbirth}</p>
                        <p>Rating: {user.rating} </p>
                        <p>Total Trip: {user.total_trip} </p>
                        <p>Total Successful Trip: {user?.total_sucessful} </p>
                        <p>Total Rejected Trip: {user?.total_rejection_trip} </p>
                        <p>Registration Date: {new Date(user?.create_at).toDateString()} </p>

                        {/* <div >
                                <Form.Label > <strong>Message: </strong></Form.Label>
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl as="textarea" className="shadow-none" type="text" name="comments" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.comments ? formData.comments : ''}
                                        onChange={onInputChange1} />
                                </InputGroup>
                            </div>
                            <div className="d-flex justify-content-end">
                                <Button type="submit" className="float-right shadow-none" size="sm"> Hire Driver</Button>
                            </div> */}

                    </div>

                    }
                </div>
            </div>
            <Footer/>
            <BottomNav/>
        </>

    )
};