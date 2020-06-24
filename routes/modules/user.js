const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const db = require('../../models')
const User = db.User

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/user/login',
  failureFlash: true
}))

router.post('/register', (req, res) => {
  const { name, email, password } = req.body
  User.findOne({ where: { email } })
    .then(user => {
      if (user) res.render('register', { name, email })
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({ name, email, password: hash }))
        .then(() => res.redirect('/user/login'))
        .catch(error => console.log('error'))
    })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router