'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const assessmentStore = {
  
  store: new JsonStore('./models/assessment-store.json', { assessments: [] }),
  collection: 'assessments',
  
  getAllAssessments(){
   return this.store.findAll(this.collection);
  },
  
  getAssessment(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
  removeRow(id, rowId) {
    const assessment = this.getAssessment(id);
    const rows = assessment.rows;
    _.remove(rows, { id: rowId});
    this.store.save();
  },
  
  removeAssessment(id) {
    const assessment = this.getAssessment(id);
    this.store.remove(this.collection, assessment);
    this.store.save();
  },
  
  addRow(id, row) {
    const assessment = this.getAssessment(id);
    assessment.rows.push(row);
    this.store.save();
  },
  
  getUserAssessments(userid) {
    return this.store.findBy(this.collection, { userid: userid});
  },
};

module.exports = assessmentStore;