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
};

module.exports = assessment;