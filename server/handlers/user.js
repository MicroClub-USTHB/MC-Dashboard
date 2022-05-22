import User from "../models/user.js";
const editProfile = async (req, res, next) => {
    // TODO: change props
    try {
        await req.user.save();
        next();
    } catch (e) {
        next(e);
    }
};
const changePassword = async (req, res, next) => {
    const { password } = req.body;
    try {
        await req.user.update({ password });
        next();
    } catch (e) {
        next(e);
    }
};

const GetLoggedInUserInfos = async (req, res) => {
    res.status(200).json(req.user.Optimize());
};
const getClients = async (req, res, next) => {
    try {
        let clients = await User.find({});
        res.status(200).json(clients);
    } catch (e) {
        console.error(e);
        next(e);
    }
};
export { getClients, editProfile, GetLoggedInUserInfos, changePassword };
