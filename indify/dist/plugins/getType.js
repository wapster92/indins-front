export default ({app: {$config}}, inject) => {
  function getType(item) {
    if (typeof item === 'number' && isNaN(item)) return 'NaN';
    return ({}).toString.call(item).match(/\s([a-zA-Z]+)/)[1];
  }

  inject('getType', getType);
}