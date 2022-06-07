export default ({ app }, inject) => {

  const fieldResolver = {
    isObject(obj){
      return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
    },
    getFieldObj(item, field) {
      const keys = field.split('.');
      if (!keys[1]) {
        return item?.[field] || {};
      }
      const lastKey = keys.pop();
      const obj = keys.reduce((o, i) => o[i] || {}, this.isObject(item) ? item : {})[lastKey];
      return this.isObject(obj) ? obj : {};
    },
    getFieldParent(item, field) {
      const keys = field.split('.');
      if (!keys[1]) {
        return this.isObject(item) ? item : {};
      }
      keys.pop();
      return keys.reduce((o, i) => o[i] || {}, this.isObject(item) ? item : {});
    },
    getFieldParentId(item, field) {
      return this.getFieldParent(item, field)?.id || null;
    },
    getFieldKey(item, field) {
      return field.split('.').pop();
    },
    getFieldValue(item, field) {
      const keys = field.split('.');
      if (!keys[1]) {
        return item?.[field]?.toString();
      }
      const lastKey = keys.pop();
      return keys.reduce((o, i) => o[i] || {}, this.isObject(item) ? item : {})[lastKey]?.toString();
    },
    setFieldValue(field, val) {
      const obj = {};
      const keys = field.split('.');
      if (!keys[1]) {
        obj[field] = val;
      } else {
        const lastKey = keys.pop();
        // eslint-disable-next-line no-return-assign,no-param-reassign
        keys.reduce((o, i) => o[i] = o[i] || {}, obj)[lastKey] = val;
      }
      return obj;
    },
  };
  
  inject('fieldResolver', fieldResolver);
}