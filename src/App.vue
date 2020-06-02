<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>
<script>
import Header from "@/components/navigation/Header.vue";
import Footer from "@/components/navigation/Footer.vue";
export default {
  components: {
    Header,
    Footer,
  },
};
</script>
<style scoped></style>
