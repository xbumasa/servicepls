<template>
  <v-btn rounded class="btn-custom rtl mb-4" block @click="MakeOrder()"><v-icon x-large>mdi-human-greeting</v-icon><span>מוכן להזמין</span>
    <v-snackbar v-model="snackbar" timeout="2000" top class="rtl" :color="color">{{ text }}</v-snackbar>
  </v-btn>
</template>

<script>
export default {
  name: "ReadyToOrder",
  data(){
    return {
      color: '',
      text: '',
      snackbar: false,
      error_text: 'לא שכחתי ממך, כבר אצליך :)',
      success_color: 'success',
      error_color: 'info',
      info: {
        success_text: 'מלצר/ית בדרך אליך!',
        order: {
          OrderTypeID: '1000'
        }
      }
    }
  },
  methods: {
    async MakeOrder( ){
      await this.$axios.post('/order', this.info.order).then((res) => {
        if(res.status == 200 && res.data.toString() == 'OK' ){
          this.text = this.info.success_text
          this.color = this.success_color
        }
        else{
          this.text = this.error_text
          this.color = this.error_color
        }
        this.snackbar = true
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
    height: 80px !important;
    border: 2px solid #fff !important;
    background-color: #b23e3e !important;
  }

  .rtl{
    direction: rtl;
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
