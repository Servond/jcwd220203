"use strict";

var express = require("express");

var router = express.Router();

var salesReportController = require("../controllers/salesReportController");

router.get("/get", salesReportController.getReport);
router.get("/get2", salesReportController.getReportWithQuery);
router.get("/findWarehouse", salesReportController.findWarehouse);
module.exports = router;