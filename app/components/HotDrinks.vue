<template>
    <v-btn rounded block class="btn-custom rtl mb-4" @click="ShowDialog()">
    <v-dialog v-model="dialog" fullscreen transition="scale-transition">
      <v-toolbar color="#6c9899">
        <v-btn icon @click="CloseDialog()" color="white">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="title">שתיה חמה</v-toolbar-title>
      </v-toolbar>
      <v-card>
        <v-col>
          <v-list-item @click="SetOrder(info.hotdrink1)" class="rtl">
            <v-list-item-content><span>קפה שחור</span><span class="price">12 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="SetOrder(info.hotdrink2)" class="rtl">
            <v-list-item-content><span>קפה הפוך</span><span class="price">15 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="SetOrder(info.hotdrink3)" class="rtl">
            <v-list-item-content><span>תה</span><span class="price">12 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
        </v-col>
      </v-card>
    </v-dialog>
    <v-icon large>mdi-coffee-outline</v-icon><span>שתיה חמה</span>
      <v-snackbar v-model="snackbar" timeout="2000" top class="rtl" :color="color">{{ text }}</v-snackbar>
      <v-dialog v-model="dialog_amount" @close="CloseAmountDialog()">
        <v-card raised loading>
          <v-card-text align="center" class="pt-6">
            <v-row align-content="center">
              <v-col>
                <v-btn fab outlined color="grey" @click="DecreaseAmount()"><v-icon>mdi-minus</v-icon></v-btn>
              </v-col>
              <v-col>
                <v-chip :ripple="false" class="grey-light font-weight-bold" large>{{ amount }}</v-chip>
              </v-col>
              <v-col>
                <v-btn fab outlined color="grey" @click="IncreaseAmount()"><v-icon>mdi-plus</v-icon></v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider class="mx-2"/>
          <v-card-actions class="rtl">
            <v-btn @click="MakeOrder( )" text color="info font-weight-bold">בחר</v-btn>
            <v-spacer/>
            <v-btn @click="CloseAmountDialog( )" text color="error">סגור</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      order_info: {},
      amount: 1,
      dialog_amount: false,
      info: {
        hotdrink1:{
          success_text: 'קפה שחור בדרך אליך!',
          OrderTypeID: '1017'
        },
        hotdrink2:{
          success_text: 'קפה הפוך בדרך אליך!',
          OrderTypeID: '1018'
        },
        hotdrink3:{
          success_text: 'תה בדרך אליך!',
          OrderTypeID: '1019'
        }
      }
    }
  },
  methods: {
    async MakeOrder( ){
      await this.$axios.post('/order', {
        OrderTypeID: this.order_info.OrderTypeID,
        OrderAmount: this.amount
      }).then((res) => {
        if(res.status == 200 && res.data.toString() == 'OK' ){
          this.text = this.order_info.success_text
          this.color = this.success_color
        }
        else{
          this.text = this.error_text
          this.color = this.error_color
        }
        this.snackbar = true
        this.CloseAmountDialog()
      }).catch((e) => {
        this.$auth.logout( )
      })
    },
    ShowAmountDialog(){
      this.ResetAmount()
      this.dialog_amount = true
    },
    CloseAmountDialog(){
      this.dialog_amount = false
      this.ResetAmount()
    },
    ShowDialog(){
      this.dialog = true
    },
    CloseDialog(){
      this.dialog = false
    },
    ResetAmount(){
      this.amount = 1
    },
    IncreaseAmount(){
      this.amount += this.amount == 5 ? 0 : 1
    },
    DecreaseAmount(){
      this.amount -= this.amount == 1 ? 0 : 1
    },
    SetOrder(info){
      this.order_info = info
      this.ShowAmountDialog()
    },
  }
}
</script>

<style scoped>
.btn-custom{
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
