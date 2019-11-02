const fs = require("fs");
const { ES } = require("./src/constants");
const { getStartPoints, getHeaders, formatDataInArray, getData } = require("./src/lib");

const main = function (params) {
  const data = getData(params, fs);
  const splittedHeaderLine = data[0].split(ES);
  const startPoints = getStartPoints(splittedHeaderLine);
  const headers = getHeaders(data[0]);
  const finalResult = formatDataInArray(data, startPoints, headers);
  return finalResult;
};

module.exports = main;
