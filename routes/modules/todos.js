const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo
//----- Create -----//

//----- Read -----//
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => {
      console.log(todo.toJSON())
      res.render('detail', { todo: todo.toJSON() })
    })
})
//----- Update -----//

//----- Delete -----//
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => todo.destroy())
    .then(() => res.redirect('/'))
    .catch(error => console.log('error!'))
})

module.exports = router