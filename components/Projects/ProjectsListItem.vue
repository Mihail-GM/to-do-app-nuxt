<template>
  <v-card height="400">
    <v-card-title class="primary mb-4 white--text">
      <v-icon color="white" large left>mdi-list-box-outline</v-icon>
      <span class="text-h6 text-shortened-dots">
        {{ projectListNameProp }}
      </span>

      <v-spacer />

      <v-menu
        bottom
        left
        offset-y
      >
        <template #activator="{ on, attrs }">
          <v-btn
            color="white"
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-card
          class="mx-auto secondary"
          max-width="300"
          tile
        >
          <v-list dense flat>
            <v-list-item-group color="secondary">
              <v-list-item>
                <v-btn
                  class="red white--text"
                  small
                  @click.native="deleteProject"
                >
                  <v-icon>mdi-delete</v-icon>
                  Delete
                </v-btn>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>
    </v-card-title>

    <v-card-text>
      <v-row class="mb-1 mr-1">
        <div class="d-flex justify-center align-center px-2">
          <strong class="mx-2 success--text text--darken-2">
            Completed: {{ numberCompletedTasks }}
          </strong>

          <strong class="mx-2 text--darken-2">
            Remaining: {{ remainingTasks }}
          </strong>
        </div>

        <v-spacer />

        <div class="d-none d-sm-flex">
          <v-progress-circular :value="progressOfTasks" class="mr-2" />
          <span class="progress">{{ progressOfTasks }}%</span>
        </div>
      </v-row>

      <v-divider />

      <div class="d-flex align-center justify-center mb-2">
        <v-btn
          block
          color="green"
          @click.native="$emit('openAddTaskDialog')"
        >
          <v-icon color="white">mdi-plus</v-icon>
          <span class="white--text"> Add task </span>
        </v-btn>
      </div>

      <v-card
        v-if="projectTasksProp.length > 0"
        style="overflow-y: auto; height: 230px;"
      >
        <v-slide-y-transition
          class="py-0"
          group
        >
          <tasks-list-item
            v-for="(task, i) in projectTasksProp"
            :key="`${i}-${task.title}`"
            :task-prop="task"
            @changeTaskStatus="changeTaskStatus"
            @deleteTask="deleteTask"
            @increaseTaskViewCounter="increaseTaskViewCounter"
          />
        </v-slide-y-transition>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ProjectListItem',
  props: {
    projectTasksProp: {
      type: Array,
      required: true
    },

    projectIdProp: {
      required: true,
      type: String
    },

    projectListNameProp: {
      required: true,
      type: String
    }
  },

  computed: {
    numberCompletedTasks () {
      return this.projectTasksProp.filter(task => task.done).length
    },

    progressOfTasks () {
      return this.projectTasksProp.length ? Math.round((this.numberCompletedTasks / this.projectTasksProp.length * 100)) : 0
    },

    remainingTasks () {
      return this.projectTasksProp.length - this.numberCompletedTasks
    }
  },

  methods: {
    changeTaskStatus (taskId) {
      this.$emit('changeTaskStatus', this.projectIdProp, taskId)
    },

    increaseTaskViewCounter (taskId) {
      this.$emit('increaseTaskViewCounter', this.projectIdProp, taskId)
    },

    deleteTask (taskId) {
      this.$emit('deleteTask', this.projectIdProp, taskId)
    },

    deleteProject () {
      this.$emit('deleteProject', this.projectIdProp)
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.v-sheet.v-card:not(.v-sheet--outlined)) {
  box-shadow: 0 0 0 0 rgb(0 0 0 / 20%), 0 0 0 0 rgb(0 0 0 / 14%), 0 0 0 0 rgb(0 0 0 / 12%);
}
</style>
