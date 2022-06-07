module.exports = {
  apps: [{
    name: 'RFOSite',
    script: './node_modules/nuxt/bin/nuxt.js',
    args: 'start',
    env: {
      NODE_ENV: 'development',
      NUXT_PORT: 3001
    },
    env_production: {
      NODE_ENV: 'production',
      NUXT_PORT: 4016
    }
  }]
};
