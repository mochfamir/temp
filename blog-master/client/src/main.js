import Vue from 'vue';
import wysiwyg from 'vue-wysiwyg';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(wysiwyg, {
  image: {
    uploadURL: '/api/myEndpoint',
    dropzoneOptions: {},
  },
  maxHeight: '500px',
}); // config is optional. more below

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
