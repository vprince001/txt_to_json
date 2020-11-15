const fs = require('fs');
const {ES} = require('./src/constants');
const {getStartPoints, getHeaders, formatDataInArray, getData, getRequiredData} = require('./src/lib');

const main = function (params) {
  const data = getData(params, fs);
  const splittedHeaderLine = data[0].split(ES);
  const startPoints = getStartPoints(splittedHeaderLine);
  const headers = getHeaders(data[0]);
  const requiredData = getRequiredData(params, data);
  return formatDataInArray(requiredData, startPoints, headers);
};

module.exports = main;
