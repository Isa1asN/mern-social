import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signin = async (req, res) => {
    try {
        // console.log(req.body.email)
        const user = await User.findOne({email : req.body.email});
        if (!user) return res.status(404).json({error : "email does not exist"});
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) return res.status(400).json({error : "Incorrect credentials"});
    
        const payload = {_id : user._id, email: user.email}
        const token = jwt.sign(payload, process.env.jwtSecret, {expiresIn : "1h"});
        res.cookie("token", token, {httpOnly : true, secure : true});
        res["token"] = token;
        res.status(200).json({token : token, user : {_id : user._id,
                                                     firstName : user.firstName,
                                                     lastName : user.lastName,
                                                     email : user.email}})
        console.log("A user signed in")                                                     
    } catch (error) {
        res.status(500).json({error : "couldn't sign in"});
    }
}

export const signout = async (req, res) => {
    res.clearCookie("token")
    return res.status(200).json({message : "Signed out successfully"});
}