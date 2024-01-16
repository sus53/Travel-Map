import mongoose from "mongoose";

const PinSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    place: {
        type: String,
        require: true
    },
    review: {
        type: String,
        require: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true
    }


}, { timestamps: true });

const Pin = mongoose.model("Pin", PinSchema);
export default Pin; 