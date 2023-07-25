import user from "../model/user.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";



export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new user({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })

        await newUser.save()
        res.status(200).send("User has been created")

    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        const userlogin = await user.findOne({ username: req.body.username })
        if (!userlogin) return next(createError(404, "User not found!"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, userlogin.password)
        if (!isPasswordCorrect)
            return next(createError(400, "Wrong password or username!"));

        const token = jwt.sign({ id: userlogin._id, isAdmin: userlogin.isAdmin }, process.env.JWT);

        const { password, isAdmin, ...otherDetails } = userlogin._doc;

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({ ...otherDetails });

    } catch (err) {
        next(err)
    }
}