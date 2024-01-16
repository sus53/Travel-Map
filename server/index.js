import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import PinRouter from './routes/Pin.js'
import UserRouter from './routes/User.js'

dotenv.config()

const app = express();

mongoose.connect(process.env.mongodb).then(() => {
    app.listen(4000);
    console.log("appp is listening in port 4000");
}).catch(err => console.log(err));

app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use('/pin', PinRouter);
app.use('/user', UserRouter);


app.get('/', (req, res) => {
    res.send("<h1>This is Server</h1>")
})
