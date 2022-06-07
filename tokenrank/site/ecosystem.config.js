module.exports = {
  apps: [{
    name: 'CoreSite',
    script: './node_modules/nuxt/bin/nuxt.js',
    args: 'start',
    env: {
      NODE_ENV: 'development',
      NUXT_PORT: 4000
    },
    env_production: {
      NODE_ENV: 'production',
      NUXT_PORT: 3001
    }
  }]
};
