const fs = require('fs');

function getCategories(max) {
  let categories = [];
  let minLevel;
  let regexp = /#(#)* /;
  lines.slice(0, max).reverse().forEach((line, number) => {
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

const regexp = /\[.*\]\(http.*\)/g;
const file = fs.readFileSync('./README.md', 'utf8');
const lines = file.slice(file.indexOf('# Resources')).split('\n');

module.exports.data = [];

lines.forEach((line, number) => {
  if (regexp.exec(line)) {
    let link = (line.match(regexp)[0] || '').split(')')[0] + ')';
    let title = (link.match(/\[.*\]/) || ['[]'])[0].slice(1, -1);
    let url = (link.match(/\(http.*\)/) || ['()'])[0].slice(1, -1);

    module.exports.data.push(
      {
        categories: getCategories(number),
        title,
        url,
        description: line.split(') - ')[1] || null
      }
    );
  }
});

function createCat(data, cats) {
  if (cats.length) {
    let cat = cats.shift();
    let d = data.find(d => d.title === cat);
    if (!d) {
      let obj = { title: cat, items: [] };
      data.push(obj);
      d = obj;
    }
    createCat(d.items, cats);
  }
}

module.exports.categories = [];

module.exports.data.forEach(item => { createCat(module.exports.categories, item.categories.slice(0)); });


//fs.writeFile('./sample.json', JSON.stringify(module.exports.data));
