class Auth {
  constructor(context) {
    this.context = context;
    this.init();
  }

  setToken(val) {
    this.token = val;
  }

  init() {
    const cookieToken = this.context.$cookies.get('site-token') || null;
    if (cookieToken) return this.setToken(cookieToken);
    this.token = null;
  }
}

export default (context, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  const auth = new Auth(context);
  inject('auth', auth);
};
