export default function ({ route, redirect }) {
  if (route.path === '/') return;
  const routeArr = route.path.split('/');
  const lastEl = routeArr.length - 1;
  if (routeArr[lastEl] === '') {
    routeArr.pop();
    const r = routeArr.join('/');
    redirect(r);
  }
}
