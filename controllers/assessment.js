'use strict';

const logger = require('../utils/logger');
const allAssessments = require('../models/assessment-store.js');

const assessment = {
  index(request, response) {
    const assessmentId = request.params.id;
    logger.info('Assessment id = ' + assessmentId);
    const viewData = {
      title: 'Assessment',
    };
    response.render('assessment', viewData);
  },
};

module.exports = assessment;