'use strict';

const assessmentStore = {
  
  allAssessments: require('./assessment-store.json').allAssessments,
  
  getAllAssessments(){
    return this.allAssessments;
  },
  
  getAssessment(id) {
    let foundAssessment = null;
    for (let assessment of this.allAssessments) {
      if(id == assessment.id) {
        foundAssessment = assessment;
      }
    }
    
    return foundAssessment;
  },
};

module.exports = assessmentStore;