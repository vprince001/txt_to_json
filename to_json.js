const fs = require("fs");
const readline = require("readline");
let finalResult = [];
let isFirstLine = true;
let headers = [];
let startPoints = [0];
const readStream = fs.createReadStream("./data_file.txt");

const readInterface = readline.createInterface({
  input: readStream
});

readInterface
  .on("line", function(line) {
    if (isFirstLine) {
      headers = line.split(" ");
      let count = 0;
      for (let index = 0; index < headers.length; index++) {
        let element = headers[index];
        if (element == "") {
          count++;
          if (headers[index + 1] != "") {
            count++;
            startPoints.push(count);
          }
        } else {
          count += element.length;
        }
      }
      headers = headers.filter(element => element);
      isFirstLine = false;
    } else {
      let obj = {};
      headers.forEach((element, index) => {
        obj[element] = line
          .substring(startPoints[index], startPoints[index + 1])
          .trim();
      });
      finalResult.push(obj);
    }
  })
  .on("close", function() {
    fs.writeFileSync("./output.json", JSON.stringify(finalResult));
    readInterface.close();
  });
