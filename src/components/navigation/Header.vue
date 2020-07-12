<template>
  <div @mouseleave="showColorPicker = false">
    <link
      rel="stylesheet"
      type="text/css"
      :href="`css/themes/${themeOptions.name}.css`"
    />
    <div class="navbar-fixed">
      <nav>
        <div class="nav-wrapper">
          <p class="brand-logo truncate center">Resume Builder</p>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger"
            ><i class="material-icons">menu</i></a
          >
          <ul id="nav-mobile" class="hide-on-med-and-down">
            <li v-for="(menu, index) in menuItems" :key="index">
              <router-link :to="menu.link">{{ menu.label }}</router-link>
            </li>
          </ul>
          <div class="right">
            <button
              class="btn-flat waves-effect waves-default white-text"
              style="margin-right:1rem"
              @click="showColorPicker = !showColorPicker"
            >
              <i class="material-icons" style="margin-top:-1rem"
                >format_color_fill</i
              >
            </button>
          </div>
        </div>
      </nav>
    </div>
    <ul class="sidenav" id="mobile-demo">
      <li v-for="(menu, index) in menuItems" :key="'side' + index">
        <router-link :to="menu.link">{{ menu.label }}</router-link>
      </li>
    </ul>
    <ThemePickerMenu v-if="showColorPicker" />
  </div>
</template>
<script>
import ThemePickerMenu from "./ThemePickerMenu";
import STORAGE_SERVICE from "../../services/persistence";

export default {
  components: {
    ThemePickerMenu,
  },
  data() {
    return {
      showColorPicker: false,
      menuItems: [
        {
          link: "/",
          label: "Home",
        },
        {
          link: "/templates",
          label: "Templates",
        },
        {
          link: "/about",
          label: "About",
        },
      ],
    };
  },
  computed: {
    themeOptions() {
      return this.$store.state.theme || { name: "indigo" };
    },
  },
  mounted() {
    const theme = STORAGE_SERVICE.getTheme();
    this.$store.commit("switchTheme", theme);
  },
};
</script>
<style scoped>
.brand-logo {
  font-weight: 300;
  margin-top: 0;
}
.router-link-exact-active {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
