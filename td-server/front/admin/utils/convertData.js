import moment from 'moment';

const startWorkTime = 9;

const startTime = moment(`0${startWorkTime}:00:00`, 'HH:mm:ss'); // Начало рабочего дня
const endTime = moment('18:00:00', 'HH:mm:ss'); // Конец рабочего дня

export const convertResponse = val => {
  // const defaultObj = { yLabels: [], datasets: [] };
  /* const DNDData = val.reduce((acc, n) => {
    acc.yLabels.push(n.operator);
    const { data } = n.dnd.reduce((ac, k) => {
      ac.data.push(
        [{ x: moment(k.start).format('YYYY-MM-DD HH:mm'), y: n.operator }, { x: moment(k.end).format('YYYY-MM-DD HH:mm'), y: n.operator }, {}],
      );
      return ac;
    }, { data: [] });
    acc.datasets.push({ data: data.flat() });
    return acc;
  }, defaultObj); */
  const activesOperators = val.reduce((acc, n) => {
    const calls = n.calls.reduce((ac, k) => {
      if (!k.city) return ac;
      const { inComings, outGoings } = ac;
      if (k.type === 'Входящие') {
        inComings[2] += 1;
        if (k.city === 'Москва') {
          inComings[0] += 1;
        }
        if (k.city === 'Санкт-Петербург') {
          inComings[1] += 1;
        }
      }
      if (k.type === 'Исходящие') {
        outGoings[2] += 1;
        if (k.city === 'Москва') {
          outGoings[0] += 1;
        }
        if (k.city === 'Санкт-Петербург') {
          outGoings[1] += 1;
        }
      }
      return ac;
    }, { inComings: [0, 0, 0], outGoings: [0, 0, 0] });

    // const onlineTime = n.dnd.reduce((ac, k) => {
    //   const start = moment(k.start);
    //   const getStart = moment(start).format('HH:mm:ss');
    //   const mStart = moment(getStart, 'HH:mm:ss');
    //   const end = moment(k.end);
    //   const getEnd = moment(end).format('HH:mm:ss');
    //   const mEnd = moment(getEnd, 'HH:mm:ss');
    //   if (mStart.isBetween(startTime, endTime) || mEnd.isBetween(startTime, endTime)) {
    //     const startOfwork = start.isBefore(startTime) ? startTime : start;
    //     const endOfwork = end.isAfter(endTime) ? endTime : end;
    //     return ac + endOfwork.diff(startOfwork);
    //   }
    //   return ac;
    // }, null);
    const onlineOrders = [n.onlineOrders['Москва'], n.onlineOrders['Санкт-Петербург'], n.onlineOrders.total];
    const siteRequisitions = n.siteRequisition.reduce((ac, k) => {
      if (k.tag === 'Спам') return ac;
      return ac + 1;
    }, 0);
    const obj = {
      fullName: n.operator,
      inComings: calls.inComings,
      outGoings: calls.outGoings,
      // dnd: moment.duration(onlineTime).locale('ru').humanize(),
      onlineOrders,
      siteRequisition: siteRequisitions,
    };
    acc.push(obj);
    return acc;
  }, []);
  return { activesOperators };
};

export const convertResponseCalls = val => val.calls.reduce((acc, n) => {
  if (!n.city) return acc;
  const { cities } = acc;
  if (!(n.tag === 'Новое обращение' || n.type === 'Пропущенные')) acc.allCalls++;
  const time = moment(n.time);
  const getTime = moment(time).format('HH:mm:ss');
  const mTime = moment(getTime, 'HH:mm:ss');
  if (n.city === 'Москва') {
    if (n.type === 'Входящие') ++cities.moscow.types[0];
    if (n.type === 'Исходящие') ++cities.moscow.types[1];
    if (n.type === 'Пропущенные') ++cities.moscow.types[2];
    if (mTime.isBetween(startTime, endTime)) {
      const hour = Number(time.startOf('hour').format('H')) - startWorkTime;
      cities.moscow.hours[hour] += 1;
    }
  }
  if (n.city === 'Санкт-Петербург') {
    if (n.type === 'Входящие') ++cities.spb.types[0];
    if (n.type === 'Исходящие') ++cities.spb.types[1];
    if (n.type === 'Пропущенные') ++cities.spb.types[2];
    if (mTime.isBetween(startTime, endTime)) {
      const hour = Number(time.startOf('hour').format('H')) - startWorkTime;
      cities.spb.hours[hour] += 1;
    }
  }
  return acc;
}, {
  cities: {
    moscow: { types: [0, 0, 0], hours: new Array(10).fill(0) },
    spb: { types: [0, 0, 0], hours: new Array(10).fill(0) },
  },
  allCalls: 0,
});
export const convertResponseOrders = val => val.reduce((acc, n) => {
  if (n.tag === 'Новое обращение') return acc;
  const idx = acc.findIndex(k => k.title === n.type);
  if (n.city === 'Москва') {
    if (~idx) acc[idx].count[0]++;
  } else if (~idx) acc[idx].count[1]++;
  if (~idx) acc[idx].count[2]++;
  return acc;
}, [
  {
    color: '#F18F71',
    title: 'Ждёт подтверждения',
    count: [0, 0, 0],
  },
  {
    color: '#EBA843',
    title: 'В работе',
    count: [0, 0, 0],
  },
  {
    color: '#60BE69',
    title: 'Отгружен',
    count: [0, 0, 0],
  },
  {
    color: '#3ad3e7',
    title: 'В обработке',
    count: [0, 0, 0],
  },
  {
    color: '#e3c567',
    title: 'Ждет оплаты',
    count: [0, 0, 0],
  },
]);

export const convertResponseSite = (val, tags) => {
  const arr = tags.reduce((acc, n) => {
    if (n.title === 'Новое обращение') return acc;
    acc.push({ ...n, count: 0 });
    return acc;
  }, []);
  return val.reduce((acc, n) => {
    if (n.tag === 'Новое обращение') return acc;
    const idx = acc.findIndex(k => k.title === n.tag);
    if (~idx)acc[idx].count++;
    return acc;
  }, arr);
};

export const getTimeFromMins = sec => {
  const hours = Math.trunc(sec / 60 / 60);
  const minutes = Math.trunc(sec / 60);
  const seconds = sec % 60;
  return `${hours}:${String(Math.trunc(minutes)).padStart(2, '0')}:${String(Math.trunc(seconds)).padStart(2, '0')}`;
};
