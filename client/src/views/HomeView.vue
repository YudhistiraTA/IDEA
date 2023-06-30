<script>
import Navbar from '../components/Navbar.vue';
import Card from '../components/Card.vue';
import PaginationButtons from '../components/PaginationButtons.vue';
import { mapActions, mapState } from 'pinia';
import { useMainStore } from '../stores';
export default {
  name: "HomeView",
  components: { Navbar, Card, PaginationButtons },
  methods: {
    ...mapActions(useMainStore, ['productFetch']),
  },
  computed: {
    ...mapState(useMainStore, ['homeData'])
  },
  created() {
    const { page, search, filter } = this.$route.query;
    this.productFetch(page, filter, search);
  },
  watch: {
    '$route.query': {
      handler: function (newQuery) {
        const { page, search, filter } = newQuery;
        this.productFetch(page, filter, search);
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<template>
  <Navbar on="home" />
  <main>
    <section class="container-fluid my-5" id="home-section">
      <section class="row row-md-9 ms-sm-auto row-lg-10 px-md-4 column-gap-3 mb-5" id="dashboard-section">
        <div>
          <h1 class="text-secondary text-center">HOME</h1>
        </div>
        <div class="row row-cols-1 row-cols-md-4 g-4">
          <Card v-for="product in homeData.products" :data="product" />
        </div>
        <PaginationButtons v-if="homeData.totalPages > 1" :totalPages="homeData.totalPages"
          :currentPage="homeData.currentPage" />
      </section>
    </section>
  </main>
</template>
