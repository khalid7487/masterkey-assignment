import React, { ReactElement, useState, useEffect } from "react";
import { Button, Card, Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { AddOrders, AddPromo, getDecodeToken, getUserById, getVehicleById, getVehicleTripById } from "./DefaultHome.service";
import { ToastFailedMsg, ToastSuccessMsg } from "../common/toast";
import { useParams, useHistory } from "react-router-dom";
import TopNav from "../common/TopNav.page";
import BottomNav from "../common/BottomNav.page";
import Footer from "../common/Footer.page";
import { getLoggedUserRoles, isLoggedIn } from "../common/http";


export default function OrderCreatePage({ handleClose }: any): ReactElement {

    let { id }: any = useParams();

    let history = useHistory();

    const [formData, setFormData]: any = useState({
        domain: '',
        orginal_price: '',
        from_location: '',
        to_location: '',
        from_date: '',
        to_date: '',
        referral_by: '',
        promo_code: '',
        comments: '',
        sourceRef: '',
        sourceType: '',
        user: ''
    })

    let [user, setUser]: any = useState({});
    let [vehicleTrip, setVehicleTrip]: any = useState({});
    let [vehicle, setVehicle]: any = useState({});

    useEffect(() => {
        (async () => {
            if (isLoggedIn()) {
                await loadData();
                await loadTripDetails(id);
                await loadVehicleDetails(id);
            } else {
                history.push('/login')
            }


        })()

        // (async () => {
        //     await loadData();
        // })()

    }, [id])

    const loadData = () => {
        let res = getDecodeToken()
        console.log(res)
        setUser(res)
    }

    const loadTripDetails = async (id: any) => {

        let res = await getVehicleTripById(id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log("Trip", data)
            setVehicleTrip(data)
            // console.log(data.id)
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
            // console.log(data.id)
        } else {
            //let error = await res.json()
        }
    }


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...vehicle,
            [e.target.name]: e.target.value
        })
    }

    const onInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        let data = {
            user_id: user.id,
            trip_id: id,
            vehicle_id: vehicle.id,
            comments: formData.comments,
            promo_code: formData.promo_code,
            // driver_id: 2,
            // approve_by: 2,
            // referral_by: 2

        }

        console.log(data)

        if (getLoggedUserRoles()?.includes('TO_RENT')) {
            let res = await AddOrders(data)
            if (res.status === 200 || res.status === 201) {
                let data = await res.json()
                console.log('msg', data);
                ToastSuccessMsg("Order Successfully saved")
                setFormData({})

            } else if (res.status === 400) {
                ToastFailedMsg("Order is already pending. Check Your Dashborad")
            } else {

                ToastFailedMsg("Order Failed to saved.")
            }
        }else{
            ToastFailedMsg("Order Not available.")
        }


    }



    const onUploadAction = async (e: any) => {

        let data = {
            promo_code: formData.promo_code,
        }

        const res = await AddPromo(data)

        if (res.ok) {
            let { promo_discount_amount, promo_discount_type } = await res.json()
            let updtatedTripPrice = vehicleTrip.price - promo_discount_amount;
            console.log(updtatedTripPrice)

            vehicleTrip.price = updtatedTripPrice

            setVehicleTrip({ ...vehicleTrip, vehicleTrip })

            ToastSuccessMsg("Apply  Successfully your promo")
        } else if (res.status === 400) {
            ToastFailedMsg("Invalid promo code")
        } else {
            ToastFailedMsg("Vehicle Failed to saved")
        }

    }



    return (
        <>
            <TopNav />
            <div className="min-vw-100 min-vh-100 d-flex justify-content-center align-items-center container-fluid">

                <Card>

                    {/* <Card.Header>
                        <Row>
                            <Col>Order Panel</Col>
                        </Row>
                    </Card.Header> */}

                    <Card.Title className="mt-3 pl-2 pr-2">Order Panel</Card.Title>

                    <Card.Text className="pl-2 pr-2" >You have to login before orders and you may leve your commnet</Card.Text >

                    <Card.Body>

                        <Form method="post" onSubmit={onFormSubmit}>

                            <Form.Label>Price </Form.Label>
                            <InputGroup size="sm" className="mb-3">
                                <FormControl className="shadow-none" type="text" readOnly name="price"
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    defaultValue={vehicleTrip.price ? vehicleTrip.price : ''}
                                    onChange={onInputChange} />
                            </InputGroup>

                            <Form.Label> From Location </Form.Label>
                            <InputGroup size="sm" className="mb-3">
                                <FormControl className="shadow-none" type="text" readOnly name="from_location"
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    defaultValue={vehicleTrip.from_location ? vehicleTrip.from_location : ''}
                                    onChange={onInputChange} />
                            </InputGroup>


                            <Form.Label> To Location </Form.Label>
                            <InputGroup size="sm" className="mb-3">
                                <FormControl className="shadow-none" type="text" readOnly name="to_location"
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    defaultValue={vehicleTrip.to_location ? vehicleTrip.to_location : ''}
                                    onChange={onInputChange} />
                            </InputGroup>


                            <Form.Label> From Date </Form.Label>

                            <InputGroup size="sm" className="mb-3">
                                <FormControl className="shadow-none" type="text" readOnly name="from_date"
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    defaultValue={vehicleTrip.from_date ? vehicleTrip.from_date : ''}
                                    onChange={onInputChange} />
                            </InputGroup>

                            <Form.Label> To Date </Form.Label>

                            <InputGroup size="sm" className="mb-3">
                                <FormControl className="shadow-none" type="text" readOnly name="to_date"
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    defaultValue={vehicleTrip.to_date ? vehicleTrip.to_date : ''}
                                    onChange={onInputChange} />
                            </InputGroup>


                            {/* <Form.Group as={Row}>
                            <Form.Label column sm="2"> Referral By </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="referral_by" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.referral_by ? formData.referral_by : ''}
                                        onChange={onInputChange} />
                                </InputGroup>
                            </Col>
                        </Form.Group> */}
                            <div>
                                <Form.Label> Promo Code </Form.Label>
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="promo_code"
                                        aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.promo_code ? formData.promo_code : ''}
                                        onChange={onInputChange1} />
                                </InputGroup>
                                {/* {vehicleTrip.price} */}
                                <Button className="float-right mb-3 shadow-none" variant="outline-primary" type="button" onClick={onUploadAction} size="sm"> Apply Promo </Button>
                            </div>
                            <div >
                                <Form.Label > Message </Form.Label>
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl as="textarea" className="shadow-none" type="text" name="comments" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.comments ? formData.comments : ''}
                                        onChange={onInputChange1} />
                                </InputGroup>
                            </div>

                            <div className="float-right">
                                <Button type="submit" className="float-right shadow-none" size="sm"> Submit Order</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
            <Footer />
            <BottomNav />
        </>
    )
};