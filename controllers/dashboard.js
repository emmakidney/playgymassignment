"use strict";

const logger = require('../utils/logger');
const analytics = require('../utils/analytics');
const assessmentStore = require('../models/assessment-store');
const accounts = require ('./accounts.js');

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Assessment Dashboard",
      assessment: assessmentStore.getUserAssessments(loggedInUser.id),
    };
    logger.info('about to render', assessmentStore.getAllAssessments());
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
