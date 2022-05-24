import React, { RefAttributes, ReactElement, useState, useEffect } from "react";
import { Button, Card, Col, Row, Container, Form, InputGroup, FormControl, Image, Carousel } from 'react-bootstrap';
import { getVehicleTripById, getVehicleById, getUserById, getPackageById } from "./DefaultHome.service";

import { ToastFailedMsg, ToastSuccessMsg, ToastWarningMsg } from "../common/toast";
import { useParams, useHistory } from "react-router-dom";

import pp from "../icons/profile-img.png";
import car from "../icons/car.png";

import TopNav from "../common/TopNav.page";
import BottomNav from "../common/BottomNav.page";
import Footer from "../common/Footer.page";
import defaultImage from "../icons/d-background.jpg";

import DefaultImagePreview from "../common/DefaultImage.preview";

import message from "../icons/message.png";

export default function DetailsPage({ handleClose }: any): ReactElement {


    let { id }: any = useParams();
    let history = useHistory();


    let [vehicletrip, setVehicleTrip]: any = useState({});
    let [vehicle, setVehicle]: any = useState({});
    let [userId, setUserId]: any = useState({});
    let [user, setUser]: any = useState({});
    let [packages, setPackage]: any = useState([]);

    useEffect(() => {
        console.log('msg', id);

        (async () => {
            await loadTripDetails(id);
            await loadVehicleDetails(id);
            await loadUserDetails(userId);
            await loadPackageDetails(userId);
        })();
    }, [id, userId])

    const loadTripDetails = async (id: any) => {

        let res = await getVehicleTripById(id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log(data)
            setVehicleTrip(data)
        } else {
            //let error = await res.json()
        }
    }

    const loadVehicleDetails = async (id: any) => {

        let res = await getVehicleById(id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log("vehicle", data)
            setVehicle(data)
            if (typeof data.id !== 'undefined') {
                setUserId(data?.id)
            }
            console.log(userId)
        } else {
            //let error = await res.json()
        }
    }

    const loadUserDetails = async (id: any) => {

        let res = await getUserById(id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log("User", data)
            setUser(data)
            // console.log(data.id)
        } else {
            //let error = await res.json()
        }
    }

    const loadPackageDetails = async (id: any) => {

        let res = await getPackageById(id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log("packages", data)
            setPackage(data)
            // console.log(data.id)
        } else {
            //let error = await res.json()
        }
    }

    const onOpenClick = async (item: any) => {
        history.push(`/details/${item.id}`)
    }

    const onOrderClick = async (item: any) => {
        history.push(`/order/${item.id}`)
    }

    const onHiredriverClick = async (item: any) => {
        history.push(`/hire-teachers/${item.id}`)
    }

    return (
        <>
            <TopNav />
            <div className="container-fluid">

                <Row>

                    <Carousel fade className="w-100 h-100">
                        <Carousel.Item interval={1000}>
                            {/* <img
                                className="d-block w-100"
                                src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + vehicle?.vehicle_photo1}
                                alt="First slide"
                            /> */}
                            <DefaultImagePreview imagePath={vehicle?.vehicle_photo1} defaultImage={defaultImage} />
                            <Carousel.Caption>
                                {/* <h3>First Side Of Vehicle</h3>
                                <p>This is 1st Photo of Vehicle</p> */}
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={1000}>
                            {/* <img
                                className="d-block w-100"
                                src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + vehicle?.vehicle_photo2}
                                alt="Second slide"
                            /> */}
                            <DefaultImagePreview imagePath={vehicle?.vehicle_photo2} defaultImage={defaultImage} />
                            <Carousel.Caption>
                                {/* <h3>Second Side Of Vehicle</h3>
                                <p>This is 2nd Photo of Vehicle</p> */}
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={1000}>
                            {/* <img
                                className="d-block w-100"
                                src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + vehicle?.vehicle_photo3}
                                alt="Third slide"
                            /> */}
                            <DefaultImagePreview imagePath={vehicle?.vehicle_photo3} defaultImage={defaultImage} />
                            <Carousel.Caption>
                                {/* <h3>Third Side Of Vehicle</h3>
                                <p>This is 3rd Photo of Vehicle</p> */}
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={1000}>
                            {/* <img
                                className="d-block w-100"
                                src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + vehicle?.vehicle_photo4}
                                alt="Four slide"
                            /> */}
                            <DefaultImagePreview imagePath={vehicle?.vehicle_photo4} defaultImage={defaultImage} />
                            <Carousel.Caption>
                                {/* <h3>Four Side Of Vehicle</h3>
                                <p>This is 4th Photo of Vehicle</p> */}
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>


                    <Col className="mt-3" sm="12">
                        <Card className="shadow-lg bg-white rounded">
                            <Card.Body >
                                <Row>

                                    <Col sm={2} md={9}>
                                        {/* <div className="d-flex justify-content-between">
                                            <span>BDT:{vehicletrip.price}</span>
                                            <span>ratiing</span>
                                        </div> */}
                                        <div className="d-flex justify-content-between">
                                            <div className="h5 text-primary ">BDT <span className="h3 ">{vehicletrip.price}</span></div>
                                            <span className="font-weight-bold text-danger "> &#9733; 4.5 Rating</span>
                                        </div>

                                        <span className="font-weight-bold text-uppercase " >{vehicletrip.from_location} to {vehicletrip.to_location}</span>

                                        <span className="d-flex justify-content-between  text-capitalize mt-1">
                                            <span>From: {vehicletrip.from_date}</span>
                                            <span>To: {vehicletrip.to_date}</span>
                                        </span>
                                        <span className="d-flex  justify-content-between text-capitalize mt-1">
                                            <span>Distance: {vehicletrip.distance}</span>
                                            <span className="text-capitalize">Type- {vehicletrip?.trip_type}</span>
                                        </span>


                                        <div className="d-flex justify-content-between mt-1">
                                            <span>Model-{vehicle.vehicle_model}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mt-2">
                                            <Button className="shadow-none" variant="outline-primary" type="button" size="sm"> Messenger </Button>
                                            <Button type="button" className="shadow-none" size="sm" onClick={((event: any) => onOrderClick(vehicletrip))} > Booking Now </Button>
                                        </div>
                                    </Col>

                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>


                <Row>

                    <Col className="mt-3" sm="12">
                        <Card className="shadow-lg bg-white rounded">
                            <Card.Body >
                                <Row>
                                    <Col sm={6} md={3}>
                                        <img style={{ width: "100px", height: '100px' }} src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + user?.profile_image} alt="img" />
                                        {/* <DefaultImagePreview imagePath={user?.profile_image} defaultImage={pp} /> */}
                                    </Col>

                                    <Col sm={2} md={9}>
                                        <Row >
                                            <Col lg={4} xs={12} className="mb-1">Full Name: {user.firstname} {user.lastname} </Col>
                                            <Col lg={4} xs={12} className="mb-1">Address: {user.address}</Col>
                                            <Col lg={4} xs={12} className="mb-1">Register Date:{new Date(user?.create_at).toDateString()} </Col>
                                            {/* <Col lg={3} xs={12} className="mb-1">Rating: {user.rating} </Col> */}
                                        </Row>
                                        {/* <Row>
                                            <Col lg={3} xs={12} className="mb-1">Total Trips: 10</Col>
                                            <Col lg={3} xs={12} className="mb-1">Rejected Trips: 2</Col>
                                            <Col lg={3} xs={12} className="mb-1">Success Trip: 8</Col>
                                        </Row> */}
                                        <Row>
                                            <Col className="float-right">
                                                <Button type="button" className="shadow-none" size="sm" onClick={((event: any) => onHiredriverClick(user))} > Hire Driver </Button>
                                            </Col>
                                        </Row>

                                    </Col>

                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>

                <div className="mt-3">
                    <strong> Vechile Packages:</strong>
                </div>

                <Row>

                    {packages?.map((item: any, index: number) =>

                        <Col key={index} className="mt-3" sm="4">
                            <Card className="shadow-lg bg-white rounded">
                                <Card.Body role="button">
                                    <Row>
                                        {/* <Col sm={6} md={3}> <img style={{width: "100%" , height: "100%"}} src={ process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/'+ item.vehicles.vehicle_photo1} alt="img"/></Col> */}
                                        <Col onClick={((event: any) => onOpenClick(item))} sm={6} md={3}>
                                            <DefaultImagePreview imagePath={item.vehicle?.vehicle_photo1} defaultImage={car} />
                                            {/* <img style={{ width: "100%" }} src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + item.vehicle?.vehicle_photo1} alt="img" /> */}
                                        </Col>

                                        <Col onClick={((event: any) => onOpenClick(item))} sm={2} md={9}>

                                            <div className="d-flex justify-content-between mt-3">
                                                <div className="h5 text-primary ">BDT <span className="h3 ">{item?.price}</span></div>
                                                <span className="font-weight-bold text-danger "> &#9733; 4.5 Rating</span>
                                            </div>

                                            <span className="font-weight-bold text-uppercase">{item.from_location} to {item.to_location}</span>

                                            <span className="d-flex justify-content-between  text-capitalize mt-1">
                                                <span>From: {item.from_date}</span>
                                                <span>To: {item.to_date}</span>
                                            </span>

                                            <span className="d-flex justify-content-between text-capitalize mt-1">
                                                <span>Distance: {item.distance}</span>
                                                <span className="text-uppercase">Model-{item?.vehicle?.vehicle_model}</span>

                                            </span>
                                            {/* 
                                            <div className="d-flex justify-content-between mt-1">
                                                <span>Success: 4 trips</span>
                                            </div> */}

                                            {/* <div className="d-flex justify-content-between">
                                                <Button type="button" size="sm" > Call </Button>
                                                <Button type="button" size="sm" > Message </Button>
                                            </div> */}
                                        </Col>
                                        <Col>
                                            <div className="d-flex  float-right">
                                                {/* <Button type="button" size="sm" > <img style={{ height: "20px" }} src={call} /> Call </Button> */}
                                                <Button type="button" variant="outline-primary" className="mt-2 shadow-none" style={{ position: 'relative', zIndex: 2 }}
                                                    size="sm" onClick={((event: any) => onOrderClick(item))}> <img style={{ height: "20px" }} src={message} />
                                                    Book Now </Button>
                                            </div>
                                        </Col>

                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}


                </Row>

            </div >
            <Footer />
            <BottomNav />
        </>
    )
};