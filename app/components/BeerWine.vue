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
          <v-list-item @click="MakeOrder(infoA)" class="rtl">
            <v-list-item-content><span>בירה הייניקן בקבוק 1/3</span><span class="price">20 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(infoB)" class="rtl">
            <v-list-item-content><span>בירה קרלסברג בקבוק 1/3</span><span class="price">20 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(infoC)" class="rtl">
            <v-list-item-content><span>בירה פאולנר חבית 1/2</span><span class="price">30 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(infoD)" class="rtl">
            <v-list-item-content><span>בירה מייסלוייס חבית 1/2</span><span class="price">35 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(infoE)" class="rtl">
            <v-list-item-content><span>כוס יין לבן</span><span class="price">40 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="MakeOrder(infoF)" class="rtl">
            <v-list-item-content><span>כוס יין אדום</span><span class="price">40 ש"ח</span></v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-gesture-tap</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider/>
        </v-col>
      </v-card>
    </v-dialog>
    <v-icon x-large>mdi-glass-mug-variant</v-icon><span>בירה ויין</span></v-btn>
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
      infoA: {
        OrderTypeID: '1011'
      },
      infoB: {
        OrderTypeID: '1012'
      },
      infoC: {
        OrderTypeID: '1013'
      },
      infoD: {
        OrderTypeID: '1014'
      },
      infoE: {
        OrderTypeID: '1015'
      },
      infoF: {
        OrderTypeID: '1016'
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
