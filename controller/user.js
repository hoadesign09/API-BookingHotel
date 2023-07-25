import user from "../model/user.js"; 


export const updateUser = async(req,res,next)=>{
    try {
        const updateUser = await user.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateUser)
    } catch (err) {
        next(err)
    }
}

export const deleteUser = async(req,res,next)=>{
    try {
        await user.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted.")
    } catch (err) {
        next(err)
    }
}

export const getUsers = async(req,res,next)=>{
    try {
        const Users = await user.find()
        res.status(200).json(Users)
    } catch (err) {
        next(err)
    }
}

export const getIdUser = async(req,res,next)=>{
    try {
        const User = await user.findById(req.params.id)
        res.status(200).json(User)
    } catch (err) {
        next(err)
    }
}

