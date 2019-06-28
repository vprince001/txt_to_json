const fs = require("fs");
const { CR, NL, WS, ES, FORMAT } = require("./constants.js");
const { addEndPoint, getObject } = require("./lib.js");

const getHeadersAndStartPoints = function(data) {
  const line = data[0].split(ES);
  const startPoints = [0];
  const headers = [];
  let header = ES;

  line.forEach((char, index) => {
    const isNotSpace = char != WS;
    const isNotCR = char != CR;
    const isSpace = char == WS;
    const nextIsNotSpace = line[index + 1] != WS;
    const isCR = char == CR;
    const isPreviousNOtSpace = line[index - 1] != WS;

    if (isNotSpace && isNotCR) {
      return (header += char);
    }

    if (isSpace && nextIsNotSpace) {
      startPoints.push(index + 1);
      headers.push(header);
      return (header = ES);
    }

    if (isCR && isPreviousNOtSpace) {
      headers.push(header);
      header = ES;
    }
  });
  startPoints.push(addEndPoint(data));
  return { headers, startPoints };
};

const formatDataInArray = function(data, startPoints, headers) {
  let finalResult = [];
  data = data.slice(1);

  data.forEach(line => {
    finalResult.push(getObject(line, headers, startPoints));
  });
  return finalResult;
};

const txtToJson = function(filePath) {
  const data = fs.readFileSync(filePath, FORMAT).split(NL);
  const { headers, startPoints } = getHeadersAndStartPoints(data);
  const finalResult = formatDataInArray(data, startPoints, headers);
  return finalResult;
};

module.exports = txtToJson;
