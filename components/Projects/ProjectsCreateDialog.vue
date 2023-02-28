<template>
  <v-dialog
    v-model="showDialog"
    max-width="600px"
    persistent
  >
    <v-card>
      <v-card-title class="primary mb-4">
        <span class="headline white--text">
          Create new project
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
            <v-col>
              <v-text-field
                id="title-text-field"
                v-model="project.name"
                :error-messages="nameErrors"
                data-q-name-input
                label="Project name*"
                required
                @blur="$v.project.name.$touch()"
              />
            </v-col>
          </v-row>
        </v-container>

        <small>*indicates required field</small>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          id="close-project-dialog-button"
          class="white--text"
          color="red darken-1"
          data-q-close-button
          large
          @click.native="closeDialog"
        >
          Close
        </v-btn>

        <v-btn
          id="create-project-button"
          :disabled="$v.$anyError"
          color="primary darken-1"
          data-q-submit-button
          large
          @click.native="createProject"
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

export default {
  name: 'ProjectsCreateDialog',
  mixins: [validationMixin],

  props: {
    showDialogProp: {
      require: true,
      default: false,
      type: Boolean
    }
  },

  validations: {
    project: {
      name: {
        required,
        maxLength: maxLength(32)
      }
    }
  },

  data () {
    return {
      project: {
        name: null,
        tasks: []
      }
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

    nameErrors () {
      const errors = []
      if (!this.$v.project.name.$dirty) {
        return errors
      }

      !this.$v.project.name.maxLength && errors.push('Can contain maximum of 32 characters')
      !this.$v.project.name.required && errors.push('Must contain at least 1 character')
      return errors
    }
  },

  methods: {
    resetProject () {
      this.project = {
        name: null,
        tasks: []
      }
    },

    closeDialog () {
      this.resetProject()
      this.$emit('update:showDialogProp', false)
    },

    createProject () {
      this.$v.$touch()

      if (this.$v.$anyError) {
        return
      }

      this.$emit('createProject', { id: uuidv4(), ...this.project })
      this.closeDialog()
    }
  }
}

</script>
