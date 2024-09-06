require('dotenv').config(); // Load environment variables from the .env file
const express = require('express'); // Express framework for building web applications
const axios = require('axios'); // Axios library for making API requests
const app = express(); // Create an Express app to handle HTTP requests

const API_KEY = process.env.API_KEY; // Retrieve API key from .env file
const path = require('path'); // Node module for handling file and directory paths

// Serve static files (HTML, CSS, JS) from the public folder
app.use(express.static(path.join(__dirname, '../public')));

// Define a route to handle API requests
app.get('/api/news', async (req, res) => {
  const apiUrls = [
    `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`,
    `https://newsapi.org/v2/everything?q=apple&from=2024-09-05&to=2024-09-05&sortBy=popularity&apiKey=${API_KEY}`
  ];

  try {
    // Send all API requests in parallel with Promise.all
    const apiRequests = apiUrls.map(url => axios.get(url));
    const responses = await Promise.all(apiRequests);

    // Extract articles from each API response
    const articles = responses.map(response => response.data.articles);

    // Send back the results
    res.json({
      techCrunchArticles: articles[0],
      appleArticles: articles[1]
    });

  } catch (error) {
    // Handle error and send back a 500 status with the error message
    res.status(500).json({ error: 'Error fetching data from the API' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
