import mongoose, { model } from 'mongoose'

const Schema =mongoose.Schema
const ObjectId =Schema.Types.ObjectId
const Mixed =Schema.Types.Mixed

const AudioSchema =new Schema({
    author:{
        type:ObjectId,
        ref:'User'
    },
    video:{
        type:ObjectId,
        ref:'Video'
    },
    qiniu_video:String,
    qiniu_thumb:String,

    public_id:String,
    detail:Mixed,

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

AudioSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt =this.meta.updateAt =Date.now()
    }else {
        this.meta.updateAt =Date.now()
    }

    next()
})

mongoose.model('Audio',AudioSchema)
