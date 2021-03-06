'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const assessmentStore = require('../models/assessment-store');

const userStore = {

  store: new JsonStore('./models/user-store.json', { users: [] }),
  collection: 'users',

  getAllUsers() {
    return this.store.findAll(this.collection);
  },

  addUser(user) {
    this.store.add(this.collection, user);
    this.store.save();
  },

  getUserById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
  
  bmi(id, assessmentId) {
    const user = userStore.getUserById(id);
    const assessment = assessmentStore.getUserAssessments(assessmentId);
    if (assessment.length === 0) {
      const bmi = user.startingWeight / ((user.height / 100) * (user.height / 100));
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
  
  isIdealWeight(userid) {
    const user = userStore.getUserById(userid);
    const assessment = assessmentStore.getUserAssessments(userid);
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
      isIdealWeight = assessment[assessment.length - 1].weight <= idealWeight + 0.2;
    }
    return isIdealWeight;
  },
  
};

module.exports = userStore;