import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import PinRouter from './routes/Pin.js'
import UserRouter from './routes/User.js'

dotenv.config()

const app = express();

mongoose.connect("mongodb+srv://Shreejan53:Splatqueen53@database.qsldw.mongodb.net/TravelMap?retryWrites=true&w=majority").then(() => {
    app.listen("https://travel-map-pink.vercel.app");
    console.log("appp is listening in https://travel-map-pink.vercel.app/");
}).catch(err => console.log(err));

app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use('/pin', PinRouter);
app.use('/user', UserRouter);


app.get('/', (req, res) => {
    res.send("<h1>This is Server</h1>")
})
