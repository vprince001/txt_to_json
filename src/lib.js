const { CR, WS, ES, NL } = require("./constants");

const getTrimmedValue = function(line, startPoints, index) {
  return line.substring(startPoints[index], startPoints[index + 1]).trim();
};

const getObject = function(line, headers, startPoints) {
  return headers.reduce(function(acc, currentElement, index) {
    acc[currentElement] = getTrimmedValue(line, startPoints, index);
    return acc;
  }, {});
};

const formatDataInArray = function(data, startPoints, headers) {
  let finalResult = [];
  data = data.slice(1);

  data.forEach(line => {
    if (line == ES) {
      return;
    }
    finalResult.push(getObject(line, headers, startPoints));
  });
  return finalResult;
};

const pushHeader = function(isWS, isNextNotWS, isLastChar, headers, header) {
  if ((isWS && isNextNotWS) || isLastChar) {
    if (header != "") {
      headers.push(header);
      header = ES;
    }
  }
  return { headers, header };
};

const addCharToHeader = function(char, header) {
  if (char != WS && char != CR && char != NL) {
    header += char;
  }
  return header;
};

const getHeaders = function(headerLine) {
  const splittedHeaderLine = headerLine.split(ES);
  const headerLineLength = headerLine.length;
  let headers = [];
  let header = ES;

  splittedHeaderLine.forEach((char, index) => {
    const isWS = char == WS;
    const nextChar = splittedHeaderLine[index + 1];
    const isNextNotWS = nextChar != WS;
    const isLastChar = index == headerLineLength - 1;

    header = addCharToHeader(char, header);
    const head = pushHeader(isWS, isNextNotWS, isLastChar, headers, header);
    headers = head.headers;
    header = head.header;
  });
  return headers;
};

const getStartPoints = function(splittedHeaderLine) {
  let startPoints = [0];
  splittedHeaderLine.forEach((char, index) => {
    const isSpace = char == WS;
    const nextIsNotSpace = splittedHeaderLine[index + 1] != WS;

    if (isSpace && nextIsNotSpace) {
      startPoints.push(index + 1);
    }
  });
  return startPoints;
};

module.exports = {
  getStartPoints,
  getHeaders,
  addCharToHeader,
  pushHeader,
  formatDataInArray,
  getObject,
  getTrimmedValue
};
