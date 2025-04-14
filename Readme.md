# 🌍 WeGo — Your Smart Travel Companion

WeGo is a full-stack travel assistance platform that helps users discover destinations, explore activities, and plan their journeys smarter and faster. Whether you're a solo explorer or a group traveler, WeGo provides a seamless experience with location search, image previews, and real-time suggestions.

---

## 🚀 Features

- 🔐 JWT-based Authentication (Access + Refresh Tokens)
- 🌐 Destination Search with integrated APIs
- ☁️ Image Upload using Cloudinary
- 📧 Email verification & contact
- 🗺️ Map-based location visualization (MapTiler)
- 🤖 AI travel suggestions (Gemini API)
- ✈️ Amadeus API for real-time travel data (optional)

---

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- TailwindCSS
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT Authentication
- dotenv

**Third-party APIs:**
- Cloudinary
- MapTiler
- Amadeus
- Gemini
- Gmail SMTP

---

## 📁 Project Structure


---

## 🧪 Local Setup

### 1. Clone the Repo

```bash
git clone https://github.com/Vinishvats14/WeGo.git
cd WeGo


2. Backend Setup (server)
cd server
npm install


 # Main step
Create a .env file and add:
PORT=1234
MONGODB_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USERNAME=your_email
EMAIL_PASSWORD=your_password
GEMINI_KEY=your_gemini_key
GEMINI_KEY2=optional_key
MAPTILER_KEY=your_maptiler_key
AMADEUS_API_KEY=optional_key
AMADEUS_API_SECRET=optional_secret
npm run dev


3. Frontend Setup (client)
cd ../client
npm install
npm run dev



🙌 Credits

Built with 💙 by Vinish Vats
Special thanks to Vineet & Rakesh for early support!

