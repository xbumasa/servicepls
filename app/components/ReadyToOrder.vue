<template>
    <v-btn rounded class="btn-custom mb-4" block @click="MakeOrder(info)"><v-icon x-large>mdi-human-greeting</v-icon><span>מוכן להזמין</span></v-btn>
</template>

<script>
export default {
  name: "ReadyToOrder",
  data(){
    return {
      info: {
        OrderTypeID: '1000'
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
    direction: rtl;
    font-weight: bold;
    color: #fff !important;
    height: 80px !important;
    border: 2px solid #fff !important;
    background-color: #b23e3e !important;
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
