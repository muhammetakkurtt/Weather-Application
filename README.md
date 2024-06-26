# Weather App

Weather App is a simple web application that allows users to get weather information for a specific city. The app provides current weather conditions and five-day forecasts. It uses the AccuWeather infrastructure to retrieve weather data.

## Features

- Current weather forecast
- 5-day forecast
- Caching with local storage

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js ve Express.js
- Axios (for API requests)
- AccuWeather API (for weather data)

## Installation

### Requirements

- Node.js (v20 or later)
- Git

### Adımlar

1. Clone this repo:
    ```bash
    git clone https://github.com/muhammetakkurtt/Weather-Application.git
    cd Weather-Application
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Create the `.env` file and add your AccuWeather API key:
    ```env
    API_KEY=YOUR_ACCUWEATHER_API_KEY
    ```

4. Start the server:
    ```bash
    node server.js
    ```

5. It will be launched automatically in your default browser. (To open it manually, go to `http://localhost:3000` in your browser and use the app.)

## Usage

1. Enter the city name.
2. Click on the "Get Weather" button.
3. Weather information and a 5-day forecast will be displayed
