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
          <v-list-item @click="MakeOrder(infoA)" class="rtl">
            <v-list-item-content><span>קפה שחור</span><span class="price">12 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(infoB)" class="rtl">
            <v-list-item-content><span>קפה הפוך</span><span class="price">15 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(infoC)" class="rtl">
            <v-list-item-content><span>תה</span><span class="price">12 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
        </v-col>
      </v-card>
    </v-dialog>
    <v-icon x-large>mdi-coffee-outline</v-icon><span>שתיה חמה</span></v-btn>
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
      infoA: {
        OrderTypeID: '1017'
      },
      infoB: {
        OrderTypeID: '1018'
      },
      infoC: {
        OrderTypeID: '1019'
      }
    }
  },
  methods: {
    async MakeOrder(info){
      await this.$axios.post('/order', info).then((res) => {
        ///showpopup
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
