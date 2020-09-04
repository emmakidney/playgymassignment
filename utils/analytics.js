'use strict';

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store');
const userStore = require('../models/user-store');
const accounts = require ('./accounts.js');
const uuid = require('uuid');

const analytics = {
  
  bmi(id) {
    const user = userStore.getUserById(id);
    const assessment = assessmentStore.getUserAssessments(id);
    if (assessment.length === 0) {
      const bmi = user.startingWeight / ((user.height / 100) * (user.height /100));
      return Math.round(bmi * 100) / 100;
    } else {
      const bmi = assessment[assessment.length - 1].weight/ ((user.height / 100) * (user.height / 100));
      return Math.round
    }
  }
}