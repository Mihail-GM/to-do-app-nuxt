<template>
  <v-dialog
    v-model="showDialog"
    max-width="600px"
    persistent
  >
    <v-card>
      <v-card-title class="primary mb-4">
        <span class="headline white--text">
          Create new task
        </span>

        <v-spacer />

        <v-btn
          id="app-dialog-hide-button"
          icon
          @click.prevent="closeDialog"
        >
          <v-icon color="white">
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-text-field
              id="title-text-field"
              v-model="task.title"
              :error-messages="titleErrors"
              data-q="title-input"
              label="Title*"
              outlined
              required
              @blur="$v.task.title.$touch()"
            />
          </v-row>

          <v-row>
            <v-textarea
              id="description-text-field"
              v-model="task.description"
              :error-messages="descriptionErrors"
              data-q="description-input"
              label="Description*"
              outlined
              required
              @blur="$v.task.description.$touch()"
            />
          </v-row>

          <v-row>
            <v-menu
              :close-on-content-click="false"
              :nudge-right="40"
              min-width="auto"
              offset-y
              transition="scale-transition"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="task.date"
                  label="Schedule date"
                  outlined
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="task.date"
                @input="menu2 = false"
              />
            </v-menu>
          </v-row>

          <v-row>
            <v-select
              id="priority-field"
              v-model="task.priority"
              :items="priorityList"
              data-q="priority-input"
              item-text="name"
              item-value="id"
              label="Task priority"
              required
              type="number"
            />
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          id="close-button"
          class="white--text"
          color="red"
          large
          @click.native="closeDialog"
        >
          Close
        </v-btn>

        <v-btn
          id="create-button"
          :disabled="$v.$anyError"
          color="primary darken-1"
          large
          @click.native="saveTask"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { maxLength, required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import { priorityListData } from '@/constants'

export default {
  name: 'TasksCreateDialog',
  mixins: [validationMixin],

  props: {
    showDialogProp: {
      require: true,
      default: false,
      type: Boolean
    },

    projectIdProp: {
      required: true,
      type: String,
      default: '-1'
    },

    isEditingProp: {
      default: false,
      type: Boolean
    }
  },

  validations: {
    task: {
      title: {
        required,
        maxLength: maxLength(64)
      },
      description: {
        required,
        maxLength: maxLength(256)
      }
    }
  },

  data () {
    return {
      task: {
        id: uuidv4(),
        title: null,
        description: null,
        date: new Date().toISOString().slice(0, 10),
        priority: 1,
        done: false,
        viewCounter: 0
      },
      priorityList: priorityListData
    }
  },

  computed: {
    showDialog: {
      get () {
        return this.showDialogProp
      },
      set (value) {
        this.$emit('update:showDialogProp', value)
      }
    },

    titleErrors () {
      const errors = []
      if (!this.$v.task.title.$dirty) {
        return errors
      }

      !this.$v.task.title.maxLength && errors.push('Can contain maximum of 32 characters')
      !this.$v.task.title.required && errors.push('Must contain at least 1 character')
      return errors
    },

    descriptionErrors () {
      const errors = []
      if (!this.$v.task.description.$dirty) {
        return errors
      }

      !this.$v.task.description.maxLength && errors.push('Can contain maximum of 256 characters')
      !this.$v.task.description.required && errors.push('Must contain at least 1 character')
      return errors
    }
  },

  methods: {
    closeDialog () {
      this.$emit('update:showDialogProp', false)
    },

    saveTask () {
      this.$v.$touch()

      if (this.$v.$anyError) {
        return
      }

      this.$emit('createNewTask', this.projectIdProp, this.task)
      this.closeDialog()
    }
  }
}
</script>
