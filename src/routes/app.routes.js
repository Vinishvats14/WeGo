import express from "express";
import {
  generateHomePage,
  generateAuthPage,
  generateItineraryPage,
  generateCompanionPage,
  generateHotelsPage,
  generateFlightsPage,
  generateDestinationPage,
  generateProfilePage,
  generateMap,
  fetchPlaceDataFromGemini
} from "../controllers/app.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = express.Router();

// Generate Home Page
router.get('/', verifyJWT, generateHomePage);

router.get('/auth', verifyJWT, generateAuthPage);

router.get('/itinerary', verifyJWT, generateItineraryPage);

router.get('/companion', verifyJWT, generateCompanionPage);

router.get('/hotels', verifyJWT, generateHotelsPage);

router.get('/flights', verifyJWT, generateFlightsPage);

// Render Destination Page
router.get('/destination', verifyJWT, generateDestinationPage);

// Fetch Place Data API
router.get('/api/destination', verifyJWT, fetchPlaceDataFromGemini);

router.get('/profile', verifyJWT, generateProfilePage);

router.post('/map', generateMap);

export default router;