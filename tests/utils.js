import merge from 'lodash.merge'

export const addVuetify = (context) => {
  context.vuetify = require('vuetify')
  context.vue.use(context.vuetify)

  // eslint-disable-next-line new-cap
  context.vuetifyInstance = new context.vuetify()
}

export const addVuex = (context) => {
  context.vuex = require('vuex')
  context.vue.use(context.vuex)
}

export const addVuelidate = (context) => {
  context.vuelidate = require('vuelidate')
  context.vue.use(context.vuelidate)
}

export const addComponent = (context, component) => {
  context.vue.component(component)
}

export const addFilter = (name, lambda) => {
  return context => context.vue.filter(name, lambda)
}

export const compositeConfiguration = (...configs) => {
  return context => configs.forEach(config => config(context))
}

export const bootstrapVueContext = (configureContext) => {
  const context = {}
  const teardownVueContext = () => {
    jest.unmock('vue')
    Object.keys(context).forEach(key => delete context[key])
    jest.resetModules()
  }

  jest.isolateModules(() => {
    context.vueTestUtils = require('@vue/test-utils')
    context.vueTestUtils.config.stubs.nuxt = { template: '<div />' }
    context.vueTestUtils.config.stubs['nuxt-link'] = { template: '<a><slot /></a>' }
    context.vueTestUtils.config.stubs['no-ssr'] = { template: '<span><slot /></span>' }
    context.vue = context.vueTestUtils.createLocalVue()

    jest.doMock('vue', () => context.vue)

    configureContext && configureContext(context)
  })

  return {
    teardownVueContext,
    ...context
  }
}

export const customWrapper = (component, context, overrides) => {
  return context.vueTestUtils.mount(component,
    merge(
      {
        localVue: context.vue,
        vuetify: context.vuetifyInstance
      },
      overrides
    )
  )
}
