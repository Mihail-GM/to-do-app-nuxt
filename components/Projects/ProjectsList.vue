<template>
  <div>
    <h1> Projects </h1>

    <v-btn
      v-if="isLoadingProp === false"
      id="add-project-button"
      class="my-5"
      color="primary"
      @click="openProjectCreateDialog"
    >
      <v-icon color="white" large>mdi-plus</v-icon>
      <span> Add project </span>
    </v-btn>

    <div v-if="isLoadingProp" class="loading mt-5">
      <v-progress-linear
        color="primary"
        indeterminate
      />

      <div class="d-flex justify-center align-center pa-10">
        Loading... Please wait
      </div>
    </div>

    <div v-else-if="hasProjects === false" class="mt-5">
      <div class="d-flex justify-center align-center pa-10">
        Projects data is missing...
      </div>
    </div>

    <div v-else-if="hasProjects">
      <v-row>
        <v-col
          v-for="(project, index) in allProjectsProp"
          :key="`${index}-${project.id}`"
          cols="12"
          lg="4"
          md="6"
          xs="12"
        >
          <projects-list-item
            v-if="project?.tasks"
            :project-id-prop="project.id"
            :project-list-name-prop="project.name"
            :project-tasks-prop="project.tasks"
            @changeTaskStatus="(projectId, taskId) => $emit('changeTaskStatus', projectId, taskId)"
            @deleteProject="(projectId) => $emit('deleteProject', projectId)"
            @deleteTask="(projectId, taskId) => $emit('deleteTask', projectId, taskId)"
            @increaseTaskViewCounter="(projectId, taskId) => $emit('increaseTaskViewCounter', projectId, taskId)"
            @openAddTaskDialog="openAddTaskDialog(index)"
          />
        </v-col>
      </v-row>

      <tasks-create-dialog
        v-if="showCreateTaskDialog"
        :key="`create-task-${createTaskDialogKey}`"
        :project-id-prop="allProjectsProp[projectIndex].id"
        :show-dialog-prop.sync="showCreateTaskDialog"
        @createNewTask="(projectId, taskId) => $emit('createNewTask', projectId, taskId)"
      />
    </div>

    <projects-create-dialog
      v-if="showProjectCreateDialog"
      :key="`create-project-${projectCreateDialogKey}`"
      :show-dialog-prop.sync="showProjectCreateDialog"
      @createProject="(project) => $emit('createProject', project)"
    />
  </div>
</template>

<script>
export default {
  name: 'ProjectsList',
  props: {
    allProjectsProp: {
      type: Array,
      default: () => {
        return []
      }
    },

    isLoadingProp: {
      type: Boolean,
      default: false,
      required: true
    }
  },

  data () {
    return {
      projectIndex: null,
      showCreateTaskDialog: false,
      createTaskDialogKey: 0,
      showProjectCreateDialog: false,
      projectCreateDialogKey: 0
    }
  },

  computed: {
    hasProjects () {
      return this.allProjectsProp.length > 0
    }
  },

  methods: {
    openAddTaskDialog (index) {
      this.projectIndex = index
      this.createTaskDialogKey++
      this.showCreateTaskDialog = true
    },

    openProjectCreateDialog () {
      this.projectCreateDialogKey++
      this.showProjectCreateDialog = true
    }
  }
}
</script>
