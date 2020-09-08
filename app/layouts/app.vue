<template>
  <v-app :style="{ backgroundColor: '#dbd4c4' }">
    <Nuxt />
    <br/>
    <v-footer app color="#dbd4c4" class="white--text" :style="{borderTop: '1px solid #fff'}">
      <span>servicepls.me</span>
      <v-spacer/>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "app"
}
</script>

<style scoped>
.rtl{
  direction: rtl;
}
</style>
