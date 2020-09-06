"use strict";

const logger = require('../utils/logger');
const analytics = require('../utils/analytics.js');
const assessmentStore = require('../models/assessment-store');
const accounts = require ('./accounts.js');
const trainerStore = require('../models/trainer-store');
const userStore = require('../models/user-store');

const trainerdashboard = {
  index(request, response) {
    logger.info("trainer member dashboard rendering");
    const loggedInTrainer = accounts.getCurrentTrainer(request);
    const trainer = trainerStore.getTrainerById(request.params.id);
    const assessments = assessmentStore.getAllAssessments;
    const users = userStore.getAllUsers;
    const viewData = {
      title: "Trainer Dashboard",
      assessments: assessmentStore.getAllAssessments(),
      users: userStore.getAllUsers(),
    };
    response.render("trainerdashboard", viewData);
  },
};
  
  module.exports = trainerdashboard;