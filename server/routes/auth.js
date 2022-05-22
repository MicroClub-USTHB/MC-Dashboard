import { Router } from "express";
import { SignIn, Signup, Recover, Reset, Logout } from "../handlers/auth.js";
import { GetLoggedInUserInfos } from "../handlers/user.js";

const router = Router();
router.post("/logout", Logout);

router.post("/signup", Signup, GetLoggedInUserInfos);

router.post("/signin", SignIn, GetLoggedInUserInfos);
router.post("/recover", Recover);
router.post("/recover/:id", Reset);

export default router;
