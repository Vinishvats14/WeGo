import express from "express";
import {
  createTripPost,
  getTripPosts,
  getAvailableTrip,
  tripCompleted,
  deleteTrip,
  intrested,
} from "../controllers/trippost.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/post", verifyJWT, createTripPost);  // creates a post for user

router.get("/user/:userId", verifyJWT, getTripPosts);   // fetches all posts of a user

router.get("/available", verifyJWT, getAvailableTrip);  // fetches all available posts (post other than user's)

router.patch("/close/:tripPostId", verifyJWT, tripCompleted);   // change ttrip status as completed

router.delete("/:tripPostId", verifyJWT, deleteTrip);  // delete a post

router.patch("/join/:tripPostId", verifyJWT, intrested);  // join a post


export default router;
