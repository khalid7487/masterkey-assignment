import { isEmpty, validate } from "class-validator";
import path from "path";
import bcrypt from "bcrypt";
import { User } from "./User.entity";
import jwt from "jsonwebtoken";
import { Role } from "./Role.entity";
import { FindUser } from "../commons/Utils";


export const AddRegister = async (req, res) => {

    let user = req.body

    const {
        firstname,
        lastname,
        email,
        password,
        phone,
        dateOfbirth,
        role_ids,
        address
    } = user



    let profile_img_filename = "";

    if (req.files) {
        let { profile_image } = req.files

        if (profile_image) {
            profile_img_filename = `${phone}/profile_image${path.extname(profile_image.name)}`;
            profile_image.mv(`./uploads/${profile_img_filename}`)
        }

    }


    try {

        // Validate date
        let errors: any = {}

        //const emailUser = await User.findOne({ email })
        const phoneUser = await User.findOne({ phone })


        // if (emailUser) errors.email = 'Email is already taken '
        if (phoneUser) errors.phone = 'Phone Number is already taken'

        if (!role_ids) errors.role_id = 'Role id is empty'

        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors)
        }

        let roles: any = []

        if (role_ids) {
            JSON.parse(role_ids).forEach(element => {
                roles = [...roles, { id: element }]
            });

        }

        // Create the user
        const user = new User({
            firstname,
            lastname,
            email,
            password,
            phone,
            username: phone,
            dateOfbirth,
            address,
            roles: roles,
            profile_image: profile_img_filename,
        })


        //validation
        errors = await validate(user)
        if (errors.length > 0) return res.status(400).json({ errors })

        await user.save();

        return res.status(201).json(user);

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

export const Login = async (req, res) => {
    const { phone, password } = req.body

    const phone1: any = phone;

    try {
        let errors1: any = {}

        // if (isEmpty(email)) errors1.username = 'Email must not be empty'
        if (isEmpty(phone1)) errors1.username = 'Phone must not be empty'
        if (isEmpty(password)) errors1.username = 'Password must not be empty'
        if (Object.keys(errors1).length > 0) {
            return res.status(400).json(errors1)
        }

        const user = await User.findOne({
            where: { phone: phone1 },
            relations: ["roles"]
        })

        if (!user) return res.status(404).json({ error: 'User not found' })

        let { id, email, phone, username, profile_image, roles, firstname, lastname } = user

        console.log(user)

        //TODO: Find user using phone

        // const userPhone = await User.findOne({ phone })

        // if(!userPhone) return res.status(404).json({ error: '' })

        const passwordMatches = await bcrypt.compare(password, user.password)

        if (!passwordMatches) {
            return res.status(401).json({ password: 'Password is incorrect' })
        }

        let singleRoles = roles.map(a => a.code);

        // generate token with ip+address so we can make it secure
        const tokens = {
            accessToken: jwt.sign({
                phone,
                id,
                roles: singleRoles,
                profile_image
            }, process.env.JWT_SECRET, { expiresIn: '10d' }),
            refreshToken: jwt.sign({ phone, id, roles: singleRoles }, process.env.JWT_SECRET, { expiresIn: '30d' }), // 2h
            id,
            email,
            phone,
            username,
            firstname,
            lastname,
            profile_image,
            roles
        };


        /*
        const token = jwt.sign({ email }, process.env.JWT_SECRET)
        res.set('Set-Cookie', cookie.serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600,
            path: '/'
        }))
        return res.json(user)
        */


        return res.json(tokens)


    } catch (err) {
        return err;
    }
}

export const GetRoles = async (req, res) => {
    let allUsers = await Role.find();
    return res.status(200).json(allUsers)

}

export const AddRoles = async (req, res) => {

    try {
        let errors: any = {}

        let roles = await Role.save(req.body);
        return res.status(201).json(roles);

    } catch (err) {
        return res.status(500).json(err)
    }
}

export const UpdateRole = async (req, res) => {
    const id = req.params.rolesId
    let userStatus = req.body

    const {
        name,
        code,
        description,
    } = userStatus

    try {

        let errors: any = {}
        const userRole = await Role.findOneOrFail({ id: id })

        if (!userRole) errors.vehicle = 'Role does not exists';

        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors)
        }
        userRole.name = name || userRole.name
        userRole.code = code || userRole.code
        userRole.description = description || userRole.description
        await userRole.save()

        return res.status(200).json(userRole)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

export const ChangePassword = async (req, res) => {
    let changePassword = req.body

    let phone = FindUser(req, res);
    console.log(phone);

    const {
        oldpass,
        password
    } = changePassword

    try {

        // Validate date
        let errors: any = {}

        const user = await User.findOne({ phone: phone })
        console.log(user)
        const passwordMatches = await bcrypt.compare(oldpass, user.password)

        if (!passwordMatches) {
            return res.status(401).json({ password: 'Password is incorrect' })
        }


        user.password = await bcrypt.hash(password, 6) || user.password

        await user.save()
        return res.status(201).json(user)



    } catch (err) {
        console.log(err)
        return res.status(201).status(500).json(err)
    }
}

