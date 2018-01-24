/**
 * 启动文件
 */
import Koa from 'koa'
import R from 'ramda'
import { resolve,dirname } from 'path'



const r = path => resolve(__dirname, path)
const host =process.env.HOST || '127.0.0.1'
const port =process.env.POST || 3000

const MIDDWARES =['common','database','router']
class Server{
    constructor(){
        this.app =new Koa()
        this.useMiddleWares(this.app)(MIDDWARES)
    }
    useMiddleWares(app){
        return R.map(R.compose(
            R.map(i => i(app)),
            require,
            i => `${r('./middlewares')}/${i}`
        ))
    }
    satrt() {
        
        this.app.listen(port,host)
    }
}

const app =new Server()

app.satrt()



