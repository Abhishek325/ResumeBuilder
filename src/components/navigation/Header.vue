<template>
  <div>
    <div class="navbar-fixed">
      <nav>
        <div class="nav-wrapper">
          <a href="#" class="brand-logo center">ResumeBuilder</a>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger"
            ><i class="material-icons">menu</i></a
          >
          <ul id="nav-mobile" class="hide-on-med-and-down">
            <li v-for="(menu, index) in menuItems" :key="index">
              <router-link :to="menu.link">{{ menu.label }}</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <ul class="sidenav" id="mobile-demo">
      <li v-for="(menu, index) in menuItems" :key="'side' + index">
        <router-link :to="menu.link">{{ menu.label }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
};
</script>
