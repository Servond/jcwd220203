const adminTransactionController = require("../controllers/adminTransactionController")
const express = require("express")
const { application } = require("express")

const router = express.Router()

router.get("/get", adminTransactionController.showAllTransaction)

module.exports = router
