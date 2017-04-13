const { join } = require('path');
const fs = require('fs');

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    ]
  },
  css: [
    { src: join(__dirname, 'assets/css/app.styl'), lang: 'styl' }
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['vuetify']
  },
  plugins: [
    '~plugins/vuetify.js', { src: '~plugins/recursive-list-group.js', ssr: true }
  ],
  router: {
    extendRoutes (routes, resolve) {
      let ext = fs.readFileSync(resolve(__dirname, 'routes.json'), 'utf8');
      JSON.parse(ext).forEach(route => {
        route.component = resolve(__dirname, 'pages/index.vue');
        routes.push(route);
      });
    }
  }
};
