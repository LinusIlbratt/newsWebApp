require('dotenv').config();
const express = require('express');
const axios = require('axios');  // axios for easier API calls
const app = express();

const API_KEY = process.env.API_KEY;

// define a route to handle the API request
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
