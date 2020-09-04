<template>
  <div :style="{ margin:'auto' }">
    <div :style="{ backgroundImage: 'url(' + require('@/assets/retrobot.png') + ')', width: '245px', height: '320px'}" class="animated zoomInDown slow" />
    <v-btn to="" @click="loginUser" width="245px" height="100px" color="#9a1313" class="white--text animated zoomIn slow" rounded absolute x-large>לחץ כאן</v-btn>
  </div>
</template>
<script>
export default {
  layout: "default",
  asyncData({route, params}){

  },
  mounted(){

  },
  methods:{
    loginUser(){
      this.$auth.loginWith('local', {
        data: {
          o: this.$route.query["o"]
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
