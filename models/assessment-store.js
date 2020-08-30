
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
  
  removeEntry(id, entryId) {
    const assessment = this.getAssessment(id);
  
    //TO DO: remove the entry with id entryId from the Assessment
  },
};

module.exports = assessmentStore;