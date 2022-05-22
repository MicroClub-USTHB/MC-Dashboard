import mongoose from "mongoose";
const loggerSchema = new mongoose.Schema(
    {
        type: { type: String, required: true, enum: ["log", "error"] },
        title: { type: String, required: true },
        data: { type: Object, required: true },
    },
    { timestamps: true }
);
loggerSchema.statics.log = async function (title, data) {
    return this.create({ title, data, type: "log" }).catch(console.error);
};
loggerSchema.statics.error = async function (title, data) {
    return this.create({ title, data, type: "error" }).catch(console.error);
};
export default mongoose.model("logger", loggerSchema);
