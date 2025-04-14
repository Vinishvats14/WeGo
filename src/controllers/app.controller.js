import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiErrors.js";
import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { v4 as uuidv4 } from "uuid";
import fetch from "node-fetch";
const MAPTILER_KEY = process.env.MAPTILER_KEY;
import { GoogleGenerativeAI } from "@google/generative-ai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const generateHomePage = asyncHandler(async (req, res, next) => {
  try {
    const user = (await User.findById(req.user?._id)) || null;
    res.render("home", { user });
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "Failed to generate home page", error));
  }
});

const generateAuthPage = asyncHandler(async (req, res, next) => {
  try {
    const user = (await User.findById(req.user?._id)) || null;
    if (user) {
      // NOTE: Have to generate a msg in page that 'user is already logged in'.
      res.render("home", { user });
    } else {
      res.render("auth");
    }
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "Failed to generate auth page", error));
  }
});

const generateItineraryPage = asyncHandler(async (req, res, next) => {
  try {
    const user = (await User.findById(req.user?._id)) || null;
    res.render("itinerary", { user });
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "Failed to generate itinerary page", error));
  }
});
const generateCompanionPage = asyncHandler(async (req, res, next) => {
  try {
    const user = (await User.findById(req.user?._id)) || null;
    if (!user) {
      res.redirect("/auth");
    }
    res.render("companion", { user });
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "Failed to generate itinerary page", error));
  }
});

const generateHotelsPage = asyncHandler(async (req, res, next) => {
  try {
    const user = (await User.findById(req.user?._id)) || null;
    res.render("hotels", { user });
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "Failed to generate itinerary page", error));
  }
});

const generateFlightsPage = asyncHandler(async (req, res, next) => {
  try {
    const user = (await User.findById(req.user?._id)) || null;
    res.render("flights", { user });
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "Failed to generate itinerary page", error));
  }
});

