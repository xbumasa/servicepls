<template>
  <v-container fill-height fluid>
    <v-row>
      <v-col>
        <ReadyToOrder/>
        <Extras/>
        <Napkin/>
        <Ashtray/>
        <BeerWine/>
        <HotDrinks/>
      </v-col>
      <v-col>
        <CallToWaiter/>
        <AlcoGel/>
        <Cutlery/>
        <Menu/>
        <Bread/>
        <ColdDrinks/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-divider class="mb-4"/>
        <CheckPlease/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Cutlery from "@/components/Cutlery";
import Napkin from "@/components/Napkin";
import ReadyToOrder from "@/components/ReadyToOrder";
import AlcoGel from "@/components/AlcoGel";
import CallToWaiter from "@/components/CallToWaiter";
import Ashtray from "@/components/Ashtray";
import Menu from "@/components/Menu";
import ColdDrinks from "@/components/ColdDrinks";
import Bread from "@/components/Bread";
import HotDrinks from "@/components/HotDrinks";
import BeerWine from "@/components/BeerWine";
import CheckPlease from "@/components/CheckPlease";
import Extras from "@/components/Extras";

export default {
  name: "service",
  layout: "app",
  components: {
    Extras,
    CheckPlease,
    BeerWine,
    Cutlery,
    Napkin,
    ReadyToOrder,
    AlcoGel,
    CallToWaiter,
    Ashtray,
    Menu,
    ColdDrinks,
    Bread,
    HotDrinks
  },
  middleware: 'auth',
  fetch(ctx){
    if(!ctx.$auth.loggedIn){
      return ctx.redirect('/')
    }
  },
  mounted( ){
    if(!this.$auth.loggedIn){
      this.$router.push('/')
      return
    }
  }

}
</script>

<style scoped>

</style>
