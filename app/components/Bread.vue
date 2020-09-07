<template>
  <v-btn rounded class="btn-custom mb-4" block @click="MakeOrder( )"><v-icon large>mdi-baguette</v-icon><span>לחם הבית</span>
    <v-snackbar v-model="snackbar.on" timeout="2000" top class="rtl" :color="snackbar.bgcolor">{{ snackbar.message }}</v-snackbar>
  </v-btn>
</template>

<script>
export default {
  name: "Bread",
  data(){
    return {
      snackbar:{
        on: false,
        bgcolor: '',
        message: '',
        success_text: '',
        error_text: 'לא שכחתי ממך, כבר אצליך :)',
        success_color: 'success',
        error_color: 'info'
      },
      info: {
        success_text: 'חם מהתנור, כבר מביאים!',
        OrderTypeID: '1005'
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
  direction: rtl;
  font-weight: bold;
  color: #fff !important;
  height: 72px !important;
  border: 2px solid #fff !important;
  background-color: #6c9899 !important;
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
