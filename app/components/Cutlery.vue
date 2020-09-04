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
          <v-list-item @click="MakeOrder(infoA)" class="rtl">
            <v-list-item-content>מזלג</v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(infoB)" class="rtl">
            <v-list-item-content>סכין</v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(infoC)" class="rtl">
            <v-list-item-content>כף</v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(infoD)" class="rtl">
            <v-list-item-content>כפית</v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(infoE)" class="rtl">
            <v-list-item-content>צלחת</v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
        </v-col>
      </v-card>
    </v-dialog>
  <v-icon x-large>mdi-silverware-variant</v-icon><span>חסר סכו"ם</span></v-btn>
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
      infoA: {
        OrderTypeID: '1006'
      },
      infoB: {
        OrderTypeID: '1007'
      },
      infoC: {
        OrderTypeID: '1008'
      },
      infoD: {
        OrderTypeID: '1009'
      },
      infoE: {
        OrderTypeID: '1010'
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
