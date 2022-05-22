import { Router } from "express";
import {
    editProfile,
    GetLoggedInUserInfos,
    getClients,
} from "../handlers/user.js";
import {
    checkLogs,
    loggedIn,
    isSameUser,
    isAdmin,
} from "../middlewares/auth.js";

const router = Router();
router.all("*", checkLogs, loggedIn);
router
    .route("/")
    .get(isAdmin, getClients)
    .put(isSameUser, editProfile, GetLoggedInUserInfos);

export default router;
