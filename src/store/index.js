import Vue from 'vue'
import Vuex from 'vuex'
const dottie = require('dottie')

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const state = {
    paletteDrawerOpen: true,
    propertyModalShowing: false,
    currentModelPath: '$ROOT',
    models: {
      '$ROOT': {
        title: '',
        items: [],
        models: {}
      }
    }
  }
  state.currentModel = dottie.get(state.models, state.currentModelPath)
  state.currentItems = state.currentModel.items
  state.currentItemIdx = null
  state.currentItem = {}
  return new Vuex.Store(
    {
      state: state,
      getters: {
        paletteDrawerOpen: state => {
          return state.paletteDrawerOpen
        },
        currentItems: state => {
          return state.currentItems
        },
        propertyModalShowing: state => {
          return state.propertyModalShowing
        }
      },
      mutations: {
        propertyModalShowing (state, value) {
          state.propertyModalShowing = value
        },
        paletteDrawerOpen (state, value) {
          state.paletteDrawerOpen = value
        },
        currentItems (state, value) {
          dottie.set(state.models, state.currentModelPath + '.items', value)
          state.currentItems = dottie.get(state.models, state.currentModelPath + '.items')
        },
        setCurrentItem (state, idx) {
          state.currentItemIdx = idx
          state.currentItem = state.currentItems[idx]
        }
      }
    })

}
