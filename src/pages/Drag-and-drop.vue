<template>
  <q-page class="q-pa-md">

    <q-modal v-model="propertyModalShowing" no-backdrop-dismiss @escape-key="cancelEdit">
      <div class="q-ma-md">
        <div>
          <img class="headerIcon" :src="'statics/'+editableProperty.image">
        </div>

        <q-select
          stack-label="Data Type"
          separator
          v-model="editableProperty.typeHint"
          :options="dataItemOptions(editableProperty.category)"
        />

        <q-field>
          <q-input v-model="editableProperty.key" stack-label="Key"/>
        </q-field>

        <q-field>
          <q-input v-model="editableProperty.title" stack-label="Title"/>
        </q-field>

        <q-field>
          <q-checkbox v-model="editableProperty.primary" label="Primary?"/>
        </q-field>

        <q-field>
          <q-checkbox v-model="editableProperty.required" label="Required?"/>
        </q-field>
        <q-field>
          <q-checkbox v-model="editableProperty.multiple" label="Multiple?"/>
        </q-field>
        <hr>

        <div>

          <q-btn class="q-ma-sm" icon="delete" color="red"
                 @click="deleteEdit"/>

          <q-btn class="q-ma-sm float-right" color="primary"
                 @click="saveEdit"
                 label="OK"/>

          <q-btn v-if="!editableProperty.firstEdit" class="q-ma-sm float-right" color="primary"
                 outline
                 @click="cancelEdit"
                 label="Cancel"/>

        </div>

      </div>
    </q-modal>

    <draggable v-model="modelItems" class="dragArea" :options="modelOptions" @choose="choose">
      <div :class="item.key === currentItemKey ? 'selectedModelItem' : 'model-item'"
           v-for="(item, index) in modelItems" :key="index">
        <q-icon class="q-mx-sm grab" name="drag_handle" size="2rem"/>
        <span>{{item.key}}</span>
        <div class="float-right q-py-sm">
          <q-btn v-if="item.category==='object'" color="grey" size="medium" icon="list_alt" flat
                 @click.native="focusObject(index)"></q-btn>

          <q-btn color="grey" size="medium" icon="settings" flat
                 @click.native="edit(index)"></q-btn>

        </div>


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
    user-select: none;
  }


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

  const builder = require('@wmfs/json-schema-builder')
  const dataTypesByCategory = builder.TYPES.getDataItemsByCategory()

  export default {
    name: 'DragAndDropPage',
    components: {
      draggable
    },
    computed: {
      paletteDrawerOpen: function () {
        return this.$store.state.paletteDrawerOpen
      },
      editableProperty: {
        get: function () {
          return this.$store.state.editableProperty
        },
        set: function () {
          this.$store.commit('editableProperty', v)
        }
      },
      currentItemKey: function () {
        return this.$store.state.currentItemKey
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
      dataItemOptions: function (category) {
        if (category) {
          if (category === 'object') {
            return [
              {
                value: 'object',
                label: 'Object'
              }
            ]
          } else {
            return dataTypesByCategory[category].map(
              dt => {
                return {
                  value: dt.name,
                  label: dt.title
                }
              }
            )
          }
        } else {
          return []
        }
      },
      cancelEdit: function () {
        this.propertyModalShowing = false
      },
      deleteEdit: function () {
        const currentItemKey = this.$store.state.currentItemKey
        let idx = 0
        let idxToRemove = null
        this.$store.state.currentItems.forEach(
          (item) => {
            if (item.key === currentItemKey) {
              idxToRemove = idx
            }
            idx++
          }
        )
        this.$store.commit('removeItem', idxToRemove)
        this.propertyModalShowing = false
        this.$store.commit('setCurrentItem', null)
      },
      saveEdit: function () {
        // Find item we're targeting
        const currentItemKey = this.$store.state.currentItemKey
        const valuesToApply = this.$store.state.editableProperty
        let idx = 0
        this.$store.state.currentItems.forEach(
          (item) => {
            if (item.key === currentItemKey) {
              item.example = valuesToApply.example
              item.key = valuesToApply.key
              item.multiple = valuesToApply.multiple
              item.required = valuesToApply.required
              item.primary = valuesToApply.primary
              item.title = valuesToApply.title
              item.firstEdit = false
              this.$store.commit('setCurrentItem', idx)
            }
            idx++
          }
        )
        this.propertyModalShowing = false
      },
      focusObject (idx) {
        console.log(idx)
      },
      edit: function (idx) {
        this.$store.commit('setCurrentItem', idx)
        this.$store.commit('editableProperty', JSON.parse(JSON.stringify(this.$store.state.currentItem)))
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
