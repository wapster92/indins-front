function getType(item) {
  if (typeof item === 'number' && isNaN(item)) return 'NaN';
  return ({}).toString.call(item).match(/\s([a-zA-Z]+)/)[1];
}

function getObjectField(item, query) {
  const type = getType(item);
  if (type !== 'Object') return;

  let queryType = getType(query);
  let queryParts;

  if (queryType !== 'String' && queryType !== 'Array') {
    return;
  } else if (queryType === 'String') {
    queryParts = query.split('.');
  } else if (queryType === 'Array') {
    queryParts = query;
  }

  if (queryParts.length < 2) return item[queryParts[0]];

  return getObjectField(item[queryParts[0]], queryParts.slice(1));
}

function setObjectField(item, query, value, force) {
  const type = getType(item);
  if (type !== 'Object') return false;
  const queryType = getType(query);
  if (queryType !== 'String' && queryType !== 'Array') return false;

  const queryParts = queryType === 'Array'
    ? query
    : query.split('.');

  if (queryParts.length === 0) return false;
  let currentQuery;
  let currentItem = item;
  while (currentItem || force) {
    currentQuery = queryParts.splice(0, 1);
    if (queryParts.length === 0) {
      currentItem[currentQuery] = value;
      return true;
    }

    let nextItem = currentItem[currentQuery];

    if (getType(nextItem) !== 'Object') {
      if (!force) return false;
      currentItem[currentQuery] = {};
      nextItem = currentItem[currentQuery];
    }

    currentItem = nextItem;
  }
  return false;
}

function findArray(item, query) {
  const type = getType(item);
  if (type !== 'Object') return null;

  let queryType = getType(query);
  let queryParts;

  if (queryType !== 'String' && queryType !== 'Array') {
    return;
  } else if (queryType === 'String') {
    queryParts = query.split('.');
  } else if (queryType === 'Array') {
    queryParts = query;
  }

  if (queryParts.length < 2) return {item: item[queryParts[0]]};
  let currentItem = item[queryParts[0]];
  if (getType(currentItem) === 'Array') {
    return {item: currentItem, query: queryParts.slice(1)};
  }
  return findArray(item[queryParts[0]], queryParts.slice(1));
}

function contrastTextColor(color) {
  let red, green, blue;
  if (color.match("rgb")) {
    let colorParts = color.split(",");
    colorParts = colorParts.map(part => +part.replace(/\D/g, ""));
    red = colorParts[0];
    green = colorParts[1];
    blue = colorParts[2];
  } else {
    red = parseInt(color.slice(1, 3), 16);
    green = parseInt(color.slice(3, 5), 16);
    blue = parseInt(color.slice(5), 16);
  }
  if ((red * 0.299 + green * 0.587 + blue * 0.114) > 186) {
    return "#000000";
  }
  return "#ffffff";
}

function makeHash(length) {
  const result = [];
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random()
      * charactersLength)));
  }
  return result.join('');
}

export {
  getObjectField,
  setObjectField,
  findArray,
  getType,
  contrastTextColor,
  makeHash,
}