const generateDestinationPage = asyncHandler(async (req, res, next) => {
    try {
      const user = (await User.findById(req.user?._id)) || null;

      const place = req.query.place; // Extract place from query params
      res.render("destination", { user, place }); // Pass place to the frontend
    } catch (error) {
      console.error(error);
      return next(new ApiError(500, "Failed to generate destinations page", error));
    }
  });
  
  const fetchPlaceDataFromGemini = asyncHandler(async (req, res, next) => {
    const place = req.query.place;
  
    if (!place) {
      return next(new ApiError(400, "Place query parameter is required"));
    }
  
    try {
      // API Keys (Replace with environment variables in production)
      const GEMINI_KEY = "<ypur gemini api key>";
      const OPENWEATHER_KEY = "<openweather api key>";
      const EVENTBRITE_KEY = "<eventbrite api key>";
      const PEXELS_API_KEY =
        "<pexels api key>";
  
      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(GEMINI_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
      /**
       * Fetch weather data for a destination.
       */
      const getWeather = async (destination) => {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${OPENWEATHER_KEY}&units=metric`;
  
        try {
          const response = await fetch(url);
          const data = await response.json();
  
          if (response.ok) {
            // Helper function to capitalize the first letter of a string
            const capitalize = (str) => {
              if (!str) return "";
              return str.charAt(0).toUpperCase() + str.slice(1);
            };
  
            return {
              temperature: `${data.main.temp}°C`,
              condition: capitalize(data.weather[0].description),
            };
          }
        } catch (error) {
          console.error("Weather API Error:", error);
        }
  
        return null; // Return null if fetch fails
      };
  
      /**
       * Fetch events for a destination.
       */
      const getEvents = async (destination) => {
        const url = `https://www.eventbriteapi.com/v3/events/search/?q=${destination}&sort_by=date`;
        const headers = { Authorization: `Bearer ${EVENTBRITE_KEY}` };
  
        try {
          const response = await fetch(url, { headers });
          const data = await response.json();
  
          if (data.events && data.events.length) {
            return data.events.slice(0, 5).map((event) => ({
              name: event.name.text,
              date: event.start.local,
              location: event?.venue?.address?.localized_address_display || "Unknown location",
            }));
          }
        } catch (error) {
          console.error("Eventbrite API Error:", error);
        }
  
        return null;
      };
  
      /**
       * Fetch images for a destination.
       */
      const getImages = async (destination) => {
        const url = `https://api.pexels.com/v1/search?query=${destination}&per_page=3`;
        const headers = { Authorization: PEXELS_API_KEY };
  
        try {
          const response = await fetch(url, { headers });
          const data = await response.json();
  
          if (data.photos && data.photos.length) {
            return data.photos.slice(0, 3).map((photo) => photo.src.large);
          }
        } catch (error) {
          console.error("Pexels API Error:", error);
        }
  
        return null;
      };
  
      /**
       * Fetch detailed travel information using Gemini AI.
       */
      const fetchTravelInfo = async (destination) => {
        const prompt = `
          Generate detailed travel information for ${destination} including:
          1. Description of the place.
          2. Key attractions listed in points.
          3. Recent reviews from travelers.
          4. Local emergency contact numbers (police, hospitals, car mechanics).
  
          Output response strictly in the following JSON format:
          {
            "description": "Detailed description of the place.",
            "attractions": ["Point 1", "Point 2", "Point 3"],
            "reviews": [{"user": "User Name", "rating": 4.5, "comment": "Review comment."}],
            "emergency_contacts": {
              "police": "Police contact number",
              "hospital": "Hospital contact number",
              "mechanic": "Car mechanic contact number"
            }
          }
        `;
  
        try {
          const result = await model.generateContent(prompt);
          const textResponse = result.response.text();
  
          // Extract JSON safely
          const startIdx = textResponse.indexOf("{");
          const endIdx = textResponse.lastIndexOf("}");
          if (startIdx === -1 || endIdx === -1) throw new Error("Invalid JSON response");
  
          const travelInfo = JSON.parse(textResponse.substring(startIdx, endIdx + 1));
  
          // Fetch additional real-time data
          travelInfo.weather = await getWeather(destination);
          travelInfo.events = await getEvents(destination);
          travelInfo.images = await getImages(destination);
  
          // Remove null fields
          return Object.fromEntries(Object.entries(travelInfo).filter(([_, v]) => v !== null));
        } catch (error) {
          console.error("Error fetching travel information:", error);
          return null;
        }
      };
  
      // Fetch travel info and send response
      const data = await fetchTravelInfo(place);
      if (!data) {
        return next(new ApiError(500, "Failed to fetch travel information"));
      }
  
      res.status(200).json({ data });
    } catch (error) {
      console.error("Error generating itinerary:", error);
      return next(new ApiError(500, "Error generating itinerary by AI", error));
    }
  });

const generateProfilePage = asyncHandler(async (req, res, next) => {
  try {
    const user = (await User.findById(req.user?._id)) || null;
    res.render("profile", { user });
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "Failed to generate profile page", error));
  }
});
// Function to generate a static map
const generateMap = async (req, res, next) => {
  const { itinerary } = req.body;

  if (!itinerary || !Array.isArray(itinerary)) {
    return next(
      new ApiError(400, "Itinerary data is required and must be an array.")
    );
  }

  // Extract coordinates from the itinerary
  let coordinates = [];
  itinerary.forEach((day) => {
    day.activities.forEach((activity) => {
      if (
        activity.coordinates &&
        activity.coordinates.latitude &&
        activity.coordinates.longitude
      ) {
        coordinates.push(
          `${activity.coordinates.longitude},${activity.coordinates.latitude}`
        );
      }
    });
  });

  if (coordinates.length === 0) {
    return next(
      new ApiError(400, "No valid coordinates found in the itinerary.")
    );
  }

  // Prepare markers string for MapTiler API
  const markers = coordinates
    .map((coord) => `pin-s+ff0000(${coord})`)
    .join(",");

  // Maptiler Static Maps API URL
  const url = `https://api.maptiler.com/maps/streets/static/${markers}/auto/1280x720@2x.png?key=${MAPTILER_KEY}`;

  try {
    // Fetch the map image from MapTiler API

    const response = await fetch(url);

    const buffer = Buffer.from(await response.arrayBuffer());

    // Save the image to the temp folder
    const fileName = `${uuidv4()}.png`;
    const filePath = path.join(process.cwd(), "public", "temp", fileName);
    fs.writeFileSync(filePath, buffer); // Write as Buffer

    // Send the image URL back to the frontend
    res.status(200).json({ url: `/temp/${fileName}` });

    // Optionally delete the file after 10 minutes
    setTimeout(
      () => {
        fs.unlink(filePath, (err) => {
          if (err) console.error("Error deleting map file:", err);
        });
      },
      10 * 60 * 1000
    ); // 10 minutes
  } catch (error) {
    console.error("Error generating map:", error);
    return next(new ApiError(500, "Failed to generate map."));
  }
};

// const generateMap = asyncHandler(async (req, res, next) => {

// });

// Exporting all booking controllers
export {
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
};
