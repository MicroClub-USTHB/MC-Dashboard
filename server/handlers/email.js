import nodemailer from "nodemailer";
import logger from "../models/logger.js";
const transporter = nodemailer.createTransport({
    host: process.env.BACK_EmailHost,
    port: process.env.BACK_EmailHost,
    secure: true,
    auth: {
        user: process.env.BACK_EmailUser,
        pass: process.env.BACK_EmailPass,
    },
    tls: { rejectUnauthorized: false },
});

export async function SendEmail(email, subject, html) {
    return await transporter
        .sendMail({
            from: `"${process.env.APP_Name}" <${process.env.EmailUser}>`,
            to: email,
            subject,
            html,
        })
        .then((data) => {
            logger.log("Email has been sent", data);
        })
        .catch((e) => {
            logger.error("Couldn't send email", e.message);
        });
}
