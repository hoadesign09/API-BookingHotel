import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToke = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated!"))
    }

    jwt.verify(token, process.env.JWT, (err, userlogin) => {
        if (err) return next(createError(403, "Token is not valid!"))
        req.userlogin = userlogin;
        next()
    });
}

export const verifyUser = (req, res, next) => {
    verifyToke(req, res, next, ()=> {
        if(req.userlogin.id == req.params.id || req.userlogin.isAdmin){
            next()
        }else{
            return next(createError(403, "You are not authorized!"))
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToke(req, res, next,  ()=> {
        if(req.userlogin.isAdmin){
            next()
        }else{
            return next(createError(403, "You are not authorized!"))
        }
    })
}