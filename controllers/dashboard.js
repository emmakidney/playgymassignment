"use strict";

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store');

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Assessment Dashboard",
      assessment: assessmentStore.getAllAssessments(),
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
