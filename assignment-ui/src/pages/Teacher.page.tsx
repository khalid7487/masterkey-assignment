import React, {ReactElement, useEffect, useState} from "react";
import {Button, Card, Col, Form, FormControl, Pagination, Row} from 'react-bootstrap';
import {getAllPublicTeachers} from "./DefaultHome.service";
import {useHistory} from "react-router-dom";
import defaultImage from '../icons/car.png';


import TopNav from "../common/TopNav.page";
import BottomNav from "../common/BottomNav.page";
import Footer from "../common/Footer.page";


import background from '../icons/d-background.jpg';
import DefaultImagePreview from "../common/DefaultImage.preview";
import location from "../icons/location.png";
import {isLoggedIn} from "../common/http";

interface Props {

}


export default function TeacherPage({}: Props): ReactElement {

    let history = useHistory();

    let [response, setResponse]: any = useState([]);

    const [filterQueries, setFilterQueries] = useState({
        page: 0,
        limit: 12,
        address: ''
    });


    useEffect(() => {

        // let isMounted = true;

        (async () => {
            await loadData({});
        })()

        // return () => {
        //     isMounted = false
        // };

    }, [])

    const loadData = async (queries: any) => {

        console.log("something", queries)

        let res = await getAllPublicTeachers(queries)

        if (res.status === 200 || res.status === 201) {
            let data = await res.json()

            // //console.log('msg', data);
            // if (isMounted) setResponse(data)
            setResponse(data)
            // const date = new Date(data.promo_expire_date);
            console.log(data);

        } else {
            //let error = await res.json()
        }
    }

    // const onOpenClick = async (item: any) => {
    //     history.push(`/details/${item.id}`)
    // }

    const onHireClick = async (item: any) => {
        if (isLoggedIn()) {
            history.push(`/hire-teachers/${item.id}`)
        } else {
            history.push(`/login`)
        }

    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterQueries({
            ...filterQueries,
            [e.target.name]: e.target.value
        })
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
                <div className="container-fluid" style={{background: '#fbfbfb'}}>


                    <div className="">
                        <Form className="shadow-lg p-3 mb-3 bg-white rounded"
                              style={{marginTop: '-130px', background: '#FFFFFF', minHeight: '200px'}}>

                            <Row className="pl-3 pt-2 mt-4">
                                <Col lg={3} className="mt-2">

                                </Col>

                                <Col lg={5}>
                                    <Form.Group className="mr-4">

                                        <div className="mb-2 d-flex align-item-center">
                                            <img style={{height: '20px'}} src={location} alt="icon"/>
                                            <span className="ml-2 ">Search location Wise</span>
                                        </div>

                                        {/* <Form.Label column sm="2"> To </Form.Label> */}
                                        {/*<InputGroup size="sm" className="mb-3">*/}
                                        <FormControl className="shadow-none" type="text" placeholder="Location"
                                                     name="address"
                                                     aria-label="Small"
                                                     aria-describedby="inputGroup-sizing-sm"
                                                     value={filterQueries.address ? filterQueries.address : ''}
                                                     onChange={onInputChange}
                                        />
                                        {/*</InputGroup>*/}

                                    </Form.Group>
                                </Col>

                                <Col lg={1} className="mt-2">
                                    <br/>
                                    <Button size="sm"
                                            type="button"
                                            variant="primary"
                                            onClick={e => loadData({
                                                address: filterQueries?.address
                                            })}>Search </Button>
                                </Col>

                            </Row>
                        </Form>
                    </div>


                    <Row>

                        {response.data?.map((item: any, index: number) =>

                            <Col key={index} className="pt-3" sm="4">
                                <Card className="shadow-lg bg-white rounded">
                                    <Card.Body>
                                        <Row>
                                            <Col sm={6} md={3}>
                                                {/* <img style={{ width: "100%" }} src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + item?.profile_image} alt="img" /> */}
                                                <DefaultImagePreview imagePath={item?.profile_image}
                                                                     defaultImage={defaultImage}/>
                                            </Col>
                                            <Col sm={2} md={9}>
                                                <div><span>Full Name: {item.firstname} {item.lastname} </span></div>
                                                <div><span>Address: {item.address}</span></div>
                                                <div><span>Rating: {item.rating} </span></div>
                                                <div>
                                                    <span>Register Date: {new Date(item?.create_at).toDateString()} </span>
                                                </div>
                                                {/* <div><span>Total Trips: 10</span></div>
                                                <div><span>Rejected Trips: 2</span></div>
                                                <div><span>Success Trip: 8</span></div> */}
                                                <div className="float-right mt-2">
                                                    <Button type="button" className="shadow-none" size="sm"
                                                            onClick={((event: any) => onHireClick(item))}> Hire
                                                        Teachers </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )}
                    </Row>

                    <div className="d-flex justify-content-between mt-2">
                        <div>Items: {response?.limit}</div>
                        <div>
                            <Pagination size="sm">
                                <Pagination.Prev onClick={e => loadData({
                                    address: filterQueries?.address,
                                    page: response.page - 1
                                })}/>
                                <Pagination.Item> Pages: {response?.page}/{response?.totalPage} </Pagination.Item>
                                <Pagination.Next onClick={e => loadData({
                                    address: filterQueries?.address,
                                    page: response.page + 1
                                })}/>
                            </Pagination>
                        </div>
                        <div>Total: {response?.count}</div>
                    </div>
                </div>

            </div>


            <Footer/>
            <BottomNav/>
        </>
    )
}