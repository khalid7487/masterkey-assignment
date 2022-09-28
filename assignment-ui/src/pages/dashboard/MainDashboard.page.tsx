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
import VehicleCreatePage from "./project/ProjectCreatePage";
import VehiclePage from "./project/Project.page";
import VehicleDetailsPage from "./project/ProjectDetailsPage";
import Addtrip from "./project/ProjectWiseMembers";
import OrderPage from "./order/Order.page";

import './dashboard.page.scss';
import UserProjectPage from './project/UserProject.page';

interface Props {

}


export default function MainDashboardPage({ }: Props): ReactElement {

    const history = useHistory()
    let { path, url } = useRouteMatch();
    
    const [collapsedSidebar, setCollapsedSidebar] = useState(true);
  
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


    }, [])


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
                        <Route exact path={`${path}/all-open-project`} component={UserProjectPage} />

                    </Switch>

            </div>
        </div>
    )
}
