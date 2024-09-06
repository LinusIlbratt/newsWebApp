require('dotenv').config(); // Load environment variables from the .env file
const express = require('express'); // Express framework for building web applications
const axios = require('axios'); // Axios library for making API requests
const app = express(); // Create an Express app to handle HTTP requests

// Retrieve API keys from .env file
const newsApiKey = process.env.NEWSAPI_KEY;
const currentsApiKey = process.env.CURRENTSAPI_KEY;
const path = require('path'); // Node module for handling file and directory paths

// Serve static files (HTML, CSS, JS) from the public folder
app.use(express.static(path.join(__dirname, '../public')));

// Define a route to handle API requests
app.get('/api/news', async (req, res) => {
  const apiUrls = [
    `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${newsApiKey}`,
    `https://newsapi.org/v2/everything?q=apple&from=2024-09-05&to=2024-09-05&sortBy=popularity&apiKey=${newsApiKey}`,
    `https://api.currentsapi.services/v1/latest-news?language=en&apiKey=${currentsApiKey}` // Currents API request
  ];

  try {
    // Send all API requests in parallel with Promise.all
    const apiRequests = apiUrls.map(url => axios.get(url));
    const responses = await Promise.all(apiRequests);

    // Extract articles from each API response
    const articles = responses.map(response => response.data.articles || response.data.news); // 'news' for Currents API

    // Send back the results
    res.json({
      techCrunchArticles: articles[0],
      appleArticles: articles[1],
      currentsArticles: articles[2] // Add the latest news from Currents API
    });

  } catch (error) {
    // Handle error and send back a 500 status with the error message
    console.error('Error fetching API data:', error.message || error);
    res.status(500).json({ error: 'Error fetching data from the API' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
