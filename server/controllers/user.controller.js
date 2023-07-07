import User from "../models/user.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
    const existUser = await User.findOne({email : req.body.email})
    if (existUser) return res.status(403).json({error : 'email already exists'});
    const user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashedPwrd = await bcrypt.hash(user.password, salt);
    user.password = hashedPwrd;
    try {
        await user.save()
        res.status(201).json("Successfully signed up");
    } catch (error) {
        res.status(400).json({error : error});
    }
}

export const listUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password -_id -__v');
        res.status(200).json({users : users})
    } catch (error) {
        res.status(400).json({error : error });
    }   
}

export const loadUserById = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log(userId)
        const user = await User.findById(userId).select('-password -__v');
        // console.log(user)

        if (user){
            res.status(200).json({profile : user})
        } else {
            res.status(404).json({error : "User doesn't exist"})
        }
        
    } catch (error) {
        res.status(404).json({error : error})
    }
}

export const updateUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const update = req.body;
        const newUser = await User.findByIdAndUpdate(userId, update, {new : true}).select('-password -__v');
        await newUser.save();
        newUser.updatedAt = Date.now();
        await newUser.save();

        res.status(200).json({profile : newUser})
    } catch (error) {
        res.status(500).json({error: error})
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(res.user._id); 
        if (!user) return res.status(400).send("User doesn't eist or already deleted")
        res.status(204) 
        
    } catch (error) {
        res.status(500).json({error : error })
    }
}