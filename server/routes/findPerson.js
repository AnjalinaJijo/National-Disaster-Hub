const express = require('express')
const router = express.Router()
const findPersonController = require('../controllers/findPersonController')

router.post("/",findPersonController.findPerson)

module.exports = router;