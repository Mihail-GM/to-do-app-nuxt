export const state = () => ({
  snackbarMessageData: {
    message: '',
    duration: 3000,
    mode: 'success'
  }
})

export const getters = {
  getSnackbarMessage (state) {
    return state.snackbarMessageData
  }
}

export const mutations = {
  setSnackbarMessage (state, { message, duration = 4000, mode = 'success' }) {
    state.snackbarMessageData = {
      message,
      duration,
      mode
    }
  }
}

export const actions = {
  showSnackbarMessage (vuexContext, messageData) {
    vuexContext.commit('setSnackbarMessage', messageData)
  }
}
