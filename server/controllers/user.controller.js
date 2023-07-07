import User from "../models/user.js";

export const createUser = async (req, res) => {
    const existUser = User.find({email : req.body.email})
    if (existUser) return res.status(403).json({error : 'email already exists'});
    const user = new User(req.body);
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
        const userId = req.params.userId;
        // console.log(userId)
        const user = await User.findById(userId).select('-password -__v');
        if (user){
            res.status(200).json({profile : user})
        } else {
            res.status(404).json({error : "User doesn't exist"})
        }
        
    } catch (error) {
        res.status(404).json({error : "User doesn't exist"})
    }
}

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
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
        const user = await User.findByIdAndDelete(req.params.userId); 
        if (user) {
            res.status(204)
        } else {
            res.status(400).send("User doesn't eist or already deleted")
        }
    } catch (error) {
        res.status(500).json({error : error })
    }
}