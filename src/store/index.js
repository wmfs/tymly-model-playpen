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
    editableProperty: {},
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
  state.currentItemKey = null
  state.currentItem = {}
  return new Vuex.Store(
    {
      state: state,
      getters: {
        editableProperty: state => {
          return state.editableProperty
        },
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
        ensureChildModelExists (state, options) {
          console.log('ensureChildModelExists', options)
          if (state.currentModel.models.hasOwnProperty(options.old) && options.new !== options.old) {
            // Rename occurred, so copy old to new, and delete the old one.
            state.currentModel.models[options.new] = state.currentModel.models[options.old]
            delete state.currentModel.models[options.old]
          } else {
            if (!state.currentModel.models.hasOwnProperty(options.new)) {
              state.currentModel.models[options.new] = {
                title: '',
                items: [],
                models: {}
              }
            }
          }
        },
        removeModel (state, key) {
          console.log('removeModel', key)
          if (state.currentModel.models.hasOwnProperty(key)) {
            delete state.currentModel.models[key]
          }
        },

        focusModel (state, key) {
          console.log('focusModel', key)

          if (key === '$ROOT') {
            state.currentModelPath = '$ROOT'
          } else {
            const idx = state.currentModelPath.indexOf(`.models.${key}`)
            if (idx === -1) {
              state.currentModelPath = state.currentModelPath + `.models.${key}`
            } else {
              state.currentModelPath = state.currentModelPath.slice(0, idx) + `.models.${key}`
            }
          }
          state.currentModel = dottie.get(state.models, state.currentModelPath)
          state.currentItems = state.currentModel.items
          state.currentItemKey = null
          state.currentItem = {}
        },

        editableProperty (state, value) {
          state.editableProperty = value
        },
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
        removeItem (state, idx) {
          state.currentItems.splice(idx, 1)
        },
        setCurrentItem (state, idx) {
          if (idx === null) {
            state.currentItem = {}
            state.currentItemKey = ''
          } else {
            state.currentItem = state.currentItems[idx]
            state.currentItemKey = state.currentItem.key
          }
        }
      }
    })
}
