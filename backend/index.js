const express = require('express')
const cookieParser = require('cookie-parser')
const csurf = require('csurf')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

const customValueFunction = (req) => {
  return req.headers['x-xsrf-token']
}

const csrfProtection = csurf({
  value: customValueFunction,
  cookie: {
    secure: false,
    httpOnly: false,
    path: '/'
  },
  ignoreMethods: ['GET', 'HEAD', 'OPTIONS']
})

app.use(cors())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(csurf({ cookie: true }))

app.get('/api/cars', (req, res) => res.json())

app.post('/api/cars', (req, res) => {
  res.status(200).json({ message: 'Acertou miseravi!!!' })
})

app.use(csrfProtection, (req, res, next) => {
  res.cookie('XSRF_TOKEN', req.csrfToken(), { secure: false })
  next()
})

app.listen(3000)
