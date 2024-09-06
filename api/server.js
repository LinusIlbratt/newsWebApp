require('dotenv').config(); // load environment variable from .env
const express = require('express'); // express is a framework to build webb apps in Node.js
const axios = require('axios');  // axios library for easier API calls
const app = express(); // create a express-app to handle HTTP requests

const API_KEY = process.env.API_KEY; // get API key from the .env file

const path = require('path'); // Node module for file-catalouge searches

// serve static files (HTML, CSS, JS) from the public folder
app.use(express.static(path.join(__dirname, '../public')));

// define a route to handle the API request
app.get('/api/news', async (req, res) => {
  const url = [
    `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`
    `https://newsapi.org/v2/everything?q=apple&from=2024-09-05&to=2024-09-05&sortBy=popularity&apiKey=${API_KEY}`
  ];
  
  
  try {
    // loop through the API:s and sends all requests pararell
    const apiRequests = apiUrls.map(url => axios.get(url));
    const response = await Promise.all(apiRequests);

    // extract every article from each API answer
    const articles = response.map(response => response.data.articles);

    // return the results
    res.json({
      techCrunchArticles: articles[0],
      appleArticles: articles[1]
    });

  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from the API' });
  }
});

// start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
