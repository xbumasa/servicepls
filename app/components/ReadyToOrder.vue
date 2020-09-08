<template>
  <v-btn rounded class="btn-custom rtl mb-4" block @click="MakeOrder()"><v-icon large>mdi-human-greeting</v-icon><span>מוכן להזמין</span>
    <v-snackbar v-model="snackbar.on" :timeout="snackbar.timeout" top class="rtl" :color="snackbar.bgcolor">{{ snackbar.message }}</v-snackbar>
  </v-btn>
</template>

<script>
export default {
  name: "ReadyToOrder",
  data(){
    return {
      snackbar:{
        on: false,
        bgcolor: '',
        message: '',
        success_text: '',
        error_text: 'לא שכחתי ממך, כבר אצליך :)',
        success_color: 'success',
        error_color: 'info',
        timeout: 3000
      },
      info: {
        success_text: 'מלצר/ית בדרך אליך!',
        OrderTypeID: '1000'
      }
    }
  },
  methods: {
    async MakeOrder( ){
      await this.$axios.post('/order', {
        OrderTypeID: this.info.OrderTypeID
      }).then((res) => {
        if(res.status == 200 && res.data.toString() == 'OK' ){
          this.snackbar.message = this.info.success_text
          this.snackbar.bgcolor = this.snackbar.success_color
        }
        else{
          this.snackbar.message = this.snackbar.error_text
          this.snackbar.bgcolor = this.snackbar.error_color
        }
        this.snackbar.on = true
      }).catch((e) => {
        this.$auth.logout( )
      })
    }
  }
}
</script>

<style scoped>
  .btn-custom{
    font-weight: bold;
    color: #fff !important;
    height: 72px !important;
    border: 2px solid #fff !important;
    background-color: #b23e3e !important;
  }

  .rtl{
    direction: rtl;
  }

  .btn-custom span{
    position: absolute;
    margin-top:18px
  }

  .btn-custom i.v-icon.v-icon {
    position: absolute;
    margin-top:-10px
  }
</style>
