import mongoose from 'mongoose'

const UserSchema =new mongoose.Schema({
    phoneNumber:{
        unique:true,
        type:String
    },
    areaCode:String,
    verifyCode:String,
    verified:{
        type:Boolean,
        default:true
    },
    accessToken:String,
    nickName:String,
    gender:String,
    breed:String,
    age:String,
    avatar:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
})

UserSchema.pre('save',function(next){
    if(this.isNew) {
        this.meta.createAt =this.meta.updateAt =Date.now()
    }else {
        this.meta.updateAt =Date.now()
    }
    next()
})

mongoose.model('User',UserSchema)