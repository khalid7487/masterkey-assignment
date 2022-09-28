import { Between, createQueryBuilder, ILike, Like } from "typeorm"
import { User } from "../auth/User.entity"
import { FindUser } from "../commons/Utils"
import { Project } from "./Project.entity"


export const UpdateProjectStatus = async (req, res) => {
    const id = req.params.projectId
    let activeStatus = req.body

    const {
        project_status
    } = activeStatus

    try {
        const status = await Project.findOne({ id: id });

        if (!status) {
            return res.status(404).json({ message: 'Projects does not exists' })
        }

        status.project_status = project_status || status?.project_status

        await status.save()

        return res.status(200).json(status)

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }

}

export const AddProject = async (req, res) => {
    let vehicle = req.body

    const {
        project_name,
        project_title,
        project_description,
        userId
    } = vehicle

    const userInfo = await User.findOne({ id: userId })

    if (!userInfo) {
        return res.status(404).json({ message: 'Supervisor does not exists' })
    }

    try {

        //create projects
        const projects = new Project({
            project_name,
            project_title,
            project_description,
            user: userId,
        })

        await projects.save()

        return res.status(201).json(projects);

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }

}

export const UpdateProject = async (req, res) => {
    const id = req.params.projectId

    let phone = FindUser(req, res);
    console.log(phone);

    let errors: any = {}

    const projectInfo = await Project.findOneOrFail({ id: id })
    if (!projectInfo) errors.vehicle = 'Vehicle does not exists';

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors)
    }




    const {
        project_name,
        project_title,
        project_description
    } = req.body

    try {


        projectInfo.project_name = project_name || projectInfo?.project_name
        projectInfo.project_title = project_title || projectInfo?.project_title
        projectInfo.project_description = project_description || projectInfo?.project_description

        await projectInfo.save()

        return res.status(200).json(projectInfo)

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

export const GetAllProjects = async (req, res) => {

    try {

        const {
            project_status
        } = req.body;

        let filter = [];

        if (project_status) filter = [...filter,
        {
            project_status: ILike(`%${project_status}%`)
        }]

        const limit = req.body.limit || 10
        const page = req.body.page || 1;
        const offset = (page - 1) * limit;

        let [result, total] = await Project.findAndCount({
            where: filter,
            order: {
                id: "DESC",
            },
            skip: offset,
            take: limit
        });

        const data = {
            data: result, //data
            count: total, //total table record count data
            totalPage: Math.ceil(total / limit), //total page
            limit: limit,
            page: page
        }

        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' })
    }

}



export const GetProjectById = async (req, res) => {
    try {
        let { projectId } = req.params

        const projectInfo = await Project.findOne({ id: projectId })
        return res.status(200).json(projectInfo)
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

export const DeleteVehicleById = async (req, res) => {
    const id = req.params.projectId;
    try {
        const projects = await Project.findOneOrFail({ id: id })

        await projects.remove()
        return res.status(200).json({ message: 'Project deleted successfully' })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}



export const GetUserIdWiseProjects = async (req, res) => {

    try {
        let { userId } = req.params

        let allvehicle = await User.find({
            where: { id: userId },
            relations: ["projects"]
        });

        return res.status(200).json(allvehicle)

    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}



export const GetProjectWiseUser = async (req, res) => {
    let { projectId }: any = req.params

    try {

        let errors: any = {}
        const projectsExists = await Project.findOne({ id: projectId })

        if (!projectsExists) errors.project = 'Project does not exists';

        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors)
        }

        const projectsInfo = await createQueryBuilder("User", "u")
            .innerJoin(Project, 'p', 'p.userId = u.id')
            .where("p.id = :id", { id: projectId })
            .getOne()

        return res.status(200).json(projectsInfo)

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }


}








