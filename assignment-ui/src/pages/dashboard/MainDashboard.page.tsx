import React, { ReactElement, useEffect, useState } from 'react'
import SideNavbar from "../../menus/SideNavbar";

import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { decodeToken, isLoggedIn, unsetToken } from "../../common/http";
import { GetRoleWiseMenus } from "../../menus/menus.eng";
import NavBarComponent from "../../menus/Navbar";
import DashboardContainerPage from "./DashboardContainer.page";
import UsersPage from "../../auth/Users.page";
import UserUpdatePage from "../../auth/Update.page";
import ProfilePage from "../../auth/Profile.page";
import RolesPage from "../../auth/Roles.page";
import RoleUpdatePage from "../../auth/Roles.update";
import VehicleCreatePage from "./vehicle/VehicleCreatePage";
import VehiclePage from "./vehicle/Vehicle.page";
import VehicleDetailsPage from "./vehicle/VehicleDetailsPage";
import Addtrip from "./vehicle/TripCreatePage";
import OrderCreatePage from "./order/OrderCreatePage";
import OrderPage from "./order/Order.page";
import TripCreatePage from "./trip/TripCreatePage";
import DemoGridPage from "../../rnd/DemoGrid.page";
import TripPage from "./trip/Trip.page";
import TripDetailsPage from "./trip/TripDetailsPage";
import NewsCreatePage from "./news/NewsCreatePage";
import NewsPage from "./news/news.page";
import NewsDetailsPage from "./news/NewsDetailsPage";
import LocationCreatePage from "./locations/LocationCreatePage";
import LocationPage from "./locations/Location.page";
import LocationDetailsPage from "./locations/LocationDetailsPage";

import './dashboard.page.scss';
import UserTripPage from './trip/UserTrip.page';
import OrderDetailsPage from './order/OrderDetailsPage';
import OrdersVehicleDetailsPage from './order/OrdersVehicleDetails.page';

interface Props {

}


export default function MainDashboardPage({ }: Props): ReactElement {

    const history = useHistory()
    let { path, url } = useRouteMatch();


    const [collapsedSidebar, setCollapsedSidebar] = useState(true);
    let [lang, setLang]: any = useState('eng')
    const [sidebarMenusData, setSidebarMenus] = useState([]);

    useEffect(() => {

        // if runtime token missing then immediately redirect to login page
        let loginStatus = isLoggedIn();
        if (!loginStatus) {
            history.push('/login');
        }


        (async () => {

            // @ts-ignore
            if (decodeToken()?.roles) {
                // @ts-ignore
                let result = decodeToken()?.roles

                // let {GetRoleWiseMenus} = await import(`./{lang}/MenuData`);
                setSidebarMenus(await GetRoleWiseMenus(result)); // get menus

            } else {
                return;
            }


        })();


        // console.log('msg', sidebarMenusData);
    }, [lang])


    const onLogout = ((e: any) => {
        unsetToken();
        history.push('/login')
    });

    const toggleSidebar = () => {
        setCollapsedSidebar(!collapsedSidebar);
    }


    return (
        <div className="vh-100 d-flex justify-content-start align-items-stretch">


                <SideNavbar
                    collapsedSidebar={collapsedSidebar}
                    toggleSidebar={toggleSidebar}
                    sidebarMenusData={sidebarMenusData}
                    onLogout={onLogout}
                />

            <div className="overflow-auto flex-grow-1">
                <NavBarComponent sidebarToggler={toggleSidebar} isCollapsed={collapsedSidebar} />

                    <Switch >

                        <Route exact path={path}>
                            {/*<h1>Welcome to Home Page</h1>*/}
                            <DashboardContainerPage />
                        </Route>

                        <Route path={`${path}/users`} component={UsersPage} />
                        <Route exact path={`${path}/user/:id`} component={UserUpdatePage} />
                        <Route exact path={`${path}/user-profile`} component={ProfilePage} />

                        <Route path={`${path}/roles`} component={RolesPage} />
                        <Route path={`${path}/role/:id`} component={RoleUpdatePage} />


                        <Route exact path={`${path}/add-project`} component={VehicleCreatePage} />
                        <Route exact path={`${path}/projects`} component={VehiclePage} />
                        <Route exact path={`${path}/project/:id`} component={VehicleDetailsPage} />
                        <Route exact path={`${path}/get-project-wise-user/:id`} component={Addtrip} />
                        <Route exact path={`${path}/enrollments`} component={OrderPage} />

                        {/*<Route exact path={`${path}/script`} component={ScriptDetailsPage}/>*/}
                        {/*<Route exact path={`${path}/script/:id`} component={ScriptDetailsPage}/>*/}
                        {/*<Route exact path={`${path}/script-pagination`} component={ScriptPaginationPage}/>*/}


                        <Route exact path={`${path}/add-orders`} component={OrderCreatePage} />
             
                        <Route exact path={`${path}/order-user-details/:id`} component={OrderDetailsPage} />          
                        <Route exact path={`${path}/order-vehicle-details/:id`} component={OrdersVehicleDetailsPage} />

                        <Route exact path={`${path}/add-trip`} component={TripCreatePage} />
                        <Route exact path={`${path}/view-trips`} component={DemoGridPage} />
                        <Route exact path={`${path}/trips`} component={TripPage} />
                        <Route exact path={`${path}/trips/:id`} component={TripDetailsPage} />
                        <Route exact path={`${path}/user-trips`} component={UserTripPage} />

                        <Route exact path={`${path}/add-news`} component={NewsCreatePage} />
                        <Route exact path={`${path}/news`} component={NewsPage} />
                        <Route exact path={`${path}/news/:id`} component={NewsDetailsPage} />

                        <Route exact path={`${path}/add-location`} component={LocationCreatePage} />
                        <Route exact path={`${path}/locations`} component={LocationPage} />
                        <Route exact path={`${path}/locations/:id`} component={LocationDetailsPage} />

                        {/*<Route path={`${path}/:collectionId`} component={CollectionStoragePage}/>*/}
                    </Switch>




            </div>
        </div>
    )
}
