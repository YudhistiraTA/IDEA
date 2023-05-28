require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const cors = require('cors');
const errorHandling = require('./middlewares/errorHandling.js');
const router = require('./routes');

const corsOptions = {
    origin: 'challenge1-387006.web.app', // replace with your app's URL
    optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errorHandling);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})