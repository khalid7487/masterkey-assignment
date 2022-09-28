import {Request, Response, Router} from "express";
import auth from "../middleware/auth"
import {
    AddEnrollment,
    UpdateProjectStatus,
    confirmEnrollment,
    GetProjectWisemebers,
    GetAllEnrolledMent

} from "./Enrolled.service";



const router = Router()

//status
router.patch('/update-status/:projectId', auth, async (req: any, res: Response) => {
   await UpdateProjectStatus(req, res);
})


//confirms enrollment
router.patch('/confirm-enrollement/:projectId', auth, async (req: any, res: Response) => {
    await confirmEnrollment(req, res);
 })
 
 


//Add 
router.post('/add', auth, async (req: any, res: Response) => {
     await AddEnrollment(req, res);
})

//get all enrollment
router.post('/getall', auth, async (req:Request, res:Response) => {
    await GetAllEnrolledMent(req, res)
})



//get project-id-wise-members 
router.get('/get-project-wise-user/:projectId',  async (req: Request, res: Response) => {
    await GetProjectWisemebers(req, res);
})


export default router;
