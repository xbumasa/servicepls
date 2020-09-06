<template>
  <v-btn rounded class="btn-custom mb-4" block @click="MakeOrder( )"><v-icon x-large>mdi-baguette</v-icon><span>לחם הבית</span>
    <v-snackbar v-model="snackbar" timeout="2000" top class="rtl" :color="color">{{ text }}</v-snackbar>
  </v-btn>
</template>

<script>
export default {
  name: "Bread",
  data(){
    return {
      color: '',
      text: '',
      snackbar: false,
      error_text: 'לא שכחתי ממך, כבר אצליך :)',
      success_color: 'success',
      error_color: 'info',
      info: {
        success_text: 'חם מהתנור, כבר מביאים!',
        order: {
          OrderTypeID: '1005'
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
  direction: rtl;
  font-weight: bold;
  color: #fff !important;
  height: 80px !important;
  border: 2px solid #fff !important;
  background-color: #6c9899 !important;
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
