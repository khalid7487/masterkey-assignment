import React, { ReactElement, useEffect, useState } from "react";
import BottomNav from "../common/BottomNav.page";
import Footer from "../common/Footer.page";
import TopNav from "../common/TopNav.page";

interface Props {
    // imagePath: any,
    // defaultImage: any
}

export default function ContactPage({ }: Props): ReactElement {

    return (
        <div>
            <TopNav />
            <div>Contact Page Comming soon</div>
            <Footer />
            <BottomNav />
        </div>
    )
};