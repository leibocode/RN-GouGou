import mongoose, { model } from 'mongoose'

const Schema =mongoose.Schema
const ObjectId =Schema.Types.ObjectId
const Mixed =Schema.Types.Mixed

const CreationSchema =new Schema({
    author:{
        type:ObjectId,
        ref:'User'
    },
    audio:{
        type:ObjectId,
        ref:'Audio'
    },
    video:{
        type:ObjectId,
        ref:'Video'
    },
    qiniu_thumb:String,
    qiniu_video:String,

    cloudinary_thumb:String,
    cloudinary_video:String,

    finish:{
        type:Number,
        default:0
    },
    title:String,
    votes:[String],
    up:{
        type:Number,
        default:0
    },

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

CreationSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt =this.meta.updateAt =Date.now()
    }else {
        this.meta.updateAt =Date.now()
    }

    next()
})

mongoose.model('Creation',CreationSchema)