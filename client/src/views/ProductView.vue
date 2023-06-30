<script>
import { mapActions, mapState } from 'pinia';
import Navbar from '../components/Navbar.vue';
import { useMainStore } from '../stores';
export default {
    name: 'ProductView',
    components: { Navbar },
    props: ['data'],
    methods: {
        ...mapActions(useMainStore, ['addToWishlist', 'detailFetch']),
        handleWishlist() {
            this.addToWishlist(this.$route.params.id);
        }
    },
    computed: {
        ...mapState(useMainStore, ['detailData'])
    },
    created() {
        this.detailFetch(this.$route.params.id);
    }
}
</script>
<template>
    <Navbar />
    <section class="py-5">
        <div class="container px-4 px-lg-5">
            <div class="row gx-4 gx-lg-5 align-items-center">
                <div class="col-md-6"><img class="card-img-top img-fluid mb-5 mb-md-0" :src="detailData.data.imgUrl"
                        alt="..." style="max-height: 500px; object-fit: contain;"></div>
                <div class="col-md-6">
                    <div class="small mb-1">{{ detailData.data.Category.name }}</div>
                    <h1 class="display-5 fw-bolder">{{ detailData.data.name }}</h1>
                    <div class="fs-5">
                        <span>{{ new Intl.NumberFormat('id-ID', {
                            style: 'currency', currency: 'IDR'
                        }).format(detailData.data.price) }}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-end" style="width: 200px; height: 200px;">
                        <div v-html="detailData.qr" style="width: 100%; height: 100%;"></div>
                    </div>
                    <p class="lead">{{ detailData.data.description }}</p>
                    <div class="d-flex">
                        <button class="btn btn-outline-dark flex-shrink-0" type="button" @click.prevent="handleWishlist">
                            Add to wishlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>