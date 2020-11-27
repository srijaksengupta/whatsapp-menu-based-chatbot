require('dotenv').config();

const mongoose = require('mongoose');

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, 
    {
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB database connection established successfully'))
    .catch((error) => console.log(error))