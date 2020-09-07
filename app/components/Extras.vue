<template>
  <v-btn rounded block class="btn-custom rtl mb-4" @click="ShowDialog()">
    <v-dialog v-model="dialog" fullscreen transition="scale-transition">
      <v-toolbar color="#d85634">
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
    <v-snackbar v-model="snackbar" timeout="2000" top class="rtl" :color="color">{{ text }}</v-snackbar>
  </v-btn>
</template>

<script>
export default {
  name: "Extras",
  data () {
    return {
      dialog: false,
      color: '',
      text: '',
      snackbar: false,
      error_text: 'לא שכחתי ממך, כבר אצליך :)',
      success_color: '#98ac3b',
      error_color: '#4f6f6a',
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
    },
    ShowDialog(){
      this.dialog = true
    },
    CloseDialog(){
      this.dialog = false
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
