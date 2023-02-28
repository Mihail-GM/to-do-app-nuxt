import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import { cloneDeep } from 'lodash'
import flushPromises from 'flush-promises'
import snackbar from '@/store/snackbar'

describe('Snackbar Store', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store

  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(snackbar))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Sets correct state when init', () => {
    expect(store.getters.getSnackbarMessage).toEqual({
      message: '',
      duration: 3000,
      mode: 'success'
    })
  })

  describe('ShowSnackbarMessage action', () => {
    test('Sets correct "snackbarMessageData" when call "showSnackbarMessage" with success', async () => {
      expect.assertions(2)

      expect(store.getters.getSnackbarMessage).toEqual({
        message: '',
        duration: 3000,
        mode: 'success'
      })

      await store.dispatch('showSnackbarMessage', {
        message: 'Successfully created project',
        duration: 4000,
        mode: 'success'
      })
      await flushPromises()

      expect(store.getters.getSnackbarMessage).toEqual({
        message: 'Successfully created project',
        duration: 4000,
        mode: 'success'
      })
    })

    test('Sets correct "snackbarMessageData" when call "showSnackbarMessage" with fail', async () => {
      expect.assertions(2)

      expect(store.getters.getSnackbarMessage).toEqual({
        message: '',
        duration: 3000,
        mode: 'success'
      })

      await store.dispatch('showSnackbarMessage', {
        message: 'Failed to creat project',
        duration: 4000,
        mode: 'fail'
      })
      await flushPromises()

      expect(store.getters.getSnackbarMessage).toEqual({
        message: 'Failed to creat project',
        duration: 4000,
        mode: 'fail'
      })
    })
  })
})
