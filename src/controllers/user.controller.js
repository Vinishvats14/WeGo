import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiErrors.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';

// Register User
const registerUser = asyncHandler(async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const avatar = req.file; //

        
    
        if (!name || !email || !password) {
            return next(new ApiError(400, "All fields are required"));
        }

        let profileImage = avatar ? (await uploadOnCloudinary(avatar.path)).secure_url : `https://ui-avatars.com/api/?name=${name}&size=512&background=random&length=1&rounded=true`;

    
        const userExists = await User.findOne({ email });
        if (userExists) {
            return next(new ApiError(409, "User already exists"));
        }
    
    
        const newUser = await User.create({ name, email, password, profileImage});

        if (!newUser) {
            return next(new ApiError(500, "Failed to create user"));
        }
    
        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(newUser._id);
    
        return res
        .status(201)
        .cookie("accessToken", accessToken, {
            httpOnly: true,               // Prevents client-side JavaScript from accessing the cookie
            maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRY) * 1000, // Sets the cookie expiration time
            secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent over HTTPS in production
            sameSite: 'Strict'            // Helps prevent CSRF attacks by ensuring the cookie is only sent with same-site requests
          })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,               // Prevents client-side JavaScript from accessing the cookie
            maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRY) * 1000, // Sets the cookie expiration time
            secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent over HTTPS in production
            sameSite: 'Strict'            // Helps prevent CSRF attacks by ensuring the cookie is only sent with same-site requests
          })
        .json(new ApiResponse(200, {newUser, accessToken, refreshToken}, "User created successfully"));
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "Something went wrong while registering user", error));
        
    }

});

// Login User
const loginUser = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
    
        if (!email || !password) {
            return next(new ApiError(400, "All fields are required"));
        }
    
        const user = await User.findOne({ email }).select("-refreshToken");

        if (!user) {
            return next(new ApiError(401, "User not found"));
        }
    
        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return next(new ApiError(401, "Incorrect password"));
        }

    
        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);
    
            return res
            .status(201)
            .cookie("accessToken", accessToken, {
                httpOnly: true,               // Prevents client-side JavaScript from accessing the cookie
                maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRY) * 1000, // Sets the cookie expiration time
                secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent over HTTPS in production
                sameSite: 'Strict'            // Helps prevent CSRF attacks by ensuring the cookie is only sent with same-site requests
              })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,               // Prevents client-side JavaScript from accessing the cookie
                maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRY) * 1000, // Sets the cookie expiration time
                secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent over HTTPS in production
                sameSite: 'Strict'            // Helps prevent CSRF attacks by ensuring the cookie is only sent with same-site requests
              })
            .json(new ApiResponse(200, {user, accessToken, refreshToken}, "User logged in successfully"));
    } catch (error) {
        console.log(error);
        return new ApiError(500, "Something went wrong while logging in user", error);        
    }
});



// Function to generate access and refresh tokens
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRY) * 1000 });
        const refreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: parseInt(process.env.REFRESH_TOKEN_EXPIRY) * 1000 });

        await User.findByIdAndUpdate(userId, { refreshToken });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token.");
    }
};

export {
    registerUser,
    loginUser,
    generateAccessAndRefreshToken
};
