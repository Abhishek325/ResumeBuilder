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
            <li><router-link to="/">Dashboard</router-link></li>
            <li><router-link to="/templates">Templates</router-link></li>
          </ul>
        </div>
      </nav>
    </div>
    <ul class="sidenav" id="mobile-demo">
      <li><router-link to="/">Dashboard</router-link></li>
      <li><router-link to="/templates">Templates</router-link></li>
    </ul>
  </div>
</template>
