import { Filter, Get } from 'core-xhr';

export const getNews = async (xhr, id, query) => {
  const filters = [
    new Filter('deletedAt', 'exists', false),
    new Filter('isPublished', 'bool', true),
  ];
  query === 'coin'
    ? filters.push(new Filter('token.id', 'eq', id))
    : filters.push(new Filter('exchange.id', 'eq', id));
  const req = new Get('news').setFilter(filters).addOrder('publicDate', 'DESC').limitShown(5);
  try {
    const res = await xhr.send(req);
    if (!res.data.data?.result?.length) {
      return [];
    }
    return res.data.data.result;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getTopData = async (xhr, id, query, filters, orderField) => {
  const req = new Get(query).setFilter(filters).limitShown(5).addOrder(orderField, 'DESC');
  try {
    const res = await xhr.send(req);
    if (!res.data.data?.result?.length) {
      return [];
    }
    return res.data.data.result;
  } catch (e) {
    console.log(e);
    return [];
  }
};
