require('dotenv').config();
const express = require('express');
const axios = require('axios');  // axios for easier API calls
const app = express();

const API_KEY = process.env.API_KEY;

const path = require('path');

// Serve static files (HTML, CSS, JS) from the public folder
app.use(express.static(path.join(__dirname, '../public')));

// define a route to handle the API request
console.log('API Key:', API_KEY);  // Add this for debugging
app.get('/api/news', async (req, res) => {
  const url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`;
  
  try {
    const response = await axios.get(url);
    res.json(response.data);  // send the data to the frontend
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from the API' });
  }
});

// start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
