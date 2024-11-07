import { Router } from "express";
import { Signup, Login, LogOut } from '../Controllers/AuthController.js';

const router = Router();

router.post("/signup", Signup)
router.post('/login', Login)
router.get("/logout", LogOut);

export default router;