const express = require('express')
const Student = require('./../models/student')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('students/new', { student: new Student() })
})

router.get('/edit/:id', async (req, res) => {
  const student = await Student.findById(req.params.id)
  res.render('students/edit', { student })
})

router.post('/', async (req, res, next) => {
  req.student = new Student()
  next()
}, saveStudentAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
  req.student = await Student.findById(req.params.id)
  next()
}, saveStudentAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function saveStudentAndRedirect (path) {
  return async (req, res) => {
    let student = req.student
    student.firstName = req.body.firstName
    student.lastName = req.body.lastName
    student.imageUrl = req.body.imageUrl
    student.grade = req.body.grade
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
