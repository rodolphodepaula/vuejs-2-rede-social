// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import slug from 'slug'

Vue.use(Vuex)

/* let slug2 = function(string){
  string = string.replace(' ', '_');
  return string;
}
 */
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$urlAPI = 'https://rodolphodepaula.com.br/public/portifolio/socialws/public/api/';
Vue.prototype.$slug = slug;

var store = {
  state:{
   usuario: sessionStorage.getItem('usuario') ? JSON.parse(sessionStorage.getItem('usuario')) : null,
   conteudosLinhaTempo: []
  },
  getters:{
    getUsuario: state => {
      return state.usuario
    },

    getToken:state => {
      return state.usuario.token
    },

    getConteudosLinhaTempo:state =>{
        return state.conteudosLinhaTempo
    }
  },
  mutations:{
    setUsuario(state, n){
      state.usuario = n;
    },
    setConteudosLinhaTempo(state, n){
      state.conteudosLinhaTempo = n;
    },
    setPaginacaoConteudosLinhaTempo(state, lista){
      for(let item of lista){
        state.conteudosLinhaTempo.push(item);

      }
    },

  }
};

// Código da diretiva
Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: new Vuex.Store(store),
  router,
  components: { App },
  template: '<App/>'
})
