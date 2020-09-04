<template>
  <div>
    <v-row>
      <v-col>
        <v-btn rounded class="btn-custom btn-group-a" block>מוכן להזמין</v-btn>
        <br />
        <v-btn rounded class="btn-custom btn-group-b" block>צריך מפיות</v-btn>
        <br />
        <v-btn rounded class="btn-custom btn-group-b" block>מאפרה</v-btn>
        <br />
        <v-btn rounded class="btn-custom btn-group-d" block>לחם הבית</v-btn>
        <br />
        <v-btn rounded class="btn-custom btn-group-d" block>בירה ויין</v-btn>
      </v-col>
      <v-col>
        <v-btn rounded class="btn-custom btn-group-a" block>תקרא למלצר</v-btn>
        <br />
        <Cutlery/>
        <br />
        <v-btn rounded class="btn-custom btn-group-b" block>תפריט</v-btn>
        <br />
        <v-btn rounded class="btn-custom btn-group-d" block>שתיה קלה</v-btn>
        <br />
        <v-btn rounded class="btn-custom btn-group-d" block>לחם הבית</v-btn>
      </v-col>
    </v-row>
    <v-divider />
    <v-row>
      <v-col>
        <v-btn rounded class="btn-custom btn-group-c" block>חשבון בבקשה</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Cutlery from "@/components/Cutlery";

export default {
  name: "CallPad",
  components:{
    Cutlery
  },
  data () {
    return {
      dialog1: false,
      notifications: false,
      sound: true,
      widgets: true,
    }
  }
}
</script>

<style scoped>
.btn-custom{
  direction: rtl;
  font-weight: bold;
  color: #fff !important;
  height: 100px !important;
}
.btn-group-a{
  border: 2px solid #fff !important;
  background-color: #b23e3e !important;
  /*outline: 2px solid #b23e3e;*/
}
.btn-group-b{
  border: 2px solid #fff !important;
  background-color: #d85634 !important;
  /*outline: 2px solid #6c9899;*/
}
.btn-group-c{
  border: 2px solid #fff !important;
  background-color: #676e3a !important;
  /*outline: 2px solid #676e3a;*/
}
.btn-group-d{
  border: 2px solid #fff !important;
  background-color: #6c9899 !important;
  /*outline: 2px solid #d85634;*/
}

</style>
