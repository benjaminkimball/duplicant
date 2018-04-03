import express from 'express'
import helmet from 'helmet'
import logger from 'morgan'

import renderClientStream from './middleware/render-client-stream'

const app = express()
export default app

app.use(helmet())
app.use(logger('dev'))

app.get('*', renderClientStream())
