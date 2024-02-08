require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


//express app
const app = express();

//middleware
app.use(express.json())

//Middleware for handling CORS POLICY
//Option 1 : allow all Origins with default of cors(*)
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
});

//routes


//connect to db
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listenning on port ', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log('database connection FAILED');
        console.log(error)
    });



