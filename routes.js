"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const assessment = require("./controllers/assessment.js");

router.get("/", dashboard.index);
router.get("/dashboard", dashboard.index);
router.get("/about", about.index);
router.get("/assessment/:id", assessment.index);
router.get("/assessment/:id/deleterow/:rowid", assessment.deleteRow);
router.get("/dashboard/deleteassessment/:id", dashboard.deleteAssessment);

router.post('/assessment/:id/addrow', assessment.addRow);
module.exports = router;
