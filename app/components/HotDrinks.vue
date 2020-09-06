<template>
    <v-btn rounded block class="btn-custom rtl mb-4" @click="dialog=true">
    <v-dialog v-model="dialog" fullscreen transition="scale-transition">
      <v-toolbar color="#6c9899">
        <v-btn icon @click="dialog=false" color="white">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="title">שתיה קלה</v-toolbar-title>
      </v-toolbar>
      <v-card>
        <v-col>
          <v-list-item @click="MakeOrder(info.hotdrink1)" class="rtl">
            <v-list-item-content><span>קפה שחור</span><span class="price">12 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(info.hotdrink2)" class="rtl">
            <v-list-item-content><span>קפה הפוך</span><span class="price">15 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(info.hotdrink3)" class="rtl">
            <v-list-item-content><span>תה</span><span class="price">12 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
        </v-col>
      </v-card>
    </v-dialog>
    <v-icon x-large>mdi-coffee-outline</v-icon><span>שתיה חמה</span>
      <v-snackbar v-model="snackbar" timeout="2000" top class="rtl" :color="color">{{ text }}</v-snackbar>
    </v-btn>
</template>

<script>
export default {
  name: "HotDrinks",
  data () {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: true,
      color: '',
      text: '',
      snackbar: false,
      error_text: 'לא שכחתי ממך, כבר אצליך :)',
      success_color: '#98ac3b',
      error_color: '#d85634',
      info: {
        hotdrink1:{
          success_text: 'קפה שחור בדרך אליך!',
          order: {
            OrderTypeID: '1017'
          }
        },
        hotdrink2:{
          success_text: 'קפה הפוך בדרך אליך!',
          order: {
            OrderTypeID: '1018'
          }
        },
        hotdrink3:{
          success_text: 'תה בדרך אליך!',
          order: {
            OrderTypeID: '1019'
          }
        }
      }
    }
  },
  methods: {
    async MakeOrder(info){
      await this.$axios.post('/order', info.order).then((res) => {
        if(res.status == 200 && res.data.toString() == 'OK' ){
          this.text = info.success_text
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

.title{
  position: absolute;
  right: 20px;
  color: #fff;
}

.rtl{
  direction: rtl;
}

.price{
  color: darkred;
}
</style>