export const UserInfo = async (req, res) => {
    let user = req.body

    const {
        id,
        status,
        name
    } = user

    let filter = [];



    console.log(filter)

    const limit = user.limit || 10
    const page = user.page || 1;
    const offset = (page - 1) * limit;

    let [result, total] = await User.findAndCount({
        where: filter,
        relations: ["roles",],
        order: {
            id: "DESC",
        },
        skip: offset,
        take: limit
    })

    const data = {
        data: result, //data
        count: total, //total table record count data
        totalPage: Math.ceil(total / limit), //total page
        limit: limit,
        page: page
    }
    return res.json(data)

}

export const UserStatus = async (req, res) => {
    const id = req.params.userId
    let userStatus = req.body

    const {
        status
    } = userStatus

    try {
        const userStatus = await User.findOneOrFail({ id: id })

        userStatus.status = status || userStatus.status

        await userStatus.save()

        return res.status(200).json(userStatus)

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

export const UpdateUserProfileImage = async (req, res) => {
    const id = req.params.userId
    let phone = FindUser(req, res);
    console.log(phone);

    let profile_img_filename = "";

    if (req.files) {
        let { profile_image } = req.files

        if (profile_image) {
            profile_img_filename = `${phone}/profile_image${path.extname(profile_image.name)}`;
            profile_image.mv(`./uploads/${profile_img_filename}`)
        }

    }
    try {
        const userImage = await User.findOneOrFail({ id: id })

        userImage.profile_image = profile_img_filename || userImage.profile_image

        await userImage.save()
        return res.status(200).json(userImage)

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

//get-user-by-id
export const GetUserById = async (req, res) => {

    const id = req.params.userId

    try {
        let errors: any = {}

        const userInfo = await User.findOne({
            where: { id: id }
        })
        if (!userInfo) errors.user = 'User does not exists'
        // console.log("something", userInfo)

        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors)
        }
        return res.status(200).json(userInfo)
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({ err: 'Something went wrong' })
    }


}


//get-role-by-id
export const GetRoleById = async (req, res) => {

    const id = req.params.roleId

    try {
        let errors: any = {}

        const userInfo = await Role.findOne({ id: id })
        if (!userInfo) errors.user = 'User does not exists'
        // console.log("something", userInfo)

        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors)
        }

        return res.status(200).json(userInfo)


    } catch (err) {
        console.log(err)
        return res.status(500).json({ err: 'Something went wrong' })
    }


}


export const UpdateProfile = async (req, res) => {

    const id = req.params.userId
    let users = req.body
    let phone = FindUser(req, res);
    console.log(phone);

    let errors: any = {}

    const userInfo = await User.findOne({
        where: { id: id }
    })
    if (!userInfo) errors.vehicle = 'User does not exists';

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors)
    }

    const {
        firstname,
        lastname,
        dateOfbirth,
        address,
        short_bio,
        bio,

    } = users

    try {

    
        userInfo.firstname = firstname || userInfo.firstname
        userInfo.lastname = lastname || userInfo.lastname
        userInfo.dateOfbirth = dateOfbirth || userInfo.dateOfbirth
        userInfo.address = address || userInfo.address
        userInfo.short_bio = short_bio || userInfo.short_bio
        userInfo.bio = bio || userInfo.bio


        await userInfo.save()
        return res.status(200).json(userInfo)


    } catch (err) {
        console.log(err)
        return res.status(500).json({ err: 'Something went wrong' })
    }


}


export const DeleteById = async (id, res) => {
    try {
        //Valid data
        let errors: any = {}

        const isExists = await User.findOneOrFail({ id: id })

        //validation
        errors = await validate(isExists)
        if (errors.length > 0) return res.status(400).json({ errors })
        await isExists.remove()

        return res.status(200).json({ message: 'User deleted successfully' })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }

}

export const CountTotalUser = async (req, res) => {

    try {

        const limit = req.body.limit || 10
        const page = req.body.page || 1;
        const offset = (page - 1) * limit;

        let [result, total] = await User.findAndCount({
            relations: ['roles'],
            where: (roles) => {
                // roles.where('User__roles.name = :name', { name: 'BE_OWNER' }) 
                roles.where("User__roles.name IN(:...values)", { values: ['MEMBER'] })
            },
            skip: offset,
            take: limit
        })

        const data = {
            data: result, //data
            count: total, //total table record count data
            totalPage: Math.ceil(total / limit), //total page
            limit: limit,
            page: page
        }
        return res.status(200).json(data)

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }


}
