<template>
  <div class="text-center">
    <v-snackbar
      v-model="showSnackbar"
      :color="snackbarMessageData.mode === 'success'? 'green dark' : 'orange dark'"
      :timeout="snackbarMessageData.duration"
      class="mb-15"
      elevation="12"
    >
      {{ snackbarMessageData.message }}

      <template #action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="closeSnackbar"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppSnackbar',

  data () {
    return {
      showSnackbar: false
    }
  },

  computed: {
    ...mapGetters(
      {
        snackbarMessageData: 'snackbar/getSnackbarMessage'
      }
    )
  },

  watch: {
    snackbarMessageData () {
      this.showSnackbar = true
    }
  },

  methods: {
    closeSnackbar () {
      this.showSnackbar = false
    }
  }
}

</script>
