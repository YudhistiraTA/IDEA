<script>
export default {
    name: 'PaginationButtons',
    props: ['totalPages', 'currentPage'],
    methods: {
        changePage(page) {
            if (page > 0 && page <= this.totalPages) {
                this.$router.push({ path: this.$route.fullPath, query: { ...this.$route.query, page } });
            }
        }
    }
}
</script>

<template>
    <nav class="my-5">
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }" @click.prevent="changePage(currentPage - 1)">
                <span class="page-link">Previous</span>
            </li>
            <li class="page-item" v-for="page in totalPages" :key="page" @click.prevent="changePage(page)">
                <a class="page-link" :class="{ active: currentPage === page }">
                    {{ page }}
                </a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }"
                @click.prevent="changePage(currentPage + 1)">
                <a class="page-link" href="#">Next</a>
            </li>
        </ul>
    </nav>
</template>
