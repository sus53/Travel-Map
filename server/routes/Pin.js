import { Router } from "express";
import { CreatePin, GetPin } from "../controller/Pin.js";

const router = Router();

router.post('/', CreatePin);
router.get('/', GetPin);
export default router;