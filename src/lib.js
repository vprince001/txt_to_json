const { CR, WS, ES } = require("./constants");

const getObject = function(line, headers, startPoints) {
  return headers.reduce(function(acc, currentElement, index) {
    acc[currentElement] = getTrimmedValue(line, startPoints, index);
    return acc;
  }, {});
};

const getTrimmedValue = function(line, startPoints, index) {
  return line.substring(startPoints[index], startPoints[index + 1]).trim();
};

const addEndPoint = function(data) {
  const lengths = [];
  data.forEach(line => {
    lengths.push(line.length);
  });
  return Math.max(...lengths);
};

const addCharToHeader = function(char, header) {
  const isNotSpace = char != WS;
  const isNotCR = char != CR;
  if (isNotSpace && isNotCR) {
    header += char;
  }
  return header;
};

const pushHeaderInHeaders = function(
  char,
  splittedHeadersLine,
  index,
  headers,
  header
) {
  const isCR = char == CR;
  const isPreviousNotSpace = splittedHeadersLine[index - 1] != WS;
  if (isCR && isPreviousNotSpace) {
    headers.push(header);
    header = ES;
  }
  return { headers: headers, header: header };
};

const formatDataInArray = function(data, startPoints, headers) {
  let finalResult = [];
  data = data.slice(1);

  data.forEach(line => {
    finalResult.push(getObject(line, headers, startPoints));
  });
  return finalResult;
};

module.exports = {
  getObject,
  getTrimmedValue,
  addEndPoint,
  addCharToHeader,
  pushHeaderInHeaders,
  formatDataInArray
};
