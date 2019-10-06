const express = require('express');

const gifs = require('./routes/api/gifs');

const app = express();

// Use Routes
app.use('/api/gifs', gifs);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
