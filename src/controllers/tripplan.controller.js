import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import TripPlan from "../models/tripPlan.model.js";
import User from "../models/user.model.js";
import { GoogleGenerativeAI } from "@google/generative-ai";



// Create Trip Plan
const createTripPlan = asyncHandler(async (req, res, next) => {

    const {destination, days, hours, interests} = req.body;

    // console.log("destination:", destination, "days:", days, "hours:", hours, "interests:", interests);

    if (!destination) {
        return next(new ApiError(400, "Destination is required"));
    }

    if (!days && !hours) {
        return next(new ApiError(400, " Both Days and hours can't be empty"));
    }

    if (days && (days < 1 || days > 30)) {
        return next(new ApiError(400, "Days must be between 1 and 30"));
    }

    if (hours && (hours < 1 || hours > 24)) {
        return next(new ApiError(400, "Hours must be between 1 and 24"));
    }

    // console.log("destination:", destination, "days:", days, "hours:", hours, "interests:", interests);
    
    try {
      const genAI = new GoogleGenerativeAI(`${process.env.GEMINI_KEY}`);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { responseMimeType: "application/json" } });
      
      const prompt = `
      Generate a travel itinerary for a trip to places in and around ${destination} for ${days && hours ? `${days} days, ${hours} hours` : days ? `${days} days` : `${hours} hours`}${interests ? ` based on the following interests: ${interests} ` : ''}.
      Each day's itinerary should include multiple activities with the following details: time, description, place, and coordinates (latitude and longitude). 
  
  Output the response in the following JSON format, no other words should be included in the response.:
  
  {
    "itinerary": [
      {
        "day": 1,
        "activities": [
          {
            "time": "09:00 AM",
            "description": "Visit a museum",
            "place": "National Museum",
            "coordinates": {
              "latitude": 28.612673,   // number
              "longitude": 77.277262     // number
            }
          },
          {
            more such activities in that day...
          }
        ]
      },
      {
        "day": 2,
        "activities": [
          activities of day 2 in same pattern...
        ]
      }, more days if needed...
    ]
  }
  `;
      
  // console.log("Prompt:", prompt);
      const result = await model.generateContent(prompt);
      const generatedItinerary = JSON.parse(result.response.text());
      // console.log("Result:", generatedItinerary);
      res.status(201).json(new ApiResponse(201, generatedItinerary, "Trip plan created successfully"));
    } catch (error) {
      console.log("Error generating itinerary:", error);
      return next(new ApiError(500, "Error generating itinerary by AI"));
    }
    
    

});

const saveTripPlan = asyncHandler(async (req, res, next) => {
    const { tripPlanId } = req.params;
    const { destination, startDate, endDate, travelers, accommodations, transport } = req.body;

    const tripPlan = await TripPlan.findById(tripPlanId);

    if (!tripPlan || tripPlan.user.toString() !== req.user._id.toString()) {
        return next(new ApiError(404, "Trip plan not found or you do not have permission to update it"));
    } else {
        tripPlan.destination = destination || tripPlan.destination;
        tripPlan.startDate = startDate || tripPlan.startDate;
        tripPlan.endDate = endDate || tripPlan.endDate;
        tripPlan.travelers = travelers || tripPlan.travelers;
        tripPlan.accommodations = accommodations || tripPlan.accommodations;  
        tripPlan.transport = transport || tripPlan.transport;  
        await tripPlan.save();
        res.status(200).json(new ApiResponse(200, tripPlan, "Trip plan updated successfully"));
    }
});

// Get Trip Plans
const getTripPlans = asyncHandler(async (req, res, next) => {
    const tripPlans = await TripPlan.find({ user: req.user._id });

    if (!tripPlans || tripPlans.length === 0) {
        return next(new ApiError(404, "No trip plans found"));
    }

    res.status(200).json(new ApiResponse(200, tripPlans, "Trip plans retrieved successfully"));
});


// Update Trip Plan
const updateTripPlan = asyncHandler(async (req, res, next) => {
const { tripPlanId } = req.params;
const { destination, startDate, endDate, travelers, accommodations, transport } = req.body;

const tripPlan = await TripPlan.findById(tripPlanId);

if (!tripPlan || tripPlan.user.toString() !== req.user._id.toString()) {
    return next(new ApiError(404, "Trip plan not found or you do not have permission to update it"));
}

tripPlan.destination = destination || tripPlan.destination;
tripPlan.startDate = startDate || tripPlan.startDate;
tripPlan.endDate = endDate || tripPlan.endDate;
tripPlan.travelers = travelers || tripPlan.travelers;
tripPlan.accommodations = accommodations || tripPlan.accommodations;
tripPlan.transport = transport || tripPlan.transport;

await tripPlan.save();

res.status(200).json(new ApiResponse(200, tripPlan, "Trip plan updated successfully"));
});

// Delete Trip Plan
const deleteTripPlan = asyncHandler(async (req, res, next) => {
const { tripPlanId } = req.params;

const tripPlan = await TripPlan.findById(tripPlanId);

if (!tripPlan || tripPlan.user.toString() !== req.user._id.toString()) {
    return next(new ApiError(404, "Trip plan not found or you do not have permission to delete it"));
}

await tripPlan.remove();

res.status(200).json(new ApiResponse(200, null, "Trip plan deleted successfully"));
});

export {
    createTripPlan,
    saveTripPlan,
    getTripPlans,
    updateTripPlan,
    deleteTripPlan
};