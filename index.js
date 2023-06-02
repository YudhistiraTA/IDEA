const express = require('express')
const app = express()
const cors = require('cors');
const errorHandling = require('./middlewares/errorHandling.js');
const router = require('./routes');

/** SWAP CORS FOR DEV AND PROD. */
const corsOptions = {
    origin: 'https://challenge1-387006.web.app', // replace with your app's URL
    optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errorHandling);

module.exports = app;