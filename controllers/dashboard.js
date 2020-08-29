"use strict";

const logger = require('../utils/logger');
const homer = require('../models/assessment-store.js');

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Assessment Dashboard",
      assessment: homer,
    };
    logger.info('about to render', homer);
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;
