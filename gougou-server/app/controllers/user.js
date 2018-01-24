import xss from 'xss'
import mongoose from 'mongoose'
import uuid from 'uuid'
import sms from '../service/sms'


const User =mongoose.model('User')

const fields =[
    'avatar',
    'gender',
    'age',
    'nickname',
    'breed'
]

export const signup =async(ctx,next)=>{
     let { phoneNumber } =ctx.request.body
     
     phoneNumber =xss(phoneNumber)

     let user =await User.findOne({
         phoneNumber:phoneNumber
     }).exec()

     const verifyCode =sms.getCode()

     if(!user) {
         let accessToken =uuid.v4()
         user =new User({
             nickname:"小狗宝",
             avatar:'http://dummyimage.com/1280x720/59c731',
             phoneNumber:xss(phoneNumber),
             verifyCode:verifyCode,
             accessToken:accessToken
         })
     }else {
         user.verifyCode =verifyCode
     }

     try {
         user =await user.save()
     }catch(e) {
          return (ctx.body ={
              success:false,
              err:'保存数据错误'
          })
     }

     let msg =`您的验证码为:${verifyCode},请于两小时内验证`
     try{
         sms.sendCode(phoneNumber,msg)
     }catch(e) {
         console.log(e)
         return (ctx.body={
            success:false,
            err:'短信服务异常'
         })
     }

     ctx.body ={
         success:true
     }
}

export const verify =async(ctx,next)=>{
    let body =ctx.request.body.verifyCode
    let { phoneNumber,verifyCode } =body

    if(!phoneNumber || !verifyCode) {
        return (ctx.body ={
            success:false,
            err:'验证没通过'
        })
    }

    let user =await User.findOne({
        phoneNumber:phoneNumber,
        verifyCode:verifyCode
    }).exec()

    if(!user) {
        return (ctx.body={
            success:false,
			err:'验证没通过'
        })
    }else {
        user.verifyCode =true
        user =await user.save()
        ctx.body ={
            success:true,
            data:{
                nickname:user.nickname,
                accessToken:user.accessToken,
                avatar:user.avatar,
                _id:user._id
            }
        }
    }
}

export const update =async(ctx,next)=> {
    let body =ctx.request.body
    let user =ctx.session.user

    fields.forEach(function(field){
        if(body[field]){
            user[field] =xss(body[field].trim())
        }
    })

    try{
        user =await user.save()
    }catch(e) {
        console.log(e)
    }

    ctx.body = {
         success:true,
         data:{
             nickname:user.nickname,
             accessToken:user.accessToken,
             avatar:user.avatar,
             age:user.age,
             breed:user.breed,
             gender:user.gender,
             _id:user._id
         }
    }
}
