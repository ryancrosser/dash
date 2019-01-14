<template>
  <div>
    <b-navbar toggleable="md" type="light" variant="light">
      <b-navbar-brand to="/">
        <img src="assets/images/icons/dash-running.png" alt="Dash Logo" style="height:27px">
        Dash
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Services" right>
            <b-dropdown-item
              v-for="service in data"
              :key="service.name"
              :to="service.link"
            >{{service.name}}</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['data'])
  }
};
</script>

<style>
</style>
