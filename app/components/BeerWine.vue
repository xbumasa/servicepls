<template>
    <v-btn rounded block class="btn-custom rtl mb-4" @click="ShowDialog()">
    <v-dialog v-model="dialog.on" fullscreen transition="scale-transition">
      <v-toolbar :color="dialog.bgcolor">
        <v-btn icon @click="CloseDialog()" color="white">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="title">בירה ויין</v-toolbar-title>
      </v-toolbar>
      <v-card>
        <v-col>
          <v-list-item @click="SetOrder(info.beer1)" class="rtl">
            <v-list-item-content><span>בירה הייניקן בקבוק 1/3</span><span class="price">20 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="SetOrder(info.beer2)" class="rtl">
            <v-list-item-content><span>בירה קרלסברג בקבוק 1/3</span><span class="price">20 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="SetOrder(info.beer3)" class="rtl">
            <v-list-item-content><span>בירה פאולנר חבית 1/2</span><span class="price">30 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="SetOrder(info.beer4)" class="rtl">
            <v-list-item-content><span>בירה מייסלוייס חבית 1/2</span><span class="price">35 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="SetOrder(info.beer5)" class="rtl">
            <v-list-item-content><span>כוס יין לבן</span><span class="price">40 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="SetOrder(info.beer6)" class="rtl">
            <v-list-item-content><span>כוס יין אדום</span><span class="price">40 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
        </v-col>
      </v-card>
    </v-dialog>
    <v-icon large>mdi-glass-mug-variant</v-icon><span>בירה ויין</span>
      <v-snackbar v-model="snackbar.on" :timeout="snackbar.timeout" top class="rtl" :color="snackbar.bgcolor">{{ snackbar.message }}</v-snackbar>
      <v-dialog v-model="popup.on" @close="CloseAmountDialog()">
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
  name: "BeerWine",
  data () {
    return {
      dialog:{
        on: false,
        bgcolor: '#6c9899'
      },
      snackbar: {
        on: false,
        bgcolor: '',
        message: '',
        error_text: 'לא שכחתי ממך, כבר אצליך :)',
        success_color: '#98ac3b',
        error_color: '#d85634',
        timeout: 3000
      },
      popup: {
        on: false
      },
      order_info: {},
      amount: 1,
      info: {
        beer1:{
          success_text: 'בירה הייניקן בקבוק 1/3 בדרך אליך!',
          OrderTypeID: '1011'
        },
        beer2:{
          success_text: 'בירה קרלסברג בקבוק 1/3 בדרך אליך!',
          OrderTypeID: '1012'
        },
        beer3:{
          success_text: 'בירה פאולנר חבית 1/2 בדרך אליך!',
          OrderTypeID: '1013'
        },
        beer4:{
          success_text: 'בירה מייסלוייס חבית 1/2 בדרך אליך!',
          OrderTypeID: '1014'
        },
        beer5:{
          success_text: 'כוס יין לבן בדרך אליך!',
          OrderTypeID: '1015'
        },
        beer6:{
          success_text: 'כוס יין אדום בדרך אליך!',
          OrderTypeID: '1016'
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
          this.snackbar.message = this.order_info.success_text
          this.snackbar.bgcolor = this.snackbar.success_color
        }
        else{
          this.snackbar.message = this.snackbar.error_text
          this.snackbar.bgcolor = this.snackbar.error_color
        }
        this.snackbar.on = true
        this.CloseAmountDialog()
      }).catch((e) => {
        this.$auth.logout( )
      })
    },
    ShowAmountDialog(){
      this.ResetAmount()
      this.popup.on = true
    },
    CloseAmountDialog(){
      this.popup.on = false
      this.ResetAmount()
    },
    ShowDialog(){
      this.dialog.on = true
    },
    CloseDialog(){
      this.dialog.on = false
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
