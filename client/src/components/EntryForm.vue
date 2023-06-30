<script>
import { RouterLink } from 'vue-router';
import { mapActions } from 'pinia';
import { useMainStore } from '../stores';
export default {
    name: 'EntryForm',
    props: ['formType'],
    data() {
        return {
            isLogin: false,
            form: {
                email: null,
                password: null
            }
        }
    },
    created() {
        if (this.formType === 'Login') this.isLogin = true;
    },
    watch: {
        formType(newFormType) {
            if (newFormType === 'Login') {
                this.isLogin = true;
            } else {
                this.isLogin = false;
            }
        }
    },
    methods: {
        ...mapActions(useMainStore, ["handleForm", "googleSign"]),
        handleSubmit() {
            this.handleForm(this.form.email, this.form.password, this.isLogin);
        },
        callback(response) {
            // This callback will be triggered when the user selects or login to
            // his Google account from the popup
            this.googleSign(response.credential);
        }
    }
}
</script>
<template>
    <section class="container text-center" id="entry-form-section">
        <div class="col-12 col-lg-8 offset-lg-2 my-5">
            <form id="entry-form-form" @submit.prevent="handleSubmit">
                <div class="row border border-1 rounded p-5 shadow-sm">
                    <h4 class="mb-4">{{ formType }}</h4>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="email-label">Email</span>
                            <input type="email" class="form-control" placeholder="Email" aria-label="Email"
                                aria-describedby="email-label" id="email" v-model="form.email">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="password-label">Password</span>
                            <input type="password" class="form-control" placeholder="Password" aria-label="Password"
                                aria-describedby="password-label" id="password" v-model="form.password">
                        </div>
                    </div>
                </div>
                <div class="col d-flex justify-content-center gap-3 my-3">
                    <RouterLink style="text-decoration: none; color: inherit;" :to="isLogin ? '/register' : '/login'">
                        <button type="button" class="btn btn-outline-danger btn-lg mt-3">
                            {{ isLogin ? 'Register' : 'Login' }}
                        </button>
                    </RouterLink>
                    <button type="submit" class="btn btn-outline-primary btn-lg mt-3">Submit</button>
                </div>
                <GoogleLogin :callback="callback" />
            </form>
        </div>
    </section>
</template>