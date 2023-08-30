const express = require('express')
const router = express.Router()
const checkinController = require('../controllers/checkinController')
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)
router.route('/')
    .get(checkinController.getLocation)
    .post(checkinController.createNewPerson)

    module.exports = router