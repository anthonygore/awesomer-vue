const fs = require('fs');

function getCategories(max) {
  let categories = [];
  let minLevel;
  let regexp = /#(#)* /;
  file.split('\n').slice(0, max).reverse().forEach((line, number) => {
    if (regexp.exec(line)) {
      level = line.match(/#/g).length;
      if (!minLevel) {
        minLevel = level + 1;
      }
      if (level < minLevel && level >= 1) {
        categories.push(line);
        minLevel = level;
      }
    }
  });
  return categories.reverse().map(cat => { let arr = cat.split(/# /); return arr[arr.length - 1]});
}

const regexp = /\[.*\]\(.*\)/g;
const file = fs.readFileSync('./README.md', 'utf8');

module.exports = [];

file.slice(file.indexOf('# Resources')).split('\n').forEach((line, number) => {
  if (regexp.exec(line)) {
    module.exports.push(
      {
        categories: getCategories(number),
        link: line.split(' - ')[1],
        description: line.split(' - ')[2]
      }
    );
  }
});
