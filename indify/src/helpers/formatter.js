import moment from "moment/moment";

moment.locale('ru');

const formatPhone = (phone, invalid) => {
  if (/^(\d){7}$/ig.test(phone)) {
    return phone.replace(/^(\d{3})(\d{2})(\d{2})$/,"$1-$2-$3");
  }
  if(/^8(\d){10}$/ig.test(phone)) {
    return phone.replace(/^8(\d{3})(\d{3})(\d{2})(\d{2})$/,"8($1)$2-$3-$4");
  }
  if( /^\+?7(\d){10}/ig.test(phone)) {
    return phone.replace(/^\+?7(\d{3})(\d{3})(\d{2})(\d{2})$/,"+7 ($1) $2-$3-$4");
  }
  return invalid || '';
};
const formatDate = (value, format, invalid) => {
  if (!value) {
    return '';
  }
  let date = moment(value);
  if (!date.isValid()) {
    return invalid || '';
  }
  return date.format(format || 'DD.MM.YY');
};
const formatTime = (value, format, invalid) => formatDate(value, format || 'HH:mm', invalid);
const formatDateTime = (value, format, invalid) => formatDate(value, format || 'HH:mm DD.MM.YY', invalid);

const formatDateTimeFromNow = (value, invalid) => {
  let date = moment(value);
  if (!date.isValid()) {
    return invalid
  }
  if (date.isBefore(moment().subtract(1, 'days'))) {
    return formatDateTime(value, 'DD.MM.YY HH:mm', invalid);
  }
  let result = date.fromNow();
  return result.charAt(0).toUpperCase() + result.slice(1);
};
const formatNumber = number => new Intl.NumberFormat('ru-RU').format(number);
const formatUCFirst = text => text.charAt(0).toUpperCase() + text.slice(1);

export default {formatDateTime, formatDate, formatTime, formatPhone, formatNumber, formatDateTimeFromNow, formatUCFirst}
