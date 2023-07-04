import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        firstName : {
            type : String,
            required : true,
            trim : true
        },
        lastName : {
            type : String,
            trim : true,
            required : true
        },
        email : {
            type : String,
            trim : true,
            required : true,
            unique : true
        },
        password : {
            type : String,
            trim : true,
            required : true,
            min : 4
        },
        createdAt : {
            type : Date,
            default : Date.now
        },
        updatedAt : Date,

    }
)
const User = mongoose.model('User', userSchema)
export default User;