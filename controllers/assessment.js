'use strict';

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store');
const uuid = require('uuid');
const analytics = require('../utils/analytics.js');
const accounts = require('./accounts.js');
const userStore = require('../models/user-store');

const assessment = {
  index(request, response) {
    logger.debug('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    
    const viewData = {
      title: 'Assessment',
      user: userStore.getUserById(loggedInUser.id),
      assessment: assessmentStore.getUserAssessments(loggedInUser.id).reverse(),
      bmi: analytics.bmi(loggedInUser.id),
      bmiCategory: analytics.bmiCategory(loggedInUser.id),
      isIdealWeight: analytics.isIdealWeight(loggedInUser.id)
    };
    response.render('assessment', viewData);
  },
  
  deleteRow(request, response) {
    const assessmentId = request.params.id;
    const rowId = request.params.rowid;
    logger.debug('Deleting Row ${rowId} from Member ${assessmentId}');
    assessmentStore.removeRow(assessmentId, rowId);
    response.redirect('/assessment/' + assessmentId);
  },
  
  addRow(request, response) {
    const assessmentId = request.params.id;
    const assessment = assessmentStore.getAssessment(assessmentId);
    const newRow = {
      id: uuid.v1(),
      date : request.body.date,
      weight: request.body.weight,
      chest : request.body.chest,
      thigh : request.body.thigh,
      upperarm : request.body.upperarm,
      waist: request.body.waist,
      hips : request.body.hips,
      trend: request.body.trend,
      comment : request.body.comment,  
    };
    assessmentStore.addRow(assessmentId, newRow);
    response.redirect('/assessment/' + assessmentId);
  },
};

module.exports = assessment;