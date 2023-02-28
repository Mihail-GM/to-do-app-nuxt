<template>
  <div class="mb-1">
    <v-card>
      <v-list-item class="pr-0">
        <v-list-item-action>
          <v-checkbox
            :color="taskProp.done && 'grey' || 'primary'"
            :input-value="taskProp.done"
            @click.prevent="$emit('changeTaskStatus', taskProp.id)"
          >
            <template #label>
              <div
                :class="taskProp.done && 'grey--text' || 'primary--text'"
                class="ml-4"
              >
                {{ taskProp.title }}
              </div>
            </template>
          </v-checkbox>
        </v-list-item-action>

        <v-spacer />

        <v-menu
          :key="dialogTaskInfoKey"
          v-model="showTaskInfo"
          :close-on-content-click="false"
          :nudge-width="200"
          class="show-more-task-info"
          offset-x
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              @click.stop="openTaskInfo"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-list dense flat>
              <v-list-item>
                <v-list-item-avatar>
                  <img
                    alt="Demo avatar image"
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                  >
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ taskProp.title }}</v-list-item-title>
                  <v-list-item-subtitle>Schedule date: <b>{{ taskProp.date }}</b></v-list-item-subtitle>
                  <v-list-item-subtitle>Viewed: <b>{{ taskProp.viewCounter }}</b></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider />

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title> Description:</v-list-item-title>
                  <v-list-item-subtitle class="description-text">{{ taskProp.description }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-divider />

              <v-list-item class="priority-flag">
                <v-list-item-icon v-if="taskProp.priority === 1">
                  <v-icon color="red">mdi-flag</v-icon>
                  High
                </v-list-item-icon>

                <v-list-item-icon v-if="taskProp.priority === 2">
                  <v-icon color="yellow">mdi-flag</v-icon>
                  Medium
                </v-list-item-icon>

                <v-list-item-icon v-if="taskProp.priority === 3">
                  <v-icon color="green">mdi-flag</v-icon>
                  Low
                </v-list-item-icon>

                <v-spacer />
              </v-list-item>

              <v-divider />

              <v-list-item class="d-flex align-end">
                <v-btn
                  class="red white--text"
                  small
                  @click.native="deleteTask"
                >
                  <v-icon>mdi-delete</v-icon>
                  Delete
                </v-btn>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-list-item>
    </v-card>

    <v-divider />
  </div>
</template>

<script>
export default {
  name: 'TasksListItem',

  props: {
    taskProp: {
      type: Object,
      required: true,
      default: () => {
        return {
          id: null,
          done: null,
          title: null,
          date: null,
          priority: null,
          viewCounter: null
        }
      }
    }
  },

  data () {
    return {
      task: this.taskProp,
      dialogTaskInfoKey: 0,
      showTaskInfo: false
    }
  },

  methods: {
    openTaskInfo () {
      if (!this.showTaskInfo) {
        this.$emit('increaseTaskViewCounter', this.taskProp.id)
        this.showTaskInfo = true
        this.dialogTaskInfoKey++
      }
    },

    deleteTask () {
      this.showTaskInfo = false
      this.$emit('deleteTask', this.taskProp.id)
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.v-input__slot) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.description-text {
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
