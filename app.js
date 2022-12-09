const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// const PORT = 3000; //Using dotenv
const app = express();

//Middlewares
// app.use('/posts', () => {
//     console.log('This is a middleware running');
// })
app.use(bodyParser.json());
app.use(cors());

//import Routes
const postsRoute = require('./routes/posts')

app.use('/posts', postsRoute);

//ROUTES
app.get('/', (req, res) =>{
    console.log('Root...');
    res.send('THis is home (root)');
})

/* Moved to Route */
// app.get('/posts', (req, res) =>{  
//     res.send('THis is posts');
// })


//Connect to DB
//mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true } () => {
mongoose.connect(process.env.ATLAS_URI, () => {
    console.log('Connected to Atlas (maybe)');  //<= NOT ACURRANCY
});


//Start listening

app.listen(process.env.PORT)