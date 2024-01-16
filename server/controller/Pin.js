import Pin from "../models/Pin.js";

export const CreatePin = async (req, res) => {
    const pin = new Pin(req.body);
    try
    {
        await pin.save();
        res.status(200).json(true);
    } catch (error)
    {
        res.status(500).json({ message: error.message })
    }
}

export const GetPin = async (req, res) => {
    try
    {
        const pin = await Pin.find();
        res.status(200).json(pin);
    } catch (error)
    {
        res.status(404).json({ message: error.message })
    }
}