if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const route = require('./routes/index')
const session = require('express-session')
const app = express()
const PORT = process.env.PORT
const db = require('./models')
const Todo = db.Todo
const User = db.User
const usePassport = require('./config/passport')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: process.env.SEESION_SECRET,
  resave: false,
  saveUninitialized: true
}))

usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user //將使用者資訊給 res
  next()
})
app.use(route)


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})