import constants from './tests/constants'

const { Nuxt, Builder } = require('nuxt')

const nuxtConfig = require('./nuxt.config.js')

const resetConfig = {
  loading: false,
  loadingIndicator: false,
  fetch: {
    client: false,
    server: false
  },
  features: {
    store: true,
    layouts: false,
    meta: false,
    middleware: true,
    transitions: false,
    deprecations: false,
    validate: false,
    asyncData: false,
    fetch: true,
    clientOnline: false,
    clientPrefetch: false,
    clientUseUrl: false,
    componentAliases: false,
    componentClientOnly: false
  },
  build: {
    indicator: false,
    terser: false
  }
}

const finalConfig = Object.assign({}, nuxtConfig.default, resetConfig, {
  server: { port: constants.port },
  buildDir: constants.buildDir,
  ignore: ['/components//', '/layouts//', '/pages//*']
})

const buildNuxt = async () => {
  const nuxt = new Nuxt(finalConfig)
  await new Builder(nuxt).build()
  return nuxt
}

module.exports = async () => {
  const nuxt = await buildNuxt()

  process.env.buildDir = nuxt.options.buildDir
}
