import fs from 'fs'
import { resolve } from 'path'
import mongoose from 'mongoose'
import config from '../config'
import R from 'ramda'

const models =resolve(__dirname,'../app/models')

fs.readdirSync(models)
.filter(file => ~file.search(/^[^\.].*js$/))
.forEach(file => require(resolve(models, file)))


export const database =app=>{
  mongoose.set('debug',true)
  
  mongoose.connect(config.db,{useMongoClient:true})
  mongoose.connection.on('disconnected',()=>{
      mongoose.connect(config.db)
  })

  mongoose.connection.on('open',async()=>{
      console.log('Connected to Mongoose',config.db)

      const Role =mongoose.model('Role')

      let role =await Role.findOne({
          email:'252517584@qq.com'
      }).exec()
    
      if(!role){
          console.log('写入管理员数据成功')
          role =new Role({
              email:'252517584@qq.com',
              passWord:"Leibo",
              role:'admin'
          })

          await role.save()
      }
  })
}