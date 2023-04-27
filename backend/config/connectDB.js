const mongoose = require('mongoose');
const dotenv = require('dotenv').config();



const connectDB = async () =>  {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB connected !`)
    } catch (error) {
        console.log(error)
        process.exit(1); //exits out of the application if there is an error
    }
};


module.exports = connectDB
