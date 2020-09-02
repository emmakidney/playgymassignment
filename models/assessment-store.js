'use strict';

const _ = require('lodash');
const assessmentStore = {
  
  allAssessments: require('./assessment-store.json').allAssessments,
  
  getAllAssessments(){
    return this.allAssessments;
  },
  
  getAssessment(id) {
    return _.find(this.allAssessments, { id: id });
  },
  
  removeRow(id, rowId) {
    const assessment = this.getAssessment(id);
    _.remove(assessment.rows, { id: rowId });
  },
  
  removeAssessment(id) {
    _.remove(this.assessmentCollection, { id: id});
  },
};

module.exports = assessmentStore;