import React, { ReactElement, useEffect, useState } from "react";
import { Button, Card, Col, Form, FormControl, InputGroup, Pagination, Row } from 'react-bootstrap';
import { gets } from "./DefaultHome.service";
import { useHistory } from "react-router-dom";

import background from "../icons/background.jpg";
import car from "../icons/car.png";
import defaultImage from "../icons/car.png";
import location from "../icons/location.png";
import message from "../icons/message.png";

import DefaultImagePreview from "../common/DefaultImage.preview";

interface Props {

}

export default function DefaultHome({ }: Props): ReactElement {

    let history = useHistory();

    let [response, setResponse]: any = useState([]);
    let tripType = ["One Way", "Two Way", "Round Way", "Full Body"]

    const [formData, setFormData]: any = useState({
        trip_type: '',
        from_location: '',
        to_location: '',
        from_date: '',
        to_date: '',
    })

    const [filterQueries, setFilterQueries] = useState({
        page: 0,
        limit: 0,
        from_location: '',
        to_location: '',
        trip_type: '',
    });


    useEffect(() => {

        // let isMounted = true;

        (async () => {
            await loadData(filterQueries);
        })()

        // return () => {
        //     isMounted = false
        // };


    }, [])

    const loadData = async (queries: any) => {

        console.log("something", queries)

        let res = await gets(queries)
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

    const onOpenClick = async (item: any) => {
        history.push(`/details/${item.id}`)
    }

    const onOrderClick = async (item: any) => {
        history.push(`/order/${item.id}`)
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterQueries({
            ...filterQueries,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>

            <Row style={{ marginRight: "-10px" }}>
                <img className="background-img" src={background} alt="alt" />
                <div className="top-left text-light ">
                    <h2>1. Please Register </h2>
                    <h2>2. Login </h2>
                    <h2>3. Go Dashboard Using profile picture Click.</h2>
                    <h2>4. Hope you will find all my assign task.</h2>
                </div>
            </Row>

         
        </div>
    )
};
