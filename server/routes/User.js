import { Router } from "express";
import { RegisterUser, GetUser, RemoveUser, LoginUser } from "../controller/User.js";

const router = Router();

router.get('/', GetUser)
router.post('/register', RegisterUser);
router.post('/login', LoginUser)
router.delete("/:id", RemoveUser);
export default router;