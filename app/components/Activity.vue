<template>
  <div>
    <v-row dense id="activity" class="overflow-y-auto ma-1 mb-4">
      <v-col>
        <v-card-text>fghfgh10</v-card-text>
        <v-divider/>
        <v-card-text>fghfgh10</v-card-text>
        <v-divider/>
        <v-card-text>fghfgh10</v-card-text>
        <v-divider/>
        <v-card-text>fghfgh10</v-card-text>
        <v-divider/>
        <v-card-text>fghfgh10</v-card-text>
        <v-divider/>
        <v-card-text>fghfgh10</v-card-text>
        <v-divider/>
        <v-card-text>fghfgh10</v-card-text>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Activity",
  mounted() {
    this.$nextTick(() => this.scrollToEnd());
  },
  methods:{
    scrollToEnd: function () {
      const chat = this.$el.querySelector('#activity')
      chat.scrollTop = chat.lastElementChild.offsetTop;
    }
  }
}
</script>

<style scoped>
#activity{
  height: 380px;
  max-height: 380px;
  background-color: #fff;
}
</style>
