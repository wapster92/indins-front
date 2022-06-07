export default ({ app }, inject) => {

  function applyMask({mode, val, precision, delimiter, currencySign}) {
    switch(mode) {
      case 'phone':
        return applyPhoneMask({val});
      case 'integer':
        return applyIntegerMask({val});
      case 'positive-integer':
        return applyPositiveIntegerMask({val});
      case 'float':
        return applyFloatMask({val, precision, delimiter});
      case 'currency':
        return applyCurrencyMask({val, sign: currencySign, delimiter});
      case 'date':
        return applyDateMask({val});
      default:
        return val;
    }
  };
  inject('applyMask', applyMask);
  
  //--------------private functions ------------------------
  
  function applyPhoneMask({val}) {
    if (!val) return '';
    const clearedVal = applyPositiveIntegerMask({val}).split('');
    return clearedVal.reduce((phone, num, i) => {
      let v = phone;
      if (i === 0) {
        v += '+';
      }
      if (i === 1) {
        v += ' (';
      }
      if (i === 4) {
        v += ') ';
      }
      if (i === 7 || i === 9) {
        v += '-';
      }
      return v + num;
    }, '');
  };
  
  function applyIntegerMask({val}) {
    if (!val || val === '0') return '';
    return val.replace(/^\-\D/g, '');
  };

  function applyPositiveIntegerMask({val}) {
    if (!val || val === '0') return '';
    return val.replace(/\D/g, '');
  };
  
  function applyFloatMask({val, precision, delimiter}) {
    if (!val || val === '0') return '';
    let integerPart;
    let fractionalPart;
    let floatStr;
    if (val.includes(delimiter) || val.includes('.')) {
      const regexp = new RegExp(`[${delimiter}.]`);
      const arr = val.split(regexp);
      fractionalPart = applyPositiveIntegerMask({val: arr.at(-1)});
      arr.pop();
      integerPart = applyIntegerMask({val: arr.join('')});
      floatStr = `${integerPart}${delimiter}${fractionalPart}`;
    } else {
      floatStr = applyIntegerMask({val});
    }
    if (precision && floatStr) {
      const float = Number(floatStr.split(delimiter).join('.'));
      floatStr = float.toFixed(precision).split('.').join(delimiter);
    }
    return floatStr;
  };
  
  function applyCurrencyMask({val, sign, delimiter}) {
    if (!val || val === '0') return '';
    const clearedVal = applyFloatMask({val, precision: 2, delimiter});
    const arr = clearedVal.split(delimiter);
    const leftPart = arr[0].match(/(^\-)?\d{1,3}(?=(\d{3})*$)/g)?.join(' ') || 0;
    const rightPart = `${arr[1] || '00'} ${sign}`;
    return `${leftPart}${delimiter}${rightPart}`;
  };

  function applyDateMask({val = ''}) {
    if (val === '') return '';
    if (val.includes('-')) {
      return val.split(' ')[0].split('-').reverse().join('.');
    }
    const clearedVal = val.replace(/\D/g, '').split('');
    return clearedVal.reduce((date, num, i) => {
      let v = date;
      if (i === 2 || i === 4) {
        v += '.';
      }
      return v + num;
    }, '');
  };
}