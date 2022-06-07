export const getType = function(item) {
  if (typeof item === 'number' && isNaN(item)) return 'NaN';
  return ({}).toString.call(item).match(/\s([a-zA-Z]+)/)[1];
}
