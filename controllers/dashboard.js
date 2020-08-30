"use strict";

const logger = require('../utils/logger');
const assessment = require('../models/assessment-store.js');

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Assessment Dashboard",
      assessment: allAssessments
    };
    logger.info('about to render', allAssessments);
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;
