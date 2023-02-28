import { projectInitialData } from '~/constants'

const actionStates = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  ERRORED: 'ERRORED',
  NOT_FOUND: 'NOT_FOUND',
  DATA_LOADED: 'DATA_LOADED'
}

export { actionStates }

export const state = () => ({
  currentState: actionStates.INITIAL,
  projects: []
})

export const getters = {
  getProjects (state) {
    return state.projects
  },

  getCurrentState (state) {
    return state.currentState
  }
}

export const mutations = {
  setActionState (state, actionState) {
    state.currentState = actionState
  },

  setProjects (state, projects) {
    state.projects = projects ?? []
  },

  setProject (state, singleProject) {
    if (singleProject) {
      state.projects.push((singleProject))
    }
  },

  increaseTaskViewCounter (state, task) {
    task.viewCounter++
  },

  toggleTaskStatus (state, task) {
    task.done = !task.done
  },

  addTaskToProject (state, { project, newTask }) {
    project.tasks.push(newTask)
  },

  deleteTask (state, { project, taskId }) {
    project.tasks = project.tasks.filter(task => task.id !== taskId)
  },

  deleteProject (state, projectId) {
    state.projects = state.projects.filter(project => project.id !== projectId)
  }
}

export const actions = {
  fetchProjects (vuexContext) {
    vuexContext.commit('setActionState', actionStates.LOADING)

    try {
      setTimeout(() => {
        // const projectsData = [] //test with empty array
        const projectsData = projectInitialData
        vuexContext.commit('setProjects', projectsData)

        vuexContext.commit('setActionState', actionStates.DATA_LOADED)
      }, 4000)
    } catch (err) {
      vuexContext.commit('setActionState', actionStates.ERRORED)
    }
  },

  addProject (vuexContext, singleProject) {
    vuexContext.commit('setProject', singleProject)
  },

  addTaskToProject (vuexContext, { projectId, newTask }) {
    const project = vuexContext.getters.getProjects.find(project => project.id === projectId)

    vuexContext.commit('addTaskToProject', { project, newTask })
  },

  toggleTaskStatus (vuexContext, { projectId, taskId }) {
    const project = vuexContext.getters.getProjects.find(project => project.id === projectId)
    const task = project.tasks.find(task => task.id === taskId)

    vuexContext.commit('toggleTaskStatus', task)
  },

  increaseTaskViewCounter (vuexContext, { projectId, taskId }) {
    const project = vuexContext.getters.getProjects.find(project => project.id === projectId)
    const task = project.tasks.find(task => task.id === taskId)

    vuexContext.commit('increaseTaskViewCounter', task)
  },

  deleteTask (vuexContext, { projectId, taskId }) {
    const project = vuexContext.getters.getProjects.find(project => project.id === projectId)

    vuexContext.commit('deleteTask', { project, taskId })
  },

  deleteProject (vuexContext, projectId) {
    vuexContext.commit('deleteProject', projectId)
  }
}
