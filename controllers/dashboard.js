"use strict";

const logger = require('../utils/logger');
const analytics = require('../utils/analytics.js');
const assessmentStore = require('../models/assessment-store');
const userStore = require('../models/user-store');
const accounts = require ('./accounts.js');
const uuid = require('uuid');

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const assessmentId = request.params.id;
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "User Dashboard",
      user: userStore.getUserById(loggedInUser.id),
      assessment: assessmentStore.getAssessment(assessmentId),
      bmi: analytics.bmi(loggedInUser.id, assessmentId),
      bmiCategory: analytics.bmiCategory(loggedInUser.id),
      isIdealWeight: analytics.isIdealWeight(loggedInUser.id)
    };
    logger.info('about to render ${userid}');
    response.render("dashboard", viewData);
  },
  
  deleteAssessment(request, response) {
    const assessmentId = request.params.id;
    logger.debug('Deleting Member ${assessmentId}');
    assessmentStore.removeAssessment(assessmentId);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;
