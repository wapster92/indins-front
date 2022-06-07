export default async function ({ store }) {
  const settings = store.getters['settings/settings'];
  if (settings.isGet) return false;
  await store.dispatch('settings/setSettings');
}
