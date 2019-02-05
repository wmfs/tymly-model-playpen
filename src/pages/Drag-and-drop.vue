<template>
  <q-page class="q-pa-md">

    <q-modal v-model="propertyModalShowing">
      <div class="q-ma-md">
        <div >
          <img class="headerIcon" :src="'statics/'+currentItem.image">
        </div>

        <q-field>
          <q-input v-model="currentItem.key" stack-label="Key" />
        </q-field>

        <q-field>
          <q-input v-model="currentItem.title" stack-label="Title" />
        </q-field>

        <q-field>
          <q-checkbox v-model="currentItem.required" label="Required?" />
        </q-field>
        <q-field>
          <q-checkbox v-model="currentItem.multiple" label="Multiple?" />
        </q-field>
        <hr>

        <div>

          <q-btn class="q-ma-sm" icon="delete" color="red"
                 @click="propertyModalShowing = false"/>

          <q-btn class="q-ma-sm float-right" color="primary"
                 @click="propertyModalShowing = false"
                 label="OK"/>

          <q-btn class="q-ma-sm float-right" color="primary"
                 outline
                 @click="propertyModalShowing = false"
                 label="Cancel"/>


        </div>

      </div>
    </q-modal>

    <draggable v-model="modelItems" class="dragArea" :options="modelOptions" @choose="choose">
      <div :class="item.key === currentItem.key ? 'selectedModelItem' : 'model-item'" v-for="(item, index) in modelItems" :key="index">
        <q-icon class="q-mx-sm grab" name="drag_handle" size="2rem"/>
        <span>{{item.key}}</span>
        <q-btn class="float-right q-ma-sm" color="grey" size="large" icon="settings" flat @click.native="edit(index)"></q-btn>
      </div>
    </draggable>
  </q-page>
</template>

<style>

  .headerIcon {
    width: 40px;
    height: 40px;
    display: block;
    margin: auto;
  }

  .grab {
    height: 100%;
  }

  .selectedModelItem {
    height: 70px;
    width: 100%;
    display: block;
    background-color: #fff;
    outline: 0;
    border: 2px solid #027BE3;
    margin-bottom: 2px;
    margin-top: 2px;
    cursor: default;
    user-select: none;
  }

  .model-item {
    height: 70px;
    width: 100%;
    display: block;
    background-color: #fff;
    outline: 0;
    border: 1px solid rgba(0, 0, 0, .125);
    margin-bottom: 2px;
    margin-top: 2px;
    cursor: default;
    user-select: none;}


  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }

  .flip-list-move {
    transition: transform 0.5s;
  }

  .list-group {
    min-height: 20px;
  }

  .list-group-item i {
    cursor: pointer;
  }

  .workspace {
    min-height: 100%;
    background-color: #eeeeee;
  }

  .normal {
    background-color: grey;
  }


  .dragArea {
    min-height: 50px;
    border-color: darkgrey;
    border-style: dotted;
    border-width: medium;
    padding: 20px;
  }

</style>

<script>
  import draggable from 'vuedraggable'

  export default {
    name: 'DragAndDropPage',
    components: {
      draggable
    },
    computed: {
      paletteDrawerOpen: function () {
        return this.$store.state.paletteDrawerOpen
      },
      currentItem: function () {
        return this.$store.state.currentItem
      },
      modelItems: {
        get: function () {
          return this.$store.state.currentItems
        },
        set: function (v) {
          this.$store.commit('currentItems', v)
        }
      },
      propertyModalShowing: {
        get: function () {
          return this.$store.state.propertyModalShowing
        },
        set: function (v) {
          this.$store.commit('propertyModalShowing', v)
        }
      }
    },
    mounted () {
      this.$nextTick(
        function () {
          this.$store.commit('paletteDrawerOpen', true)
        }
      )
    },
    methods: {
      edit: function (idx) {
        this.$store.commit('setCurrentItem', idx)
        this.$store.commit('propertyModalShowing', true)
      },
      choose (event) {
        const idx = event.newIndex || event.oldIndex
        this.$store.commit('setCurrentItem', idx)
      }
    },
    data: function () {
      return {
        modelOptions: {
          sort: true,
          handle: '.grab',
          animation: 150,
          ghostClass: 'ghost',
          group: 'palette'
        }
      }
    }
  }
</script>
