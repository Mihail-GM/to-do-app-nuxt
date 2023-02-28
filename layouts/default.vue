<template>
  <v-app>
    <v-main>
      <v-container class="pa-15" fluid>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer absolute app>
      <span>&copy; {{ new Date().getFullYear() }} Mihail Mihalev</span>
    </v-footer>

    <app-snackbar />
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>
