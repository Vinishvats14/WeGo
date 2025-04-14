import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config(); // Load API keys from .env

// API Keys from Environment Variables
const GEMINI_KEY = "<gemini-api-key>";
const OPENWEATHER_KEY = "<openweather-api-key>";
const EVENTBRITE_KEY = "<eventbrite-api-key>";
const PEXELS_API_KEY = "<pexels-api-key>";

// Function to Fetch Weather Data
async function getWeather(destination) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${OPENWEATHER_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            return {
                temperature: `${data.main.temp}°C`,
                condition: data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)
            };
        }
    } catch (error) {
        console.error("Weather API Error:", error);
    }
    return null;
}

// Function to Fetch Events from Eventbrite
async function getEvents(destination) {
    const url = `https://www.eventbriteapi.com/v3/events/search/?q=${destination}&sort_by=date`;
    const headers = { "Authorization": `Bearer ${EVENTBRITE_KEY}` };

    try {
        const response = await fetch(url, { headers });
        const data = await response.json();

        if (data.events && data.events.length > 0) {
            return data.events.slice(0, 5).map(event => ({
                name: event.name.text,
                date: event.start.local,
                location: event.venue?.address?.localized_address_display || "Unknown location"
            }));
        }
    } catch (error) {
        console.error("Eventbrite API Error:", error);
    }
    return null;
}

// Function to Fetch High-Quality Images from Pexels
async function getImages(destination) {
    const url = `https://api.pexels.com/v1/search?query=${destination}&per_page=3`;
    const headers = { Authorization: PEXELS_API_KEY };

    try {
        const response = await fetch(url, { headers });
        const data = await response.json();

        if (data.photos && data.photos.length > 0) {
            return data.photos.map(photo => photo.src.large);
        }
    } catch (error) {
        console.error("Pexels API Error:", error);
    }
    return null;
}

// Function to Fetch Travel Information using Google Gemini AI
async function fetchTravelInfo(destination) {
    const prompt = `
        Generate detailed travel information for ${destination}, including:
        1. Description of the place.
        2. Key attractions listed in points.
        3. Recent reviews from travelers.
        4. Local emergency contact numbers (police, hospitals, car mechanics).

        Output the response strictly in the following JSON format:
        {
            "description": "Detailed description.",
            "attractions": [
                "Point 1",
                "Point 2",
                "Point 3"
            ],
            "reviews": [
                {"user": "User Name", "rating": 4.5, "comment": "Review comment."}
            ],
            "emergency_contacts": {
                "police": "Police contact number",
                "hospital": "Hospital contact number",
                "mechanic": "Car mechanic contact number"
            }
        }
    `;

    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify({ prompt, key: GEMINI_KEY });

    try {
        const response = await fetch(url, { method: "POST", headers, body });
        const data = await response.json();

        if (!data.text) throw new Error("Empty AI response");

        // Extract JSON from response text
        const jsonStart = data.text.indexOf("{");
        const jsonEnd = data.text.lastIndexOf("}");
        if (jsonStart === -1 || jsonEnd === -1) throw new Error("Invalid JSON response");

        let travelInfo = JSON.parse(data.text.slice(jsonStart, jsonEnd + 1));

        // Fetch additional real-time data
        travelInfo.weather = await getWeather(destination);
        travelInfo.events = await getEvents(destination);
        travelInfo.images = await getImages(destination);

        // Remove empty fields
        travelInfo = Object.fromEntries(Object.entries(travelInfo).filter(([_, v]) => v));

        return travelInfo;
    } catch (error) {
        console.error("Error fetching travel information:", error);
        return null;
    }
}

// Example usage
const destination = "New Delhi, India";

fetchTravelInfo(destination).then(travelData => {
    if (travelData) {
        console.log(JSON.stringify(travelData, null, 4));
    } else {
        console.log("Failed to fetch travel information.");
    }
});