import "reflect-metadata";
import express, {Request, Response} from 'express'
import morgan from 'morgan'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./auth/Auth.controller"
import project from "./project/Project.controller"
import enroll from "./enrollement/Enrolled.controller"
// import news from "./news/News.controller";

// import trim from './middleware/trim'
import databaseProviders from "../dbConnection";

const fileUpload = require('express-fileupload');

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json()) //Used to parse JSON bodies
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
// app.use(trim)
app.use(cookieParser())


// enable files upload
app.use(fileUpload({createParentPath: true}));
app.use(express.static('public'))
app.use('/uploads', express.static('uploads'))
// const path = require('path')
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


const routePrefix = '/api/v1';

app.get('/', async (req: Request, res: Response) => {
    return res.status(200).json({status: true, message: 'Online Tutor app api'})
})

// request timeout
app.use(function (req, res, next) {
    res.setTimeout(120000000);
    next();
});

app.use(`${routePrefix}/auth`, authRoutes)
app.use(`${routePrefix}/project`, project)
app.use(`${routePrefix}/enroll`, enroll)


// app.use(`${routePrefix}/news`, news)




app.listen(PORT, async () => {
    console.log(`Server running at http://localhost:${PORT}`)


    let defaultConnection = databaseProviders(process.env.DB_TYPE)

    defaultConnection.then(() =>
        console.log('Database connected')
    ).catch(err => console.log("Database Failed to connected", err));


})

export default app;