import {Request, Response, Router} from "express";
import auth from "../middleware/auth"
import {
    AddProject,
    DeleteVehicleById,
    GetAllProjects,
    GetUserIdWiseProjects,
    GetProjectById,
    UpdateProject,
    UpdateProjectStatus,
    GetProjectWiseUser
} from "./Project.service";



const router = Router()

//status
router.patch('/update-status/:vehicleId', auth, async (req: any, res: Response) => {
   await UpdateProjectStatus(req, res);
})


//Add 
router.post('/add', auth, async (req: any, res: Response) => {
     await AddProject(req, res);

})


//Update
router.put('/update/:projectId', async (req: any, res: Response) => {
    await UpdateProject(req, res);

})

//Get all Projects
router.post('/getall', auth, async (req: Request, res: Response) => {
    await GetAllProjects(req, res)
})


// get one by id
router.get('/get/:projectId', auth, async (req: any, res: Response) => {
    await GetProjectById(req, res);
})

//delete id 
router.delete('/delete/:projectId', auth, async (req: any, res: Response) => {
    await DeleteVehicleById(req, res);
})

//Get user-Project
router.get('/get-user-wise-projects/:userId', auth, async (req: Request, res: Response) => {
   await GetUserIdWiseProjects(req, res);
})

//get project-id-wise-user
router.get('/get-project-wise-user/:projectId',  async (req: Request, res: Response) => {
    await GetProjectWiseUser(req, res);
})


export default router;
