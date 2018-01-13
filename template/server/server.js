import Koa from 'koa'
import koaHelmet from 'koa-helmet'
import Router from 'koa-router'

import renderClient from './middleware/render-client'

const app = new Koa()
export default app

app.use(koaHelmet())

const router = new Router()
router.get('*', renderClient())

app.use(router.routes())
app.use(router.allowedMethods())
