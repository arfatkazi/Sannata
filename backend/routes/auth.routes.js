import { Router } from "express";
import {
  checkUsername,
  finishSignup,
  sendOTP,
  verifyOTP,
  standardLogin
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.get("/check-username", checkUsername);
router.post("/finish-signup", finishSignup);
router.post('/standard-login', standardLogin);

export default router;
