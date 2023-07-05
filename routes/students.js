const express = require('express')
const student = require('../models/student')
const router = express.Router()

router.get('/newStudent', (req, res) => {
  res.render('students/newStudent', { student: new student() })
})

router.get('/editStudent/:id', async (req, res) => {
  const student = awaitstudent.findById(req.params.id)
  res.render('students/editStudent', { student })
})

router.get('/:slug', async (req, res) => {
  const student = await student.findOne({ slug: req.params.slug })
  if (student == null) res.redirect('/')
  res.render('students/showStudent', { student })
})

router.post('/', async (req, res, next) => {
  req.student = new student()
  next()
}, saveStudentAndRedirect('newStudent'))

router.put('/:id', async (req, res, next) => {
  req.student = await student.findById(req.params.id)
  next()
}, saveStudentAndRedirect('editStudent'))

router.delete('/:id', async (req, res) => {
  await student.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function savestudentAndRedirect (path) {
  return async (req, res) => {
    let student = req.student
    student.title = req.body.title
    student.description = req.body.description
    student.markdown = req.body.markdown
    try {
      student = await student.save()
      res.redirect(`/students/${student.slug}`)
    } catch (err) {
      console.error(err)
      res.render(`students/${path}`, { student })
    }
  }
}

module.exports = router
