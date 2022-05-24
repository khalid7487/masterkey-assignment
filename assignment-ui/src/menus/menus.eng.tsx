import {MdWork} from "react-icons/all";
import React from "react";


export const GetRoleWiseMenus = async (roles: any) => {

    if (roles?.includes("SUPERVISOR")) {
        return AdminMenus;
    }else if (roles?.includes("MEMBER")) {
        return USER;
    } else {
        return []
    }

}


export const AdminMenus: any = [

    {
        title: "Home Page",
        hasSubMenu: false,
        "icon": <MdWork className="text-success"/>,
        "link": "/",
    },

    {
        title: "User Management",
        hasSubMenu: true,
        "icon": <MdWork className="text-success"/>,
        submenus: [
            {
                "title": "All Users",
                "link": "/me/users"
            },
            {
                "title": "Supervisor Profile",
                "link": "/me/user-profile"
            },
            {
                "title": "Roles Management",
                hasSubMenu: true,
                submenus: [
                    {
                        "title": "Roles",
                        "link": "/me/roles",
                    },
                ]
            },
        ]
    },
    {
        title: "Project Management",
        hasSubMenu: true,
        "icon": <MdWork className="text-success"/>,
        submenus: [
            {
                "title": "Add Project",
                "link": "/me/add-project"
            },
            {
                "title": "All Projects",
                "link": "/me/projects"
            },
            {
                "title": "Enrollment",
                "link": "/me/enrollments"
            }
        ]
    }

]


// user/client
export const USER: any = [
    {
        title: "Home Page",
        hasSubMenu: false,
        "icon": <MdWork className="text-success"/>,
        "link": "/",
    },
    {
        title: "User Management",
        hasSubMenu: true,
        "icon": <MdWork className="text-success"/>,
        submenus: [
            {
                "title": "User Profile",
                "link": "/me/user-profile"
            },
            {
                "title": "Registration",
                "link": "/registration"
            },
        ]
    },
    {
        title: "Project Management",
        hasSubMenu: true,
        "icon": <MdWork className="text-success"/>,
        submenus: [
            {
                "title": "All Projects",
                "link": "/me/all-open-project"
            }
        ]
    }
]