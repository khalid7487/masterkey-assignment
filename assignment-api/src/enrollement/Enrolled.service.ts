import { Between, createQueryBuilder, ILike, Like } from "typeorm"
import { User } from "../auth/User.entity"
import { FindUser } from "../commons/Utils"
import { Project } from "../project/Project.entity"
import { Enrolled } from "./Enrolled.entity"


export const UpdateProjectStatus = async (req, res) => {
    const id = req.params.projectId
    let activeStatus = req.body

    const {
        status
    } = activeStatus

    try {
        const enrolled_info = await Enrolled.findOne({ id: id });

        if (!status) {
            return res.status(404).json({ message: 'Projects does not exists' })
        }

        enrolled_info.status = status || status?.status

        await enrolled_info.save()

        return res.status(200).json(status)

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }

}
export const confirmEnrollment = async (req, res) => {
    const id = req.params.projectId
    let activeStatus = req.body

    const {
        status
    } = activeStatus

    try {
        const enrolled_info = await Enrolled.findOne({ id: id });

        const project_id: any = enrolled_info?.project_id;

        const projectInfo = await Project.findOne({ id: project_id });

        if (!enrolled_info) {
            return res.status(404).json({ message: 'Projects does not exists' })
        }

        projectInfo.total_project_members = projectInfo.total_project_members + 1;
        projectInfo.enroll_status =true;
        projectInfo.project_status = "PROGRESS"
        await projectInfo.save()

        enrolled_info.enroll_status = true

        await enrolled_info.save()

        return res.status(200).json(enrolled_info)

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }

}

export const AddEnrollment = async (req, res) => {
    let vehicle = req.body

    const {
        project_id,
        member_id
    } = vehicle

    const userInfo = await User.findOne({ id: member_id })
    const projectInfo = await Project.findOne({ id: project_id })
    if (!userInfo) {
        return res.status(404).json({ message: 'Supervisor does not exists' })
    }
    if (!projectInfo) {

        return res.status(404).json({ message: 'Project does not exists' })
    }

    try {

        //create projects
        const projects = new Enrolled({
            project_id,
            member_id: member_id,
        })

        await projects.save()

        return res.status(201).json(projects);

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }

}


export const GetProjectWisemebers = async (req, res) => {

    try {

        const {
            projectId
        } = req.params;

        const enrolledInfo = await Enrolled.find({ project_id: projectId })

        let resultdata = [];

        for (const item of enrolledInfo) {
            let member_id: any = item?.member_id;

            const members = await User.findOne({ id: member_id });

            resultdata.push(members);
        }

        return res.status(200).json(resultdata);

    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' })
    }

}









