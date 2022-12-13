const adminTransactionHistoryController = require("../controllers/adminTransactionHistoryController")
const express = require("express")

const router = express.Router()

router.get("/get", adminTransactionHistoryController.test)

module.exports = router
