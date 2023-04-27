const dotenv = require('dotenv').config();
const express = require('express');
const connectDB = require('./config/connectDB');
const mongoose = require('mongoose');
const Task = require("./models/taskModel");
const taskRoutes = require("./routes/taskRoute"); //importing the routes folder
const cors = require('cors');

const app = express();

//Middleware
app.use(express.json()); //express framework provides this custom middleware, with this way you send data in form of json
app.use(express.urlencoded({extended: false}));//this allows to send x www form urlencoded apis

app.use(cors());
//for the backend to accept requests from any url dont put anything inside the cors()...it actually didnt work with the origin and adresses
//it also needs to be set before the taskRoutes in the bottom of this comment
app.use("/api/tasks",taskRoutes); //implementing the taskRoutes for the CRUD operations and appending all of the taskRoute to "api/tasks" since they all share the same beginning of address


//Routes
app.get("/", (req, res) => {
    res.send("Home Page");
});


const PORT = process.env.PORT || 5000;


const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        });
        
    } catch (error) {
        console.log(error);
    }
};

startServer();