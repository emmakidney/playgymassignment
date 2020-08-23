"use strict";

const logger = require("../utils/logger");

const assessment1 = { 
 date :'01/06/2020',
 weight: '123.3',
 chest: '45.0',
 thigh: '12.5',
 upperarm: '23.3',
 waist: '32',
 hips: '38',
 trend: 'true',
}

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Assessment Dashboard",
      assessment: assessment1
    };
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;
