import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  return new Vuex.Store({
    state: {
      paletteDrawerOpen: true //        leftDrawerOpen: true, // this.$q.platform.is.desktop,
    },
    getters: {
      paletteDrawerOpen: state => {
        return state.paletteDrawerOpen
      }
    },
    mutations: {
      paletteDrawerOpen (state, paletteDrawerOpen) {
        state.paletteDrawerOpen = paletteDrawerOpen
      }
    }
  })

}
