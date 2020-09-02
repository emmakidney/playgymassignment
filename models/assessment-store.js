'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const assessmentStore = {
  
  store: new JsonStore('./models/assessment-store.json', { allAssessments: [] }),
  collection: 'allAssessments',
  
  getAllAssessments(){
    return this.store.findAll(this.collection);
  },
  
  getAssessment(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
  removeRow(id, rowId) {
    const assessment = this.getAssessment(id);
    _.remove(assessment.rows, { id: rowId });
  },
  
  removeAssessment(id) {
    _.remove(this.allAssessments, { id: id});
  },
  
  addRow(id, row) {
    const assessment = this.getAssessment(id);
    assessment.rows.push(row);
  },
};

module.exports = assessmentStore;