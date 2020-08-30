'use strict';

const logger = require('../utils/logger');

const homer = {
  title: 'homer',
  rows: [
    { date: '01.06.2020',
 weight: '123.3',
 chest: '45.0',
 thigh: '12.5',
 upperarm: '23.3',
 waist: '32',
 hips: '38',
 trend: 'true', },
    ],
};

const bart = {
  title: 'bart',
  rows: [
    { date: '01.06.2020',
 weight: '120',
 chest: '43.0',
 thigh: '10.5',
 upperarm: '20.3',
 waist: '30',
 hips: '35',
 trend: 'true', },
    ],
};

const allAssessments = [homer, bart];

module.exports = allAssessments;