const fs = require("fs");
const { NL, ES, FORMAT } = require("./src/constants");
const { getStartPoints, getHeaders, formatDataInArray } = require("./src/lib");

const main = function(filePath) {
  const data = fs.readFileSync(filePath, FORMAT).split(NL);
  const splittedHeaderLine = data[0].split(ES);
  const startPoints = getStartPoints(splittedHeaderLine);
  const headers = getHeaders(data[0]);
  const finalResult = formatDataInArray(data, startPoints, headers);
  return finalResult;
};

module.exports = main;
