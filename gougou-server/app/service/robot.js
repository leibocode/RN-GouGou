/**
 * 上传图片到七牛
 */
import qiniu from 'qiniu'
import config from '../../config'
import uuid from 'uuid'
import sha1 from 'sha1'
import cloudinary from 'cloudinary'

qiniu.conf.ACCESS_KEY =config.qiniu.AK
qiniu.conf.SECRET_KEY =config.qiniu.SK

export const saveToQiniu =function(url,key){
    let client =new qiniu.rs.Client()

    return new Promise((resolve,reject)=>{
        client.fetch(url,'myappvideo',key,(err,ret)=>{
            if(err){
                reject(err)
            }else {
                resolve(ret)
            }
        })
    })
}

export const uploadToCloudinary =(url)=>{
    return new Promise((resolve,reject)=>{
        cloudinary.uploader.upload(url,(result)=>{
            if(result.public_id){
                resolve(result)
            }else {
                reject(result)
            }
        },{
            resource_type:'video',
            folder:'video'
        })
    })
}

export const getQiniuToken =(body)=>{
    let type =body.type
    let key =uuid.v4()
    let putPolicy
    let opts ={
        persistentNotifyUrl:config.notify
    }

    if(type==='avatar'){
        putPolicy =new qiniu.rs.putPolicy('myappavtar:'+key)
    }else if(type==='video') {

    }
    else if(type==='audio'){

    }
}

export const getCloudinaryToken =(body)=>{
    let type =body.type
    let timestamp =body.timestamp
    let folder
    let tags

    if(type==='avatar'){
        folder ='avatar'
        tags ='app,avatar'
    }else if(type==='video'){

    }else if(type==='audio'){

    }
    
}