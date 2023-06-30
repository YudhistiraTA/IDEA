<script>
import { mapActions } from 'pinia';
import { useMainStore } from '../stores';
export default {
    props: ['data', 'on'],
    methods: {
        ...mapActions(useMainStore, ['addToWishlist']),
        handleWishlist() {
            this.addToWishlist(this.data.id);
        },
        handleDetail() {
            this.$router.push({ name: 'ProductView', params: { id: this.data.id } });
        }
    }
}
</script>
<template>
    <div class="col p-2">
        <div class="card p-3">
            <div class="d-flex justify-content-between align-items-center">
                <div class="mt-2">
                    <h4 class="text-uppercase">IDEA</h4>
                    <div class="mt-5 p-1">
                        <h5 class="text-uppercase mb-0">{{ data.Category.name }}</h5>
                        <h3 class="main-heading mt-0">{{ data.name }}</h3>
                    </div>
                </div>
                <div class="image img-container">
                    <img :src="data.imgUrl" class="img-thumbnail img-fluid card-img">
                </div>
            </div>
            <p class="description">{{ data.description }}</p>
            <div class="d-flex flex-column gap-1">
                <button class="btn btn-outline-primary" @click.prevent="handleDetail">View details</button>
                <button class="btn btn-outline-danger" v-if="on !== 'wishlist'" @click.prevent="handleWishlist">Add to wishlist</button>
            </div>
        </div>
    </div>
</template>