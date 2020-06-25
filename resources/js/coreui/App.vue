<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="dark"
      style="background:#800000 !important;"
      id="navbar"
    >
      <b-navbar-brand href="#">
         Ramashinta Resort & SPA
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />
      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <!-- Right aligned nav items -->
      </b-collapse>
    </b-navbar>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
// import Header from '././views/pages/Header.vue';
import Header from './views/pages/Header'
export default
{
  name      : 'App',
  components: { Header },
}
</script>
