import os
import sys
import json
import requests
import google.generativeai as genai

# Configure API Keys
GEMINI_KEY = os.getenv("GOOGLE_API_KEY", "<your-gemini-api-key>")
OPENWEATHER_KEY = os.getenv("OPENWEATHER_API_KEY", "<your-openweather-api-key>")
EVENTBRITE_KEY = os.getenv("EVENTBRITE_API_KEY", "<your-eventbrite-api-key>")
PEXELS_API_KEY = os.getenv("PEXELS_API_KEY", "<your-pexels-api-key>")

# Configure Gemini AI
genai.configure(api_key=GEMINI_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

try:
    input_data = sys.stdin.read().strip()
    request_json = json.loads(input_data)
    destination = request_json.get("place", "New Delhi")  # Default if not provided
except json.JSONDecodeError:
    print(json.dumps({"error": "Invalid JSON input"}))
    sys.exit(1)

def get_weather(destination):
    """Fetch current weather details using OpenWeather API."""
    base_url = "http://api.openweathermap.org/data/2.5/weather"
    params = {
        "q": destination,
        "appid": OPENWEATHER_KEY,
        "units": "metric"
    }
    
    try:
        response = requests.get(base_url, params=params)
        data = response.json()

        if response.status_code == 200:
            return {
                "temperature": f"{data['main']['temp']}°C",
                "condition": data["weather"][0]["description"].capitalize()
            }
    except Exception as e:
        print("Weather API Error:", e)
    
    return None  # Exclude weather if unavailable

def get_events(destination):
    """Fetch ongoing events using Eventbrite API."""
    base_url = "https://www.eventbriteapi.com/v3/events/search/"
    headers = {"Authorization": f"Bearer {EVENTBRITE_KEY}"}
    params = {"q": destination, "sort_by": "date"}

    try:
        response = requests.get(base_url, headers=headers, params=params)
        data = response.json()

        if "events" in data and data["events"]:
            return [
                {
                    "name": event["name"]["text"],
                    "date": event["start"]["local"],
                    "location": event.get("venue", {}).get("address", {}).get("localized_address_display", "Unknown location")
                }
                for event in data["events"][:5]  # Get top 5 events
            ]
    except Exception as e:
        print("Eventbrite API Error:", e)
    
    return None  # Exclude events if none found

def get_images(destination):
    """Fetch high-quality images from Pexels API."""
    base_url = "https://api.pexels.com/v1/search"
    headers = {"Authorization": PEXELS_API_KEY}
    params = {"query": destination, "per_page": 3}

    try:
        response = requests.get(base_url, headers=headers, params=params)
        data = response.json()

        if "photos" in data and data["photos"]:
            return [photo["src"]["large"] for photo in data["photos"][:3]]
    except Exception as e:
        print("Pexels API Error:", e)
    
    return None  # Exclude images if none found

def fetch_travel_info(destination):
    """Fetch travel details using Gemini AI."""
    prompt = f'''
    Generate detailed travel information for {destination} including:
    1. Description of the place.
    2. Key attractions listed in points.
    3. Recent reviews from travelers.
    4. Local emergency contact numbers (police, hospitals, car mechanics).
    
    Output response strictly in the following JSON format:
    {{
        "description": "Detailed description of the place.",
        "attractions": [
            "Point 1",
            "Point 2",
            "Point 3"
        ],
        "reviews": [
            {{"user": "User Name", "rating": 4.5, "comment": "Review comment."}}
        ],
        "emergency_contacts": {{
            "police": "Police contact number",
            "hospital": "Hospital contact number",
            "mechanic": "Car mechanic contact number"
        }}
    }}
    '''

    try:
        result = model.generate_content(prompt)
        
        if not result.text:
            raise ValueError("API response is empty")

        # Extract JSON from Gemini response safely
        start_idx = result.text.find("{")
        end_idx = result.text.rfind("}")
        if start_idx == -1 or end_idx == -1:
            raise ValueError("Invalid JSON response")

        travel_info = json.loads(result.text[start_idx:end_idx + 1])

        # Add real-time weather, event details, and images
        travel_info["weather"] = get_weather(destination)
        travel_info["events"] = get_events(destination)
        travel_info["images"] = get_images(destination)

        # Remove empty fields
        travel_info = {k: v for k, v in travel_info.items() if v}

        return travel_info
    except json.JSONDecodeError as e:
        print("JSON Decode Error:", e)
        return None
    except Exception as e:
        print("Error fetching travel information:", e)
        return None

# Example usage
travel_data = fetch_travel_info(destination)

if travel_data:
    print(json.dumps(travel_data, indent=4))
else:
    print("Failed to fetch travel information.")