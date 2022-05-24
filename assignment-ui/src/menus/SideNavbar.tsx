import React, {ReactElement} from 'react'
import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter} from "react-pro-sidebar";
import {FaGem} from "react-icons/all";
import MenuTreeItem from "./MenuTree.item";


export default function SideNavbar({collapsedSidebar, toggleSidebar, sidebarMenusData, onLogout}: any): ReactElement {

    return (


        <ProSidebar collapsed={collapsedSidebar} breakPoint="sm" toggled={!collapsedSidebar}
                    onToggle={toggleSidebar}>


            <SidebarContent>

                <Menu iconShape="round">


                    <MenuTreeItem nav={sidebarMenusData} index={1}/>


                </Menu>

            </SidebarContent>
            <SidebarFooter>
                <Menu>
                    <MenuItem icon={<FaGem/>} onClick={onLogout}>Logout</MenuItem>
                </Menu>
            </SidebarFooter>


        </ProSidebar>


    )
}
