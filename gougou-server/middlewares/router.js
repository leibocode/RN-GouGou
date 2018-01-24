import Router from 'koa-router'

import controllers from '../app/controllers'


export const router =app=>{
    const routers =new Router({
        prefix:'/api'
    })

    //user
    routers.post('/u/signup',controllers.app.hasBody,controllers.user.signup)
    // routers.post('/u/verify',controllers.app.hasBody,controllers.user.verify)
    // routers.post('/update',controllers.app.hasBody,controllers.app.hasToken,controllers.user.update)

    //app
    // routers.post('/u/signature',controllers.app.hasBody,controllers.app.signature)

    //creations
    // routers.get('/creations',controllers.app.hasToken,controllers.creation.find)
    

    //comments
    // routers.get('/comments',controllers.app.hasBody,controllers.comment.find)
    // routers.post('/comments',controllers.app.hasBody,controllers.app.hasToken,controllers.comment.save)

    //votes
    // routers.post('/up',controllers.app.hasBody,controllers.app.hasToken,controllers.creation.up)
    app.use(routers.routes())
    app.use(routers.allowedMethods())
}