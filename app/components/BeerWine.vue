<template>
    <v-btn rounded block class="btn-custom rtl mb-4" @click="dialog=true">
    <v-dialog v-model="dialog" fullscreen transition="scale-transition">
      <v-toolbar color="#6c9899">
        <v-btn icon @click="dialog=false" color="white">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="title">בירה ויין</v-toolbar-title>
      </v-toolbar>
      <v-card>
        <v-col>
          <v-list-item @click="MakeOrder(info.beer1)" class="rtl">
            <v-list-item-content><span>בירה הייניקן בקבוק 1/3</span><span class="price">20 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(info.beer2)" class="rtl">
            <v-list-item-content><span>בירה קרלסברג בקבוק 1/3</span><span class="price">20 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(info.beer3)" class="rtl">
            <v-list-item-content><span>בירה פאולנר חבית 1/2</span><span class="price">30 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(info.beer4)" class="rtl">
            <v-list-item-content><span>בירה מייסלוייס חבית 1/2</span><span class="price">35 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(info.beer5)" class="rtl">
            <v-list-item-content><span>כוס יין לבן</span><span class="price">40 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(info.beer6)" class="rtl">
            <v-list-item-content><span>כוס יין אדום</span><span class="price">40 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
        </v-col>
      </v-card>
    </v-dialog>
    <v-icon x-large>mdi-glass-mug-variant</v-icon><span>בירה ויין</span>
      <v-snackbar v-model="snackbar" timeout="2000" top class="rtl" :color="color">{{ text }}</v-snackbar>
    </v-btn>
</template>

<script>
export default {
  name: "BeerWine",
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
        beer1:{
          success_text: 'בירה הייניקן בקבוק 1/3 בדרך אליך!',
          order: {
            OrderTypeID: '1011'
          }
        },
        beer2:{
          success_text: 'בירה קרלסברג בקבוק 1/3 בדרך אליך!',
          order: {
            OrderTypeID: '1012'
          }
        },
        beer3:{
          success_text: 'בירה פאולנר חבית 1/2 בדרך אליך!',
          order: {
            OrderTypeID: '1013'
          }
        },
        beer4:{
          success_text: 'בירה מייסלוייס חבית 1/2 בדרך אליך!',
          order: {
            OrderTypeID: '1014'
          }
        },
        beer5:{
          success_text: 'כוס יין לבן בדרך אליך!',
          order: {
            OrderTypeID: '1015'
          }
        },
        beer6:{
          success_text: 'כוס יין אדום בדרך אליך!',
          order: {
            OrderTypeID: '1016'
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
