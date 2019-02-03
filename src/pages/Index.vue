<template>
  <q-page>
    <q-tabs inverted v-model="selectedTab" @select="tabChange">
      <!-- Tabs - notice slot="title" -->
      <q-tab slot="title" name="editor" icon="edit"/>
      <q-tab slot="title" name="json" icon="code"/>

      <q-tab-pane name="editor">
        <div class="row">

          <div class="col-8 q-pa-sm workspace">
            <h4>Model</h4>

            <div>
              <draggable v-model="modelItems" class="dragArea" :options="modelOptions"
                         @choose="setPropertiesFromDragEvent">
                <div :class="item.key === currentProperty.key ? 'selectedModelItem' : 'model-item'" v-for="(item, index) in modelItems" :key="index">
                  <pre>{{item.key}}</pre>
                  <p>{{item.title}}</p>
                </div>
              </draggable>
            </div>

          </div>

          <div class="col-4 q-pa-sm">

            <!--<q-page-sticky position="top-right" :offset="[0, 70]">-->
            <div>
              <div v-if="!currentProperty.hide">

                <h6>Property</h6>
                <q-field>
                  <q-input stack-label="Key" v-model="currentProperty.key"/>
                </q-field>

                <q-field>
                  <q-input stack-label="Title" v-model="currentProperty.title"/>
                </q-field>

                <q-field>
                  <q-input stack-label="Example" v-model="currentProperty.example"/>
                </q-field>

                <q-field>
                  <q-checkbox v-model="currentProperty.required" label="Required?"/>
                </q-field>

                <q-field>
                  <q-checkbox v-model="currentProperty.multiple" label="Multiple?"/>
                </q-field>
              </div>
            </div>
            <!--</q-page-sticky>-->

          </div>
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

  .selectedModelItem {
    height: 70px;
    width: 100%;
    display: block;
    background-color: #fff;
    outline: 0;
    border: 5px solid #027BE3;
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
    mounted () {
      // this.editor = brace.edit('vue-bulma-editor')
      // this.editor.session.setValue('Hello! :-)')
    },
    methods: {
      tabChange (tabName) {
        const _this = this
        this.$nextTick(
          () => {
            console.log('>>>>>', tabName)
            if (tabName === 'json') {
              _this.editor = brace.edit('vue-bulma-editor')
              _this.editor.session.setValue(
                JSON.stringify(jsonSchemaBuilder(
                  {
                    propertyHints: this.modelItems
                  }
                ), null, 2)
              )
            }
          }
        )
      },
      codeChange (e) {
        // this.cardscript = e
      },
      setPropertiesFromDragEvent (event) {
        const idx = event.newIndex || event.oldIndex
        this.currentProperty = this.modelItems[idx]
      }
    },
    data: function () {
      return {
        currentProperty: {
          hide: true
        },
        selectedTab: 'editor',
        modelOptions: {
          sort: true,
          animation: 150,
          ghostClass: 'ghost',
          group: 'palette'
        },
        modelItems: [],
        counts: {}
      }
    }
  }
</script>
