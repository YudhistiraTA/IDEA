<script>
import Navbar from '../components/Navbar.vue';
import Card from '../components/Card.vue';
import { mapActions, mapState } from 'pinia';
import { useMainStore } from '../stores';
export default {
  name: "HomeView",
  components: { Navbar, Card },
  methods: {
    ...mapActions(useMainStore, ['wishlistFetch']),
  },
  computed: {
    ...mapState(useMainStore, ['wishlistData'])
  },
  created() {
    this.wishlistFetch();
  }
}
</script>
<template>
    <Navbar on="wishlist" />
    <main>
      <section class="container-fluid my-5" id="home-section">
        <section class="row row-md-9 ms-sm-auto row-lg-10 px-md-4 column-gap-3 mb-5" id="dashboard-section">
          <div>
            <h1 class="text-secondary text-center">WISHLIST</h1>
          </div>
          <div class="row row-cols-1 row-cols-md-4 g-4">
            <Card v-for="data in wishlistData" :data="data.Product" on="wishlist"/>
          </div>
        </section>
      </section>
    </main>
  </template>