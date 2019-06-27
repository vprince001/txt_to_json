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

module.exports = { getObject, getTrimmedValue, addEndPoint };
