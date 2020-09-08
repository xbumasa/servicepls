<template>
  <v-btn rounded block class="btn-custom rtl mb-4" @click="ShowDialog()">
    <v-dialog v-model="dialog.on" fullscreen transition="scale-transition">
      <v-toolbar :color="dialog.bgcolor">
        <v-btn icon @click="CloseDialog()" color="white">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="title">תוספות</v-toolbar-title>
      </v-toolbar>
      <v-card>
        <v-col>
          <v-list-item @click="MakeOrder(info.salt)" class="rtl">
            <v-list-item-content><span>מלח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(info.pepper)" class="rtl">
            <v-list-item-content><span>פלפל</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(info.sugar)" class="rtl">
            <v-list-item-content><span>סוכר</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(info.tabasco)" class="rtl">
            <v-list-item-content><span>טבסקו</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
        </v-col>
      </v-card>
    </v-dialog>
    <v-icon large>mdi-shaker-outline</v-icon><span>תוספות</span>
    <v-snackbar v-model="snackbar.on" :timeout="snackbar.timeout" top class="rtl" :color="snackbar.bgcolor">{{ snackbar.message }}</v-snackbar>
  </v-btn>
</template>

<script>
export default {
  name: "Extras",
  data () {
    return {
      dialog:{
        on: false,
        bgcolor: '#d85634',
      },
      snackbar: {
        on: false,
        bgcolor: '',
        message: '',
        error_text: 'לא שכחתי ממך, כבר אצליך :)',
        success_color: '#98ac3b',
        error_color: '#4f6f6a',
        timeout: 3000
      },
      info: {
        salt:{
          success_text: 'מלח בדרך אליך!',
          OrderTypeID: '1027'
        },
        pepper:{
          success_text: 'פלפל בדרך אליך!',
          OrderTypeID: '1028'
        },
        sugar:{
          success_text: 'סוכר בדרך אליך!',
          OrderTypeID: '1029'
        },
        tabasco:{
          success_text: 'טבסקו בדרך אליך!',
          OrderTypeID: '1030'
        }
      }
    }
  },
  methods: {
    async MakeOrder(info){
      await this.$axios.post('/order', {
        OrderTypeID: info.OrderTypeID
      }).then((res) => {
        if(res.status == 200 && res.data.toString() == 'OK' ){
          this.snackbar.message = info.success_text
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
    },
    ShowDialog(){
      this.dialog.on = true
    },
    CloseDialog(){
      this.dialog.on = false
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
  background-color: #d85634 !important;
}

.btn-custom span{
  position: absolute;
  margin-top:18px
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
