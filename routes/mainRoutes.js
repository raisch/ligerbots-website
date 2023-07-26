const express = require('express')
const router = express.Router()

router.get('veiws/join', (req, res) => {
    res.render('veiws/join')
})









module.exports = router