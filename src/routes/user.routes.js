
import express from "express";
import {
  registerUser,
  loginUser
} from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

// User Registration
// Used in frontend on registration page/form submission.
router.post('/register', upload.single('avatar'), registerUser);

// User Login
// Used in frontend on login page/form submission.
router.post('/login', loginUser);


export default router;
