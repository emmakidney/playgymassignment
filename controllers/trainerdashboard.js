"use strict";

const logger = require('../utils/logger');
const analytics = require('../utils/analytics.js');
const assessmentStore = require('../models/assessment-store');
const accounts = require ('./accounts.js');
const trainerStore = require('../models/trainer-store');

const trainerdashboard = {
  index(request, response) {
    logger.info("trainer member dashboard rendering");
    const loggedInTrainer = accounts.getCurrentTrainer(request);
    const user= userStore.getUserById(request.params.id);
    const assessments = assessmentStore.getAllAssessments(user.id);
    const viewData = {
      title: "Trainer Dashboard",
      trainer: loggedInTrainer,
      user: user,
      bmi: userStore.getBMI(user),
      assessments: assessments
    };
    response.render("trainerdashboard", viewData);
  },