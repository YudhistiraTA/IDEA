<script>
import { mapActions } from 'pinia';
import { useMainStore } from '../stores';
import { RouterLink } from 'vue-router';
export default {
    name: 'Navbar',
    props: ['on'],
    data() {
        return {
            search: null
        }
    },
    methods: {
        ...mapActions(useMainStore, ["handleLogout"]),
        searchQuery() {
            const { search } = this
            this.$router.push({ path: this.$route.fullPath, query: { search } });
        }
    }
}
</script>
<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <RouterLink to="/home" style="text-decoration: none; color: inherit;">
                <a class="navbar-brand" href="#">IDEA</a>
            </RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink to="/home" style="text-decoration: none; color: inherit;">
                            <a class="nav-link" :class="{ active: on === 'home' }" aria-current="page" href="#">Home</a>
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/wishlist" style="text-decoration: none; color: inherit;">
                            <a class="nav-link" :class="{ active: on === 'wishlist' }" aria-current="page" href="#">Wishlist</a>
                        </RouterLink>
                    </li>
                    <li class="nav-item" @click.prevent="handleLogout">
                        <a class="nav-link" style="color: maroon;" href="#">Logout</a>
                    </li>
                </ul>
                <!-- SEARCH FORM START -->
                <form class="d-flex" role="search" v-if="on === 'home'" @submit.prevent="searchQuery">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                        v-model="search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                <!-- SEARCH FORM END -->
            </div>
        </div>
    </nav>
</template>