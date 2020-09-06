<template>
  <div v-if="!this.$auth.loggedIn" :style="{ margin:'auto' }">
    <div :style="{ backgroundImage: 'url(' + require('@/assets/welcome-bot.png') + ')', width: '245px', height: '320px'}" class="animated zoomInDown slow" />
    <v-btn to="" @click="loginUser" width="245px" height="100px" color="#9a1313" class="white--text animated zoomIn slow" rounded absolute x-large>לחץ כאן</v-btn>
  </div>
</template>
<script>
export default {
  layout: "default",
  validate({params, redirect}) {
    return /^[A-Za-z0-9_-]*[.]{0,2}$/.test(params.o)
  },
  fetch(ctx){
    if(ctx.$auth.loggedIn){
      return ctx.redirect('/service')
    }
  },
  mounted( ){
    if(this.$auth.loggedIn){
      this.$router.push('/service')
      return
    }
  },
  methods:{
    loginUser(){
      this.$auth.loginWith('local', {
        data: {
          o: this.$route.params.o
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
