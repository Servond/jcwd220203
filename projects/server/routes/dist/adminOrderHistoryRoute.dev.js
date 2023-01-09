"use strict";

var adminOrderHistoryController = require("../controllers/adminOrderHistoryController");

var express = require("express");

var router = express.Router();
router.get("/get", adminOrderHistoryController.getOrder);
router.get("/get2", adminOrderHistoryController.getByWarehouseId);
router.get("/get3", adminOrderHistoryController.getTransactionList);
router.get("/get4", adminOrderHistoryController.getReport);
router.get("/findWarehouse", adminOrderHistoryController.findWarehouse);
router.get("/getId/:id", adminOrderHistoryController.getById);
module.exports = router;