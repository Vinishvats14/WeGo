import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import verifyJWT from "./middlewares/auth.middleware.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import ApiError from "./utils/ApiErrors.js";
import bodyParser from "body-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(cors());
app.use(bodyParser.json()); 
app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({extended: true, limit: "10mb"}))
app.use(express.static("public"))
app.use(cookieParser())                  // we can access cookies through this middlewarw


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(process.cwd(), 'public')));



import appRoutes from "./routes/app.routes.js";
import userRoutes from "./routes/user.routes.js";
import tripPostRoutes from "./routes/trippost.routes.js";
import tripPlanRoutes from "./routes/tripplan.routes.js";



// Routes
app.use('/', appRoutes);
app.use('/user', userRoutes);
app.use('/trippost', tripPostRoutes);
app.use('/tripplan', tripPlanRoutes);



// Error handling middleware should be the last middleware
app.use(errorHandler);



export default app;
