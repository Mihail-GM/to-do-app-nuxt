<template>
  <projects-list
    :all-projects-prop="allProjects"
    :is-loading-prop="currentState === actionStates.LOADING"
    @changeTaskStatus="changeTaskStatus"
    @createNewTask="createNewTask"
    @createProject="createProject"
    @deleteProject="deleteProject"
    @deleteTask="deleteTask"
    @increaseTaskViewCounter="increaseTaskViewCounter"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import { actionStates } from '@/store/projects'

export default {
  name: 'ProjectsListContainer',

  data () {
    return {
      actionStates
    }
  },

  computed: {
    ...mapGetters(
      {
        allProjects: 'projects/getProjects',
        currentState: 'projects/getCurrentState'
      }
    )
  },

  async mounted () {
    await this.$store.dispatch('projects/fetchProjects')
  },

  methods: {
    async createProject (project) {
      try {
        await this.$store.dispatch('projects/addProject', project)
        await this.$store.dispatch('snackbar/showSnackbarMessage', {
          message: 'Project was added successfully',
          duration: 4000,
          mode: 'success'
        })
      } catch (e) {
        await this.$store.dispatch('snackbar/showSnackbarMessage', {
          message: 'The operation could not be completed.',
          duration: 4000,
          mode: 'fail'
        })
      }
    },

    async createNewTask (projectId, newTask) {
      try {
        await this.$store.dispatch('projects/addTaskToProject', { projectId, newTask })
        await this.$store.dispatch('snackbar/showSnackbarMessage', {
          message: 'Task was added successfully',
          duration: 4000,
          mode: 'success'
        })
      } catch (e) {
        await this.$store.dispatch('snackbar/showSnackbarMessage', {
          message: 'The operation could not be completed.',
          duration: 4000,
          mode: 'fail'
        })
      }
    },

    changeTaskStatus (projectId, taskId) {
      this.$store.dispatch('projects/toggleTaskStatus', { projectId, taskId })
    },

    increaseTaskViewCounter (projectId, taskId) {
      this.$store.dispatch('projects/increaseTaskViewCounter', { projectId, taskId })
    },

    async deleteTask (projectId, taskId) {
      try {
        await this.$store.dispatch('projects/deleteTask', { projectId, taskId })
        await this.$store.dispatch('snackbar/showSnackbarMessage', {
          message: 'Task was deleted successfully',
          duration: 4000,
          mode: 'success'
        })
      } catch (e) {
        await this.$store.dispatch('snackbar/showSnackbarMessage', {
          message: 'The operation could not be completed.',
          duration: 4000,
          mode: 'fail'
        })
      }
    },

    async deleteProject (projectId) {
      try {
        await this.$store.dispatch('projects/deleteProject', projectId)
        await this.$store.dispatch('snackbar/showSnackbarMessage', {
          message: 'Project was deleted successfully',
          duration: 4000,
          mode: 'success'
        })
      } catch (e) {
        await this.$store.dispatch('snackbar/showSnackbarMessage', {
          message: 'The operation could not be completed.',
          duration: 4000,
          mode: 'fail'
        })
      }
    }
  }
}
</script>
