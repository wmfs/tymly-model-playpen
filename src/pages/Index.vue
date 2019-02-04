<template>
  <q-page>

    <q-modal v-model="propertyModalShowing">
      <div class="q-ma-md">
        <h5>Properties</h5>
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

        <q-btn color="primary"
          @click="propertyModalShowing = false"
          label="Close"/>
      </div>
    </q-modal>


    <q-tabs inverted v-model="selectedTab" @select="tabChange">
      <!-- Tabs - notice slot="title" -->
      <q-tab slot="title" name="editor" icon="edit"/>
      <q-tab slot="title" name="json" icon="code"/>

      <q-tab-pane name="editor">
        <div class="q-pa-md">
          <draggable v-model="modelItems" class="dragArea" :options="modelOptions" @choose="choose">
            <div :class="item.key === currentItem.key ? 'selectedModelItem' : 'model-item'" v-for="(item, index) in modelItems" :key="index">
              <q-icon class="q-mx-sm grab" name="drag_handle" size="2rem"/>
              <span>{{item.key}}</span>
              <q-btn class="float-right q-ma-sm" icon="edit" @click.native="edit(index)"></q-btn>
            </div>
          </draggable>
        </div>

      </q-tab-pane>


      <q-tab-pane name="json">
        <div class="row" style="max-height: calc(100vh - 150px); min-height: calc(100vh - 150px);">
          <div class="col-12">
            <brace
              fontsize="12px"
              mode="json"
              codefolding="markbegin"
              softwrap="free"
              selectionstyle="text"
              highlightline
              style="height: 100%; width: 100%"
              @code-change="codeChange"
            />
          </div>
        </div>

      </q-tab-pane>
    </q-tabs>
  </q-page>
</template>

<style>

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

  @media only screen and (max-width: 767px) {
    #vue-bulma-editor {
      height: 300px !important;
    }
  }


</style>

<script>
  const jsonSchemaBuilder = require('@wmfs/json-schema-builder')
  import draggable from 'vuedraggable'
  import Brace from 'vue-bulma-brace'
  import * as brace from 'brace'

  export default {
    name: 'PageIndex',
    components: {
      draggable,
      Brace
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
      // this.editor = brace.edit('vue-bulma-editor')
      // this.editor.session.setValue('Hello! :-)')
    },
    methods: {
      edit: function (idx) {
        this.$store.commit('setCurrentItem', idx)
        this.$store.commit('propertyModalShowing', true)
      },
      tabChange (tabName) {
        const _this = this
        this.$nextTick(
          () => {
            if (tabName === 'json') {
              this.$store.commit('paletteDrawerOpen', false)
              _this.editor = brace.edit('vue-bulma-editor')
              _this.editor.session.setValue(
                JSON.stringify(jsonSchemaBuilder(
                  {
                    propertyHints: this.modelItems
                  }
                ), null, 2)
              )
            } else {
              this.$store.commit('paletteDrawerOpen', true)
            }
          }
        )
      },
      codeChange (e) {
        // this.cardscript = e
      },
      choose (event) {
        const idx = event.newIndex || event.oldIndex
        this.$store.commit('setCurrentItem', idx)
      }
    },
    data: function () {
      return {
        selectedTab: 'editor',
        modelOptions: {
          sort: true,
          handle: '.grab',
          animation: 150,
          ghostClass: 'ghost',
          group: 'palette'
        },
        counts: {}
      }
    }
  }
</script>
