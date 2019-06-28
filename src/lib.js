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

const pushHeaderInHeaders = function(char, line, index, headers, header) {
  const isCR = char == CR;
  const isPreviousNOtSpace = line[index - 1] != WS;
  if (isCR && isPreviousNOtSpace) {
    headers.push(header);
    header = ES;
  }
  return { headers: headers, header: header };
};

module.exports = {
  getObject,
  getTrimmedValue,
  addEndPoint,
  addCharToHeader,
  pushHeaderInHeaders
};
