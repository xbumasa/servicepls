<template>
  <v-btn rounded @click="dialog=true" class="btn-custom rtl mb-4" block>
    <v-dialog v-model="dialog" fullscreen transition="scale-transition">
      <v-toolbar color="#d85634">
        <v-btn icon @click="dialog=false" color="white">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="title rtl">סכו"ם</v-toolbar-title>
      </v-toolbar>
      <v-card>
        <v-col>
          <v-list-item @click="MakeOrder(info.fork)" class="rtl">
            <v-list-item-content>מזלג</v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(info.knife)" class="rtl">
            <v-list-item-content>סכין</v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(info.spoon)" class="rtl">
            <v-list-item-content>כף</v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(info.teaspoon)" class="rtl">
            <v-list-item-content>כפית</v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(info.plate)" class="rtl">
            <v-list-item-content>צלחת</v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
        </v-col>
      </v-card>
    </v-dialog>
  <v-icon x-large>mdi-silverware-variant</v-icon><span>חסר סכו"ם</span>
    <v-snackbar v-model="snackbar" timeout="2000" top class="rtl" :color="color">{{ text }}</v-snackbar>
  </v-btn>
</template>

<script>
export default {
  name: "Cutlery",
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
      error_color: '#4f6f6a',
      info: {
        fork:{
          success_text: 'מזלג בדרך אליך!',
          order: {
            OrderTypeID: '1006'
          }
        },
        knife:{
          success_text: 'סכין בדרך אליך!',
          order: {
            OrderTypeID: '1007'
          }
        },
        spoon:{
          success_text: 'כף בדרך אליך!',
          order: {
            OrderTypeID: '1008'
          }
        },
        teaspoon:{
          success_text: 'כגפית בדרך אליך!',
          order: {
            OrderTypeID: '1009'
          }
        },
        plate:{
          success_text: 'צלחת בדרך אליך!',
          order: {
            OrderTypeID: '1010'
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
  background-color: #d85634 !important;
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

</style>
