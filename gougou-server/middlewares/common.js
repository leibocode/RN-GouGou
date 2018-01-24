import koabody from 'koa-bodyparser'
import session from 'koa-session'
import logger from 'koa-logger'

export const addlogger =app=>{
    app.use(logger())
}

export const addBody =app=>{
    app.use(koabody())
}


export const addSession =app=>{
    app.keys =['myfirstapp']

    const CONFIG ={
        key:'koa:sess',
        maxAge:86400000,
        overwrite: true,
        signed: true,
        rolling: false
    }
    app.use(session(CONFIG,app))
}
