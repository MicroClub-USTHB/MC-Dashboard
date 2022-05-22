import jwt from "jsonwebtoken";
import User from "../models/user.js";
const loggedIn = async (req, res, next) => {
    if (req.user) return next();
    next({ name: "Cannot login", message: "Not signed in" });
};
const checkLogs = async (req, res, next) => {
    const { token } = req.cookies;
    console.log(token);
    req.user = null;
    if (token) {
        const decoded = jwt.verify(token, process.env.BACK_SECRET);
        req.user = await User.findById(decoded.id)
            .select("-password")
            .catch((e) => {
                res.cookie("token", "", {
                    sameSite: "none",
                    secure: true,
                    httpOnly: true,
                    expires: new Date(1),
                });
                return null;
            });
    }
    next();
};
const isSameUser = async (req, res, next) => {
    if (req.user === req.params.id) return next();
    next({
        name: "Not allowed",
        message: "You can't edit someone else's profile",
    });
};
const isAdmin = async (req, res, next) => {
    if (req.user.isAdmin) return next();
    next({
        name: "Not allowed",
        message: "You don't have the privilege to do this action",
    });
};
export { loggedIn, isSameUser, isAdmin, checkLogs };
