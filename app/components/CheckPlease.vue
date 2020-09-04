<template>
  <v-btn rounded block class="btn-custom" @click="MakeOrder(info)"><v-icon x-large>mdi-calculator</v-icon><span>חשבון בבקשה</span></v-btn>
</template>

<script>
export default {
  name: "CheckPlease",
  data(){
    return {
      info: {
        OrderTypeID: '1025'
      }
    }
  },
  methods: {
    async MakeOrder(info){
      await this.$axios.post('/order', info).then((res) => {
        ///showpopup
      }).catch((e) => {
        this.$auth.logout( )
      })
    }
  }
}
</script>

<style scoped>
.btn-custom{
  direction: rtl !important;
  font-weight: bold;
  color: #fff !important;
  height: 80px !important;
  border: 2px solid #fff !important;
  background-color: #676e3a !important;
}

.btn-custom span{
  position: absolute;
  margin-top:20px
}

.btn-custom i.v-icon.v-icon {
  position: absolute;
  margin-top:-10px
}
</style>
