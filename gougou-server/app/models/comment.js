import mongoose from 'mongoose'

const Schema =mongoose.Schema
const ObjectId =Schema.Types.ObjectId

const  CommentSchema =new Schema({
    creation:{
        type:ObjectId,
        ref:'Creation'
    },
    content:String,
    replyBy:{
        type:ObjectId,
        ref:'User'
    },
    replyTo:{
        type:ObjectId,
        ref:'User'
    },
    reply:[{
        from:{
            type:ObjectId,
            ref:'User'
        },
        to:{
            type:ObjectId,
            ref:"User'"
        }
    }],
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

CommentSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt =this.meta.updateAt =Date.now()
    }else {
        this.meta.updateAt =Date.now()
    }
    next()
})

mongoose.model('Comment',CommentSchema)

