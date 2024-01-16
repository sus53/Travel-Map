import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 30,
        unique: true
    },

    password: {
        type: String,
        require: true,
        max: 50,
        min: 5
    }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User; 