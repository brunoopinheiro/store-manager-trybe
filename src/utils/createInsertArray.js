const snakeize = require('snakeize');

function createInsertArrays(insertObject) {
  const columns = Object.keys(snakeize(insertObject)).join(', ');
  const placeholders = Object.keys(insertObject).map((_key) => ('?')).join(', ');
  return [columns, placeholders];
}

module.exports = createInsertArrays;