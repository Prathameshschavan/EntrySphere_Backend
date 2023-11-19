import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    first_Name:{
        type:String,
        require:true
    },
    last_Name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    avatar:{
        type:String,
        require:true
    },
    jti:{
        type:String,
        require:true
    },
    sub:{
        type:String,
        require:true
    }
})

const User = mongoose.model("User",userSchema);
export default User;