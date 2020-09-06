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
          <v-list-item @click="MakeOrder(info.colddrink1)" class="rtl">
            <v-list-item-content><span>מים</span><span class="price">0 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(info.colddrink2)" class="rtl">
            <v-list-item-content><span>קוקה קולה</span><span class="price">12 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(info.colddrink3)" class="rtl">
            <v-list-item-content><span>ספרייט</span><span class="price">12 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(info.colddrink4)" class="rtl">
            <v-list-item-content><span>פנטה</span><span class="price">12 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(info.colddrink5)" class="rtl">
            <v-list-item-content><span>סודה</span><span class="price">10 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
        </v-col>
      </v-card>
    </v-dialog>
    <v-icon x-large>mdi-cup</v-icon><span>שתיה קלה</span>
      <v-snackbar v-model="snackbar" timeout="2000" top class="rtl" :color="color">{{ text }}</v-snackbar>
    </v-btn>
</template>

<script>
export default {
  name: "ColdDrinks",//120-1024
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
        colddrink1:{
          success_text: 'מים בדרך אליך!',
          order: {
            OrderTypeID: '1020'
          }
        },
        colddrink2:{
          success_text: 'קוקה קולה בדרך אליך!',
          order: {
            OrderTypeID: '1021'
          }
        },
        colddrink3:{
          success_text: 'ספרייט בדרך אליך!',
          order: {
            OrderTypeID: '1022'
          }
        },
        colddrink4:{
          success_text: 'פנטה בדרך אליך!',
          order: {
            OrderTypeID: '1023'
          }
        },
        colddrink5:{
          success_text: 'סודה בדרך אליך!',
          order: {
            OrderTypeID: '1024'
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
