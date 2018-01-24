/**
 * creation
 */
import _ from 'lodash'
import mongoose from 'mongoose'
import xss from 'xss'

import robot from '../service/robot'
import comfig from '../../config'

const Video =mongoose.model('Video')
const Audio =mongoose.model('Audio')
const Creation =mongoose.model('Creation')

let userFields =[
    'avatar',
    'nickname',
    'gender',
    'age',
    'breed'
]


export const up =async(ctx,nect)=>{
    let body =ctx.request.body
    let user =ctx.session.user

    let creation =await Creation.findOne({
        _id:body.id
    }).exec()

    if(!creation){
        ctx.body ={
            success:false,
            err:'视频不存在'
        }
        return 
    }

    if(body.up==='yes'){
        
    }

}
