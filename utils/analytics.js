'use strict';

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store');
const userStore = require('../models/user-store');
const accounts = require ('../controllers/accounts.js');
const uuid = require('uuid');

const analytics = {
  
  index(request, response) {
    const assessmentId = request.params.id;
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug('Assessment id = ' + assessmentId);
    const viewData = {
      title: 'Assessment',
      assessment: assessmentStore.getAssessment(assessmentId),
      bmi: this.bmi(loggedInUser.id),
      bmiCategory: this.bmiCategory(loggedInUser.id),
    };
    response.render('analytics', viewData);
  },
  
  bmi(id) {
    const user = userStore.getUserById(id);
    const assessment = assessmentStore.getUserAssessments(id);
    if (assessment.length === 0) {
      const bmi = Math.round((Number('user.startingWeight') / (Number('user.height') / 100) * (Number('user.height') / 100)));
      return bmi;
    } else {
      const bmi = ((Number('assessment[assessment.length - 1].weight')/ (Number('user.height') / 100) * (Number('user.height') / 100)));
      return Math.round(Number('bmi'));
    }
  },
  
  bmiCategory(id) {
    const user = userStore.getUserById(id);
    const assessment = assessmentStore.getUserAssessments(id);
    const bmi = this.bmi(id);
    
    if (bmi < 16) {
      return "SEVERELY UNDERWEIGHT";
    }
    if (bmi >= 16 && bmi < 18.5) {
      return "UNDERWEIGHT";
    }
    if (bmi >= 18.5 && bmi < 25.0) {
      return "NORMAL";
    }
    if (bmi >= 25.0 && bmi < 30.0) {
      return "OVERWEIGHT";
    }
    if (bmi >= 30.0 && bmi < 35.0) {
      return "MODERATELY OBESE";
    }
    if (bmi >= 35.0) {
      return "SEVERELY OBESE";
    }
  },
  
  isIdealWeight(id) {
    const user = userStore.getUserById(id);
    const assessment = assessmentStore.getUserAssessments(id);
    const minHeight = 60;
    let idealWeight = 45.5;
    const metersToInches = 39.37;
    const kgPerExtraInch = 2.3;
    let isIdealWeight = "";
    
    if (user.gender === ("Male" || "male" || "m")) {
      idealWeight = 50;
    } else {
      idealWeight = 45.5;
    }
    if (metersToInches * (user.height / 100) > minHeight) {
      idealWeight += (metersToInches * (user.height / 100) - 60) * kgPerExtraInch;
    }
    if (assessment.length === 0) {
      isIdealWeight = user.startingWeight <= idealWeight + 0.2;
    } else {
      isIdealWeight = assessment[assessment.lenght -1].weight;
    }
    return isIdealWeight;
  },
  
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