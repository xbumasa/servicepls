<template>
  <v-app :style="{ backgroundPositionY: 'center', backgroundPositionX: 'center', backgroundImage: 'url(' + require('@/assets/retrobg.jpg') + ')' }">
    <div :style="{ margin:'auto' }">
      <div :style="{ backgroundImage: 'url(' + require('@/assets/error-bot.png') + ')', width: '245px', height: '320px'}" class="animated zoomInDown slow" />
    </div>
  </v-app>
</template>

<script>
export default {
  name: "error"
}
</script>

<style scoped>

</style>
