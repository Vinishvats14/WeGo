import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import TripPost from "../models/trippost.model.js";
import { loginUser } from "./user.controller.js";

// Helper function to validate trip data

  
  // Create a new trip post
  const createTripPost = asyncHandler(async (req, res, next) => {
    const { destination, startDate, endDate, companionsNeeded, description } = req.body;
  
    if (!destination || !startDate || !endDate || !companionsNeeded || !description) {
        throw new ApiError(400, "All fields are required");
      }
    
      if (new Date(endDate) < new Date(startDate)) {
        throw new ApiError(400, "End date must be after start date");
      }
  
    // Create the trip post
    const tripPost = new TripPost({
      user: req.user._id,
      destination,
      startDate,
      endDate,
      companionsNeeded,
      description,
      status: "upcoming",
      interestedUsers: [],
    });
  
    await tripPost.save();
  
    res.status(201).json(new ApiResponse(201, tripPost, "Trip post created successfully"));
  });

// Get user's own trip posts
const getTripPosts = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const currentUserId = req.user._id.toString();
    

    // Security check: Ensure user can only access their own posts
    if (userId !== currentUserId) {
        return next(new ApiError(403, "Forbidden: Can only access your own posts"));
    }

    const tripPosts = await TripPost.find({ user: userId })
        .populate('user', 'name')
        .populate({
            path: 'interestedUsers.user',
            select: 'name contact'
        });

    if (!tripPosts || tripPosts.length === 0) {
        return next(new ApiError(404, "No trip posts found"));
    }

    const formattedPosts = tripPosts.map(post => ({
        id: post._id,
        destination: post.destination,
        startDate: post.startDate,
        endDate: post.endDate,
        companionsNeeded: post.companionsNeeded,
        description: post.description,
        status: post.status,
        interestedUsers: post.interestedUsers.map(user => ({
            userId: user.user._id,
            name: user.user.name,
            contact: user.user.contact,
            comment: user.comment
        }))
    }));

    res.status(200).json(
        new ApiResponse(200, formattedPosts, "User trip posts retrieved successfully")
    );
});

const getAvailableTrip = asyncHandler(async (req, res, next) => {
    const currentUserId = req.user._id; // Use _id for consistency
    console.log(currentUserId);
    
  
    const trips = await TripPost.find({
        user: { $ne: currentUserId },
        status: "upcoming",
      })
        .populate("user", "name contact _id") // Fetch name, contact, and _id of the trip creator
        .populate({
          path: "interestedUsers.user",
          select: "name contact _id", // Fetch name, contact, and _id of interested users
        })
        .lean();
  
    if (!trips || trips.length === 0) {
      return next(new ApiError(404, "No available trips found"));
    }
  
    const formattedTrips = trips.map((trip) => ({
      id: trip._id,
      destination: trip.destination,
      endDate: trip.endDate,
      companionsNeeded: trip.companionsNeeded,
      description: trip.description,
      postedBy: trip.user.name, // Name of the user who posted the trip
      postedDate: trip.postedDate,
      userInterested: trip.interestedUsers.some(
        (u) => u.user && u.user._id.toString() === currentUserId.toString()
      ), // Check if the current user is interested
    }));
  
    res.status(200).json(
      new ApiResponse(200, formattedTrips, "Available trips retrieved successfully")
    );
  });

// Mark a trip as completed
const tripCompleted = asyncHandler(async (req, res, next) => {
    const { tripPostId } = req.params;
    const userId = req.user._id;
  
    // Find the trip post
    const tripPost = await TripPost.findById(tripPostId);
  
    if (!tripPost || tripPost.user.toString() !== userId.toString()) {
      return next(new ApiError(404, "Trip post not found or you do not have permission to modify it"));
    }
  
    // Update the status to "completed"
    tripPost.status = "completed";
    await tripPost.save();
  
    res.status(200).json(
      new ApiResponse(200, tripPost, "Trip marked as completed successfully")
    );
  });

// Delete a trip post
const deleteTrip = asyncHandler(async (req, res, next) => {
    const { tripPostId } = req.params;
    const userId = req.user._id;
  
    // Find and delete the trip post
    const tripPost = await TripPost.findByIdAndDelete(tripPostId);
  
    if (!tripPost || tripPost.user.toString() !== userId.toString()) {
      return next(new ApiError(404, "Trip post not found or you do not have permission to delete it"));
    }
  
    res.status(200).json(
      new ApiResponse(200, tripPost, "Trip post deleted successfully")
    );
  });

const intrested = asyncHandler(async (req, res, next) => {
    const { tripPostId } = req.params;
    const { comment } = req.body;
    const userId = req.user._id;
  
    const tripPost = await TripPost.findById(tripPostId);
  
    if (!tripPost) {
      return next(new ApiError(404, "Trip post not found"));
    }
  
    // Check if the user has already shown interest
    if (tripPost.interestedUsers.some((u) => u.user.toString() === userId.toString())) {
      return next(new ApiError(400, "You have already shown interest in this trip"));
    }
  
    // Add the user to the interestedUsers array
    tripPost.interestedUsers.push({ user: userId, comment });
    await tripPost.save();
  
    res.status(200).json(new ApiResponse(200, tripPost, "Interest marked successfully"));
  });

const approveCompanion = asyncHandler(async (req, res, next) => {
    const { tripPostId } = req.params;

    const tripPost = await TripPost.findById(tripPostId);

    if (!tripPost) {
        return next(new ApiError(404, "Trip post not found"));
    }

    if (tripPost.user.toString() !== req.user._id.toString()) {
        return next(new ApiError(403, "You do not have permission to approve this companion"));
    }

    if (tripPost.participants.length === 0) {
        return next(new ApiError(400, "No companions to approve"));
    }

    const companion = tripPost.participants.shift();

    if (!companion) {
        return next(new ApiError(500, "Failed to approve companion"));
    }

    companion.approved = true;

    await companion.save();

    res.status(200).json(new ApiResponse(200, companion, "Companion approved successfully"));
});


export {
    createTripPost,
    getTripPosts,
    getAvailableTrip,
    tripCompleted,
    deleteTrip,
    intrested,
    approveCompanion
};