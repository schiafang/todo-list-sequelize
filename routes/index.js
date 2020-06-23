const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const user = require('./modules/user')
const todos = require('./modules/todos')

router.use('/todos', todos)
router.use('/', home)
router.use('/user', user)

module.exports = router