<template>
  <v-container fill-height fluid>
    <v-row>
      <v-col>
        <ReadyToOrder/>
        <Napkin/>
        <Ashtray/>
        <BeerWine/>
        <HotDrinks/>
      </v-col>
      <v-col>
        <CallToWaiter/>
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
import CallToWaiter from "@/components/CallToWaiter";
import Ashtray from "@/components/Ashtray";
import Menu from "@/components/Menu";
import ColdDrinks from "@/components/ColdDrinks";
import Bread from "@/components/Bread";
import HotDrinks from "@/components/HotDrinks";
import BeerWine from "@/components/BeerWine";
import CheckPlease from "@/components/CheckPlease";

export default {
  name: "dashboard",
  layout: "app",
  components: {
    CheckPlease,
    BeerWine,
    Cutlery,
    Napkin,
    ReadyToOrder,
    CallToWaiter,
    Ashtray,
    Menu,
    ColdDrinks,
    Bread,
    HotDrinks
  },
  middleware: 'auth'
}
</script>

<style scoped>

</style>
