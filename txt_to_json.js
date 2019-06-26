const fs = require("fs");
const { CR, NL, WS, ES, FORMAT } = require("./constants.js");

const getHeadersAndStartPoints = function(data) {
  const line = data[0].split(ES);
  const startPoints = [0];
  const headers = [];
  let header = ES;

  line.forEach((char, index) => {
    const charIsSpace = char == WS;
    const nextCharIsNotSpace = line[index + 1] != WS;
    const charIsNotSpace = char != WS;
    const charIsNotCR = char != CR;
    const charIsCR = char == CR;
    const previousCharIsNOtSpace = line[index - 1] != WS;

    if (charIsNotSpace && charIsNotCR) {
      return (header += char);
    }
    if (charIsSpace && nextCharIsNotSpace) {
      startPoints.push(index + 1);
      headers.push(header);
      return (header = ES);
    }
    if (charIsCR && previousCharIsNOtSpace) {
      headers.push(header);
      header = ES;
    }
  });
  startPoints.push(addEndPoint(data));
  return { headers, startPoints };
};

const addEndPoint = function(data) {
  const lengths = [];
  data.forEach(line => {
    lengths.push(line.length);
  });
  return Math.max(...lengths);
};

const formatDataInArray = function(data, startPoints, headers) {
  let finalResult = [];
  data = data.slice(1);

  data.forEach(line => {
    let obj = headers.reduce(function(acc, currentElement, index) {
      acc[currentElement] = line
        .substring(startPoints[index], startPoints[index + 1])
        .trim();
      return acc;
    }, {});
    finalResult.push(obj);
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
