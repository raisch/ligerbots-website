const express = require('express')
const router = express.Router()

router.get('/join', (req, res) => {
    res.render('views/main/join')
})









module.exports = router