<template>
  <q-layout>
    <q-layout-header>
      <q-toolbar color="primary">
        <q-toolbar-title>Tymly Model</q-toolbar-title>
        <q-btn flat dense round @click.native="changeNavDrawer" aria-label="Menu">
          <q-icon name="menu"/>
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-model="paletteDrawerOpen" :width="60" :behavior="'desktop'" :mini="true"
                     :content-class="'palette-drawer-extras'">
      <draggable v-model="paletteItems" :options="paletteOptions" :clone="clone" @end="drop">
        <div class="palette-item" v-for="(item, index) in paletteItems" :key="item.typeHint">
          <img class="paletteIcon" :src="'statics/'+item.image">
        </div>
      </draggable>
    </q-layout-drawer>

    <q-layout-drawer v-model="navDrawerOpen" side="right">
      <q-list highlight link>
        <q-list-header>Editors</q-list-header>
        <q-item :to="{name: 'drag-and-drop'}">
          <q-item-side left>
            <q-item-tile icon="edit"/>
          </q-item-side>
          <q-item-main label="Drag-and-drop"/>
        </q-item>
        <q-item :to="{name: 'text-editor'}">
          <q-item-side left>
            <q-item-tile icon="code"/>
          </q-item-side>
          <q-item-main label="Code Editor"/>
        </q-item>
      </q-list>
    </q-layout-drawer>


    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {
    name: 'Layout',
    computed: {
      paletteDrawerOpen: {
        get: function () {
          return this.$store.state.paletteDrawerOpen
        },
        set: function (value) {
          this.$store.commit('paletteDrawerOpen', value)
        }
      }
    },
    components: {
      draggable
    },
    methods: {
      changeNavDrawer () {
        this.navDrawerOpen = !this.navDrawerOpen
      },
      drop: function (event) {
        this.$store.commit('setCurrentItem', event.newIndex)
        this.$nextTick(
          () => {
            this.$store.commit('propertyModalShowing', true)
          }
        )
      },
      clone: function (original) {
        this.counts[original.typeHint]++
        const key = `${original.typeHint}${this.counts[original.typeHint]}`
        return {
          typeHint: original.typeHint,
          title: '',
          required: false,
          multiple: false,
          example: '',
          image: original.image,
          key: key
        }
      }
    },
    data () {
      const d = {
        navDrawerOpen: this.$q.platform.is.desktop,
        paletteOptions: {
          sort: false,
          ghostClass: 'ghost',
          group: {
            name: 'palette',
            pull: 'clone',
            put: false
          }
        },
        paletteItems: [
          {
            typeHint: 'string',
            image: 'icons8-typography-filled-50.png'
          },
          {
            typeHint: 'integer',
            image: 'icons8-number-1-filled-50.png'
          },
          {
            typeHint: 'boolean',
            image: 'icons8-toggle-on-filled-50.png'
          },
          {
            typeHint: 'date',
            image: 'icons8-event-50.png'
          },
          {
            typeHint: 'dateTime',
            image: 'icons8-watch-50.png'
          },
          {
            typeHint: 'email',
            image: 'icons8-email-filled-50.png'
          },
          {
            typeHint: 'object',
            image: 'icons8-registry-editor-50.png'
          }
        ],
        counts: {}
      }

      d.paletteItems.forEach(
        paletteItem => {
          d.counts[paletteItem.typeHint] = 0
        }
      )

      return d
    }
  }
</script>

<style>

  .palette-drawer-extras {
    overflow-x: hidden;
  }

  .paletteIcon {
    width: 40px;
    height: 40px;
    display: block;
    margin: 5px;
  }

  .palette-item {
    margin: 5px;
    height: 50px;
    width: 50px;
    display: block;
    background-color: #fff;
    outline: 0;
    border: 1px solid rgba(0, 0, 0, .125);
    cursor: default;
    user-select: none;
  }
</style>
