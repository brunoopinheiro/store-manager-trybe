const snakeize = require('snakeize');

const createUpdateArray = (dataObject) => Object.keys(snakeize(dataObject))
  .map((key) => `${key} = ?`).join(', ');

module.exports = createUpdateArray;