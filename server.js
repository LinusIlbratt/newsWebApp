const express = require('express');
const app = express();

// setting up a simple route to handle GET-requests
app.get('/', (req, res) => {
    res.send('Welcome to my first server!')
});

// start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server runs on http://localhost:${PORT}')
});