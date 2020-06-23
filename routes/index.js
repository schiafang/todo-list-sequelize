const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')

const home = require('./modules/home')
const user = require('./modules/user')
const todos = require('./modules/todos')

router.use('/user', user)
router.use('/todos', authenticator, todos)
router.use('/', authenticator, home)

module.exports = router