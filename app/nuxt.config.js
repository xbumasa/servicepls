export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/vuetify.js'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/auth',
    '@nuxtjs/axios'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@neneos/nuxt-animate.css',
    '@nuxtjs/auth',
    '@nuxtjs/axios'
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: false
  },
  axios: {
    baseURL: 'http://localhost:3032'
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth', method: 'post', propertyName: 'token' },
          logout: false,
          user: false
        }
        //tokenRequired: true
      }
    },
    redirect: {
      login: '/',
      logout: '/',
      home: '/dashboard'
    }
  }
}