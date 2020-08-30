'use strict';

const logger = require('..utils/logger');
const allAssessments = require('../models/assessment-store.js');

const assessment = {
  index(request, response) {
    const viewData = {
      title: 'Assessment',
    };
    response.render('assessment', viewData);
  },
};

module.exports = assessment;