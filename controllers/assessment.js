'use strict';

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store');

const assessment = {
  index(request, response) {
    const assessmentId = request.params.id;
    logger.debug('Assessment id = ' + assessmentId);
    const viewData = {
      title: 'Assessment',
      assessment: assessmentStore.getAssessment(assessmentId),
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