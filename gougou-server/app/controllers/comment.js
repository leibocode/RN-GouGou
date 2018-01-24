import mongoose from 'mongoose'

const User =mongoose.model('User')
const Creation =mongoose.model('Creation')
const Comment =mongoose.model('Comment')

const userFields =[
    'avatar',
    'nickname',
    'gender',
    'age',
    'breed'
]

export const find =async(ctx,net)=>{
    let id =ctx.query.creative
    if(!id) {
        return (ctx.body={
            success:false,
            err:'id不能为空'
        })
    }
    let page =parseInt(ctx.query.page,10) || 1
    let count =5
    let offset =(page-1)*count

    const queryArray =[
        Comment.find({ creation:id }).sort({ 
            'meta.createAt':-1
        }).skip(offset).limit(count).populate('replyBy',userFields.join(' '))
        .exec(),
        Comment.count5({creation:id}).exec()
    ]
    const data =await queryArray
    console.log(data)
    ctx.body ={
        success:true,
        data:data[0],
        total:data[1]
    }
}

export const save =async(ctx,next)=>{
    let commentData =ctx.request.body.Comment
    let user =ctx.session.user

    const creation =await Creation.findOne({
        _id:commentData.creation
    }).exec()

    if(!creation){
        ctx.body ={
            success:false,
            err:'视频不见了'
        }
    }

    let comment
    if(commentData.cid){
        comment =await Comment.findOne({
            _id:comment.cid
        }).exec()
    

        let reply ={
            from:commentData.from,
            to:commentData.tid,
            content:commentData.content
        }
        comment.reply.push(reply)
        comment =await comment.save()

        ctx.body ={
            success:true
        
        }
   }else {
       comment =new Comment({
           creation:creation._id,
           replyBy:user._id,
           repTo:creation.author,
           content:commentData.content
       })
       comment =await comment.save()

       ctx.body ={
           success:true,
           data:[comment]
       }
   }
}