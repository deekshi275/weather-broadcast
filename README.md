🌦️ Weather Broadcast — Smart Weather & Farming Assistant

Short description
A smart web application that combines real-time weather updates, an intelligent chatbot, and data-driven farming insights to help users make informed decisions about vegetable cultivation and planting times.

Features
- Real-time weather updates
  - Fetches live weather data based on the user’s current location (or a searched location).
  - Displays: temperature, humidity, wind speed, rainfall, and forecast.
- Smart Chatbot Assistant
  - Ask weather- and farming-related questions.
  - Suggests suitable vegetables and cultiva. tion tips based on weather and season.
- Smart Crop Suggestions
  - Enter a location to receive vegetables best suited for that region.
  - Recommendations use local climate and seasonal trends.
- Vegetable Planning Tool
  - Search any vegetable and see best months for planting and growing.
  - Helps plan efficient, seasonal cultivation.

Tech stack
- Frontend: HTML, CSS, JavaScript
- Weather API: OpenWeatherMap API
- Chatbot Integration: Dialogflow or GPT-style API
- Location services: Browser Geolocation API

Installation & setup
1. Clone the repository
   git clone https://github.com/deekshi275/weather-broadcast.git
2. Navigate into the project directory
   cd weather-broadcast
3. Install dependencies
   npm install
4. Create a .env file in the project root and add required API keys (example below)
5. Start the development server
   npm start

Example .env
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
REACT_APP_CHATBOT_API_KEY=your_dialogflow_or_gpt_api_key
# Add any other keys or config values required by your app

Usage
- Allow location access in your browser to get current-location weather.
- Use the chatbot UI to ask questions about weather, crops, and planting.
- Use the vegetable planner to view recommended planting months per crop.

Development notes (optional)
- If you use a build step: npm run build
- To run tests (if configured): npm test

Contributing
Contributions welcome. Please open an issue or submit a pull request with a clear description of your changes.

License
This project is available under the MIT License.

Credits
- OpenWeatherMap for weather data
- Dialogflow / GPT for chatbot integration (if used)

Contact
- Maintainer: deekshi275. 
 