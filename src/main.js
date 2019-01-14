import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueSVGIcon from 'vue-svgicon';

import App from './App.vue';
import router from './router';
import store from './store';
import { GET_DATA } from '@store/constants';

Vue.use(BootstrapVue);
Vue.use(VueSVGIcon);

Vue.config.productionTip = false;

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/css/bootstrap-override.css';

store.dispatch(GET_DATA).then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
});
