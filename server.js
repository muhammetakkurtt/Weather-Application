const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

app.use(express.static('public'));

app.get('/weather', (req, res) => {
    const city = req.query.city;
    const lat = req.query.lat;
    const lon = req.query.lon;
    let locationUrl;
    
    if (city) {
        locationUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;
    } else if (lat && lon) {
        locationUrl = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${lon}`;
    } else {
        return res.status(400).send('City or coordinates are required');
    }
    axios.get(locationUrl)
        .then(response => {
            const locationKey = response.data.Key || response.data[0].Key;
            const locationName = response.data.LocalizedName || response.data[0].LocalizedName;
            const currentWeatherUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;
            const forecastUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&metric=true`;

            return Promise.all([
                axios.get(currentWeatherUrl),
                axios.get(forecastUrl)
            ]).then(results => {
                res.json({
                    locationName,
                    currentWeatherData: results[0].data,
                    forecastData: results[1].data
                });
            });
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    
    const open = await import('open');
    open.default(`http://localhost:${port}`);
});