import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import GithubRouter from './routes/github.router.js'
const helmet = require('helmet')

export const app = express()
app.set('trust proxy', 1)

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 100, // limit each IP addr to 100 requests per hour
  message: 'Too many requests from this IP address. try again in an hour',
})



// set various headers
app.use(helmet())

// apply to all requests
app.use(limiter)

app.disable('x-powered-by')
app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(express.json({ extended: false }))

app.get('/', (req, res, next) => {
  res
    .status(200)
    .json({ message: 'Welcome to the API (express + node wrapper)' })
})

const PORT = process.env.PORT || 8000

// routes
app.use('/api/github', GithubRouter)

export const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`)
    })
  } catch (e) {
    console.error(e)
  }
}
