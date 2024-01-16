import User from "../models/User.js";
import bcrypt from 'bcrypt'

export const GetUser = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const LoginUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(400).json("Wrong Username or Password");

        const password = bcrypt.compare(req.body.password, user.password);
        !password && res.status(400).json("Wrong Username or Password");

        res.status(200).json({ username: req.body.username });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const RegisterUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(5);
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });
        await user.save();
        res.status(200).json({ username: req.body.username });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const RemoveUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndRemove(id);
        res.status(200).json(true);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}