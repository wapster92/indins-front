import { Filter, Get } from 'core-xhr';

const renamePath = path => {
  if (path.length > 1) {
    return path.replace(/.([^/]*)$/, '$1');
  }
  return path;
};

const getMeta = async ($xhr, route) => {
  try {
    const request = new Get('meta').entity().addFilter(new Filter('url', 'eq', renamePath(route.path)));
    const response = await $xhr.send(request);
    if (!response.data.success) return;
    const { result } = response.data.data;
    return result;
  } catch (e) {
    console.error(e);
  }
};

export default getMeta;
