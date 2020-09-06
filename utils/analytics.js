'use strict';

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store');
const userStore = require('../models/user-store');
const accounts = require ('../controllers/accounts.js');
const uuid = require('uuid');

const analytics = {

  
  trend(id) {
    const user = userStore.getUserById(id);
    const assessment = assessmentStore.getUserAssessments(id);
    let trend = "";
    if (assessment.length > 1) {
      trend =assessment[assessment.length - 2].weight > assessment;
    }
    return trend;
  }
};

module.exports = analytics;