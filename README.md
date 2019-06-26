<h1 align="center">txt-file-to-json</h1>

<div align="center">

Reads a txt file having a table and returns an array of obects. In which each object consists of all headers as keys and there data as values.

</div>

## Installation

```
npm i --save txt-file-to-json
```

## Usage

`txt-file-to-json` support CommonJS.

### In module system

```javascript
const txtToJson = require("txt-file-to-json");
const dataInJSON = txtToJson("./filePath.txt");
```

#### Sample input (txt data) :

```
FIRST_NAME     LAST_NAME        NUMBER               EMAIL                        ADDRESS
Debra          Burks            880012XXXX           debra.burks@yahoo.com        9273 Thome Ave., Orchard Park, NY - 14127
Kasha          Todd             NULL                 kasha.todd@yahoo.com         910, Vine Street, Campbell, CA - 95008
Tameka         Fisher           880111XXXX           tameka.fisher@yahoo.com      7693 Honey Creek St., Redondo Beach, CA - 90278
Daryl          Spence           990015XXXX           NULL                         988 Pearl Lane!!! (Uniondale), NY - 11553
Charolette     Rice             720012XXXX           charolette.rice@msn.com      107 ~ River Dr. `Sacramento`, "CA"      95820
```

#### Sample output (json data) :

```
[
  {
    FIRST_NAME: 'Debra',
    LAST_NAME: 'Burks',
    NUMBER: '880012XXXX',
    EMAIL: 'debra.burks@yahoo.com',
    ADDRESS: '9273 Thome Ave., Orchard Park, NY - 14127'
  },
  {
    FIRST_NAME: 'Kasha',
    LAST_NAME: 'Todd',
    NUMBER: 'NULL',
    EMAIL: 'kasha.todd@yahoo.com',
    ADDRESS: '910, Vine Street, Campbell, CA - 95008'
  },
  {
    FIRST_NAME: 'Tameka',
    LAST_NAME: 'Fisher',
    NUMBER: '880111XXXX',
    EMAIL: 'tameka.fisher@yahoo.com',
    ADDRESS: '7693 Honey Creek St., Redondo Beach, CA - 90278'
  },
  {
    FIRST_NAME: 'Daryl',
    LAST_NAME: 'Spence',
    NUMBER: '990015XXXX',
    EMAIL: 'NULL',
    ADDRESS: '988 Pearl Lane!!! (Uniondale), NY - 11553'
  },
  {
    FIRST_NAME: 'Charolette',
    LAST_NAME: 'Rice',
    NUMBER: '720012XXXX',
    EMAIL: 'charolette.rice@msn.com',
    ADDRESS: '107 ~ River Dr. `Sacramento`, "CA"      95820'
  }
]
```
