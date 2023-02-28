<template>
  <v-app>
    <div class="d-flex justify-center align-center flex-column">
      <template v-if="error.statusCode === 403">
        <div class="blue--text text-h1"> 404</div>
        <h1> {{ pageNotFound }} </h1>

        <div class="pa-10">
          <h2 class="text--secondary"> Oops! You weren't supposed to see this </h2>
          <small class="text--secondary"> The page you are looking for doesn't exist.</small>
        </div>
      </template>

      <template v-else>
        <h1 class="pa-10"> {{ otherError }} </h1>
      </template>

      <NuxtLink to="/">
        <v-btn block color="primary">
          GO TO HOME PAGE
        </v-btn>
      </NuxtLink>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',

  props: {
    error: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      pageNotFound: 'PAGE NOT FOUND',
      otherError: 'AN ERROR OCCURRED'
    }
  },

  head () {
    return this.error.statusCode === 404 ? this.pageNotFound : this.otherError
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
