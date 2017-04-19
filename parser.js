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

let data = [];

function hrefTransform(cat) {
  return cat.replace(/\W/g, '_').replace(/_+/g,"_").toLowerCase();
}

lines.forEach((line, number) => {
  if (regexp.exec(line)) {
    let link = (line.match(regexp)[0] || '').split(')')[0] + ')';
    let title = (link.match(/\[.*\]/) || ['[]'])[0].slice(1, -1);
    let url = (link.match(/\(http.*\)/) || ['()'])[0].slice(1, -1);
    let categories = getCategories(number);
    let href = categories.map(cat => hrefTransform(cat)).join('/');
    data.push(
      {
        categories,
        title,
        url,
        description: line.split(') - ')[1] || null,
        href
      }
    );
  }
});

function createCat(data, cats, depth) {

  let cat = cats[depth];
  depth++;
  let d = data.find(d => d.title === cat);
  if (!d) {
    let obj = { title: cat, items: [] };
    obj.href = '/' + cats.slice(0, depth).map(cat => hrefTransform(cat)).join('/');
    data.push(obj);
    d = obj;
  }
  if (depth < cats.length) {
    createCat(d.items, cats, depth);
  }
}

let categories = [];

data.forEach(item => { createCat(categories, item.categories, 0); });

let routes = [];

data.forEach(item => {
  let paths = [];
  item.categories.forEach((cat, i) => {
    let str = '';
    if (i > 0) {
      str = paths[i - 1];
    }
    paths[i] = str + '/' + hrefTransform(cat);
    if (!routes.find(route => route.path === paths[i])) {
      routes.push({ path: paths[i] });
    }
  });
});

fs.writeFileSync('./assets/json/data.json', JSON.stringify(data));
fs.writeFileSync('./assets/json/categories.json', JSON.stringify(categories));
fs.writeFileSync('./routes.json', JSON.stringify(routes));

