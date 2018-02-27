import express from 'express'
import helmet from 'helmet'
import logger from 'morgan'

import renderClient from './middleware/render-client'

const app = express()
export default app

app.use(helmet())
app.use(logger('dev'))

app.get('*', renderClient())
