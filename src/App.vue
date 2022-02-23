<template>
  <main-header />
  <main-page />
  <main-footer />
</template>

<script>
import MainPage from "./components/MainPage.vue";
import MainFooter from "./components/MainFooter.vue";
import MainHeader from "./components/MainHeader.vue";

export default {
  name: "App",
  components: {
    MainPage,
    MainFooter,
    MainHeader,
  },
};
</script>
