import mongoose from 'mongoose'
import User from '../models/user'
import robot from '../service/robot'
import uuid from 'uuid'

export const signature =async(ctx,next)=>{
    let body =ctx.request.body
    let cloud =ctx.cloud

    let data 
    if(cloud==='qiniu'){
        data =await robot.getQiniuToken(body)

    }else {
        data =await robot.getCloudinaryToken(body)
    }

    ctx.body ={
        success:true,
        data:data
    }
}

export const hasBody =async(ctx,next)=>{
    let body =ctx.request.body || {}
    if(Object.keys(body).length>0){
        ctx.body ={
            success:false,
            err:'参数不全'
        }

    }
    await  next()

}

export const  hasToken =async(ctx,next)=>{
    let accessToken =ctx.query.accessToken || ctx.request.body.accessToken

    if(!accessToken) {
        ctx.body ={
            success:false,
            err:'required accessToken'
        }
    }

    const user =await User.findOne({
        accessToken:accessToken
    }).exec()

    if(!user) {
        ctx.body ={
            success:false,
            err:'logined false'
        }
    }

    ctx.session =ctx.session || {}
    ctx.session.user =user

    await next()
}

