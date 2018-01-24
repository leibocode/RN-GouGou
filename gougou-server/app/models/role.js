const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const SALT_WORK_FACTOR = 10
const MAx_LOGIN_ATTEMPTS =5
const LOCK_TIME =2*60*60*1000

const Schema =mongoose.Schema
const ObjectId =Schema.Types.ObjectId
const Mixed =Schema.Types.Mixed


const RoleSchema =new mongoose.Schema({
    role:{
        type:String,
        default:'admin'
    },
    nickName:{
        type:String,
        default:'admin'
    },
    address:String,
    email:String,
    passWord:String,
    hashedPassword:String,
    loginAttempts:{
        type:Number,
        required:true,
        default:0
    },
    lockUntil:Number,
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

RoleSchema.virtual('isLocked').get(function(){
    return !!(this.lockUntil && this.lockUntil > Date.now())
})


RoleSchema.pre('save', function (next) {
    if (this.isNew) {
      this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
      this.meta.updatedAt = Date.now()
    }
  
    next()
})

RoleSchema.pre('save',function(next){
    let role =this
    if (!role.isModified('password')) return next()
     
    bcrypt.hash(SALT_WORK_FACTOR,(err,salt)=>{
        if(err) {
            return next(err)
        }
        bcrypt.hash(role.passWord,salt,(err,hash)=>{
            if(err)  return next(err)

            role.passWord =hash
            next()
        })
    })
})

mongoose.model('Role',RoleSchema)