import express from "express";
import {
  createTripPlan,
  saveTripPlan,
  getTripPlans,
  updateTripPlan,
  deleteTripPlan
} from "../controllers/tripplan.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create a Trip Plan
// Used in frontend on trip plan generator page when a user generates a new trip plan.
router.post('/', createTripPlan);

// Save a Trip Plan
// Used in frontend when a user wants to save a trip plan for future reference.
router.post('/save/:tripPlanId', verifyJWT, saveTripPlan);

// Get All Trip Plans for a User
// Used in frontend to display user's saved trip plans on their dashboard.
router.get('/user/:userId', verifyJWT, getTripPlans);

// Update a Trip Plan
// Used in frontend when a user wants to edit an existing trip plan.
router.patch('/:tripPlanId', verifyJWT, updateTripPlan);

// Delete a Trip Plan
// Used in frontend when a user decides to delete a saved trip plan.
router.delete('/:tripPlanId', verifyJWT, deleteTripPlan);

export default router;
