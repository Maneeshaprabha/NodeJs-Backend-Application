# Weather Report API with Google Maps

A Node.js REST API that allows users to submit their email and location to receive a weather report. The app uses the **Google Maps API** to reverse-geocode coordinates into a location and **OpenWeatherMap API** to fetch weather data. Reports are stored in MongoDB.

---

## Features

-  Reverse geolocation using Google Maps API
-  Real-time weather from OpenWeatherMap
- MongoDB database for report storage
- Express.js-based REST API

---

## Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- Google Maps API (Reverse Geocoding)
- OpenWeatherMap API
- dotenv
- axios

---

##  API Endpoints

### `POST /api/users`

Create a new weather report for a user using email and location.

#### Request Body
```json
{
  "email": "ueremail@gmail.com",
  "latitude": 7.8731,
  "longitude": 80.7718
}
