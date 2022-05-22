import { Request, Response, Router } from "express";
import cookie from "cookie";

import auth from "../middleware/auth"
import {
    AddRegister,
    AddRoles,
    ChangePassword,
    CountTotalUser,
    DeleteById,
    GetRoleById,
    GetRoles,
    GetUserById,
    Login,
    UpdateProfile,
    UpdateRole,
    UpdateUserProfileImage,
    UserInfo,
    UserStatus
} from "./Auth.service";


const router = Router()


router.post('/register', async (req: any, res: Response) => {
    await AddRegister(req, res);
})

router.post('/login', async (req: Request, res: Response) => {

    await Login(req, res)

})

router.get('/roles', async (req: Request, res: Response) => {
    await GetRoles(req, res);
})

//get user by id
router.get('/get-role-by-id/:roleId', auth, async (req: any, res: Response) => {
    await GetRoleById(req, res);
})

//Adds roles
router.post('/roles', async (req: Request, res: Response) => {
    await AddRoles(req, res);
})

//update roles
router.put('/update-roles/:rolesId', auth, async (req: any, res: Response) => {
    await UpdateRole(req, res);
})


router.get('/me', auth, (req: Request, res: Response) => {
    return res.json(res.locals.user)
})

//get user by id
router.get('/get-user-by-id/:userId', auth, async (req: any, res: Response) => {
    await GetUserById(req, res);
    
})


//change password
router.put('/change-password', auth, async (req: Request, res: Response) => {

    await ChangePassword(req, res);

})

router.post('/user-info', auth, async (req: Request, res: Response) => {
    await UserInfo(req, res);
})

router.get('/logout', auth, (req: Request, res: Response) => {
    res.set('Set-Cookie', cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0),
        path: '/'
    }))

    return res.status(200).json({ success: true })
})

//user status
router.put('/update-status/:userId', auth, async (req: any, res: Response) => {

    await UserStatus(req, res);

})

//update profile image
router.put('/update-profile-image/:userId', auth, async (req: any, res: Response) => {
    await UpdateUserProfileImage(req, res);
})

//update profile 
router.put('/update-profile/:userId', auth, async (req: any, res: Response) => {
    await UpdateProfile(req, res)
})


//delete by id
router.delete('/deletebyid/:userId', auth, async (req: any, res: Response) => {
    const id = req.params.userId
    await DeleteById(id, res)

})

//count total user 
router.get('/total-user', auth, async (req: Request, res: Response) => {
    await CountTotalUser(req, res)
})



export default router
