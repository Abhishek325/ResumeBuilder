<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>
<script>
import Header from "@/components/navigation/Header.vue";
export default {
  components: {
    Header,
  },
};
</script>
<style scoped></style>
