"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const assessment = require("./controllers/assessment.js");
const accounts = require("./controllers/accounts.js");
const analytics = require("./utils/analytics.js");


router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get("/dashboard", dashboard.index);
router.get("/about", about.index);
router.get("/assessment/:id", assessment.index);
router.get("/assessment/:id/deleterow/:rowid", assessment.deleteRow);
router.get("/dashboard/deleteassessment/:id", dashboard.deleteAssessment);
router.post("/assessment/:id/addrow", assessment.addRow);
router.get("/trainerdashboard/:id", trainerdashboard.index);


module.exports = router;
