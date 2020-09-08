<template>
  <v-app :style="{ backgroundColor: '#dbd4c4' }">
    <v-app-bar class="rtl" flat height="30px" color="#dbd4c4" :style="{borderBottom: '1px solid #fff'}">
      <v-toolbar-title class="subtitle-2" :style="{color:'#333'}">ברוך הבא למסעדת Drunk Babushka</v-toolbar-title>
    </v-app-bar>
    <Nuxt />
    <br/>
    <v-footer color="#dbd4c4" class="white--text" :style="{borderTop: '1px solid #fff'}">
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
