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
  
  deleteEntry(request, response) {
    const assessmentId = request.params.id;
    const entryId = request.params.entryid;
    logger.debug('Deleting Entry ${entryId} from Member ${assessmentId}');
    assessmentStore.removeEntry(assessmentId, entryId);
    response.redirect('/assessment/' + assessmentId);
  },
};

module.exports = assessment;