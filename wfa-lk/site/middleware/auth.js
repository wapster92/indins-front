export default async function (context) {
  // Проверяем находимся ли пользователь в личном кабинете
  if (context.route.path.includes('personal-area')) {
    const userStore = context.store.getters['user/getUser'];
    const cookieToken = context.$cookies.get('site-token') || null;
    if (cookieToken) {
      context.$auth.setToken(cookieToken);
      if (!userStore.auth) {
        try {
          await context.store.dispatch('user/auth');
        } catch (e) {
          return context.redirect('/auth/login');
        }
      }
    } else {
      return context.redirect('/auth/login');
    }
  }
}
