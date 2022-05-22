import mongoose from "mongoose";
import User from "./user.js";
const expiresAfter = 7200000;
Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
};
const recoverSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        used: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);
recoverSchema.statics.changePassword = async function (id, newPassword) {
    let recover = await this.findById(id);
    if (recover.createdAt.addHours(expiresAfter) < Date.now())
        throw new Error("This link has been expired");
    let user = await User.findById(recover.user);
    user.password = newPassword;
    recover.used = Date.now();
    return await Promise.all([user.save(), recover.save()]);
};

export default mongoose.model("recoverUser", recoverSchema);
