const cloneObject = obj => {
  const clone = {};
  for(let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }
  return clone;
};
const deepClone = element => {
  if (element === null || element === undefined) {
    return element;
  }
  switch (element.constructor) {
    case Object:
      return cloneObject(element);
    case Array:
      return element.map(item => deepClone(item));
    case Function:
      return function() { return element.apply(this, arguments)};
    case Date:
      return new Date(element.getTime());
    default:
      return element;
  }
};

export default deepClone
