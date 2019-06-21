<h1 align="center">txtToJson</h1>

<div align="center">

Reads a txt file having a table and returns an array of obects. In which each object consists of all headers as keys and there data as values.

</div>

## Installation

```sh
yarn add txt_to_json
```

or

```sh
npm i --save txt_to_json
```

## Usage

`txt_to_json` support CommonJS.

### In module system

```javascript
const txt_to_json = require("txt_to_json");
const dataInJSON = txt_to_json("./filePath.txt");
```
