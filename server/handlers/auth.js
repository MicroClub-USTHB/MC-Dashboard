import jwt from "jsonwebtoken";
import RecoverUser from "../models/recover.js";
import logger from "../models/logger.js";
import User from "../models/user.js";
import { SendEmail } from "./email.js";
import { EmailContent, EmailRecover } from "./emailHandler.js";

export const Signup = async (req, res, next) => {
    try {
        req.user = await User.create(req.body);
        if (req.user) {
            res.cookie(
                "token",
                jwt.sign({ id: req.user._id }, process.env.BACK_SECRET),
                {
                    sameSite: "none",
                    secure: true,
                    httpOnly: true,
                    expires: new Date(new Date().getTime() + 720000000),
                }
            );
            SendEmail(
                req.user.email,
                "Registered in the Algeria Game Challenge X platform",
                EmailContent()
            ).catch((e) => console.error(e));
            next();
        } else
            res.status(400).json({
                name: "Unable to signup",
                message: "Couldn't create this user",
            });
    } catch (err) {
        logger.error("Unable to signup", err);
        res.status(400).json({
            name: "Unable to signup",
            message: err.message,
        });
    }
};
export const Logout = async (req, res) => {
    res.cookie("token", "", {
        sameSite: "none",
        secure: true,
        httpOnly: true,
        expires: new Date(1),
    });
    res.send({ message: "Logged out" });
};
export const SignIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        req.user = await User.findOne({
            $or: [{ email }, { userName: email }],
        });

        if (req.user) {
            const isPasswordMatch = await req.user.comparePasswords(password);
            if (isPasswordMatch) {
                res.cookie(
                    "token",
                    jwt.sign({ id: req.user._id }, process.env.BACK_SECRET),
                    {
                        sameSite: "none",
                        secure: true,
                        httpOnly: true,
                        expires: new Date(new Date().getTime() + 720000000),
                    }
                );
                next();
            } else
                next({
                    name: "Couldn't Sign in",
                    message: "Password incorrect",
                });
        } else res.status(400).json({ message: "User not found!" });
    } catch (err) {
        logger.error("email or password incorrect", err);
        console.error(err); //ssss
        next({
            name: "Couldn't Sign in",
            message: err.message,
        });
    }
};
export const Recover = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw new Error("Can't find this email.");
        const r = await RecoverUser.create({ user: user._id });
        await SendEmail(
            user.email,
            "Password recovery " + process.env.APP_Name,
            EmailRecover(r._id)
        );
        res.send({ message: "Recovery link has been sent!" });
    } catch (e) {
        res.status(400).json({
            name: "Recovery link hasn't been sent!",
            message: e.message,
        });
    }
};
export const Reset = async (req, res) => {
    try {
        if (req.body.password !== req.body.confirmPassword)
            throw new Error("Password aren't matched.");
        await RecoverUser.changePassword(req.params.id, req.body.password);
        res.send({
            name: "Resetting Password",
            message: "Password has been changed",
        });
    } catch (err) {
        res.status(400).json({
            name: "Resetting Password",
            message: err.message,
        });
    }
};
