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
      return Math.round(bmi * 100) / 100;
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
    const minHeight = 1;
    let idealWeight = 45.5;
    const metersToInches = 39.37;
    const kgPerExtraInch = 2.3;
    let isIdealWeight = "";
    
    if (member.gender === ("Male" || "male" || "m")) {
      idealWeight = 50;
    } else {
      idealWeight = 45.5;
    }
    if (metersToInches * (user.height / 100) > mineHeight)
  }
}