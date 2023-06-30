<script>
import EntryForm from '../components/EntryForm.vue';
export default {
    name: 'EntryView',
    components: { EntryForm },
    props: ['formType']
}
</script>
<template>
    <section class="container-fluid my-5" id="home-section">
        <section class="row row-md-9 ms-sm-auto row-lg-10 px-md-4 column-gap-3 mb-5" id="dashboard-section">
            <EntryForm :formType="formType" />
        </section>
    </section>
    <!-- PRE SIGN PAGE END -->
</template>