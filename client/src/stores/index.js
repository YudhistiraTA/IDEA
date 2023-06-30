import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'
const BASE_URL = 'https://authar.site'

export const useMainStore = defineStore('useMainStore', {
  state: () => ({
    isSigned: localStorage.getItem('access_token') ? true : false,
    homeData: {},
    wishlistData: {},
    detailData: {}
  }),
  getters: {

  },
  actions: {
    async handleForm(email, password, isLogin) {
      try {
        if (isLogin) {
          const { data } = await axios.post(BASE_URL + '/public/login', { email, password });
          localStorage.setItem("access_token", data.access_token);
          this.isSigned = true;
          this.router.push('/home');
          Swal.fire({
            title: "Welcome to IDEA!",
            icon: 'success'
          })
        }
        else {
          const { data } = await axios.post(BASE_URL + '/public/register', { email, password });
          localStorage.setItem("access_token", data.access_token);
          this.isSigned = true;
          this.router.push('/home');
          Swal.fire({
            title: "Welcome to IDEA!",
            icon: 'success'
          })
        }
      }
      catch (error) {
        Swal.fire({
          title: error.response.data.message + '!',
          icon: 'error'
        })
      }
    },
    handleLogout() {
      localStorage.clear();
      this.isSigned = false;
      this.router.push('/login');
      Swal.fire({
        title: "Logged out successfully!",
        text: "We hope to see you again!",
        icon: 'info'
      })
    },
    async productFetch(page, filter, search) {
      let params = { page, filter, search };
      const { data } = await axios.get(BASE_URL + '/public/products', { params });
      this.homeData = data;
    },
    async wishlistFetch() {
      const access_token = localStorage.getItem('access_token');
      const { data } = await axios.get(BASE_URL + '/public/wishlist', { headers: { access_token } });
      this.wishlistData = data.requestedData;
    },
    async addToWishlist(itemId) {
      try {
        const access_token = localStorage.getItem('access_token');
        await axios.post(BASE_URL + `/public/wishlist/add/${itemId}`, {}, { headers: { access_token } })
        Swal.fire({
          title: "Product added to wishlist!",
          icon: 'success'
        })
      }
      catch (error) {
        Swal.fire({
          title: "Error!",
          text: error,
          icon: 'error'
        })
      }
    },
    async detailFetch(id) {
      const access_token = localStorage.getItem('access_token');
      const { data } = await axios.get(BASE_URL + `/public/products/${id}`, { headers: { access_token } });
      this.detailData.data = data.requestedData;
      this.detailData.qr = data.qr;
    },
    async googleSign(token) {
      try {
        const { data } = await axios.post(BASE_URL + '/public/gsign', { token });
        localStorage.setItem("access_token", data.access_token);
        this.isSigned = true;
        this.router.push('/home');
        Swal.fire({
          title: "Welcome to IDEA!",
          icon: 'success'
        })
      }
      catch (error) {
        Swal.fire({
          title: error.response.data.message + '!',
          icon: 'error'
        })
      }
    }
  }
});
