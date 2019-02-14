<template>
  <q-page class="q-pa-lg">
    <div>
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

  </q-page>
</template>

<style>
  #vue-bulma-editor {
    height: calc(100vh - 100px) !important;
  }
</style>

<script>
  const jsonSchemaBuilder = require('@wmfs/json-schema-builder')
  import Brace from 'vue-bulma-brace'
  import * as brace from 'brace'

  export default {
    name: 'PageIndex',
    components: {
      Brace
    },
    computed: {
    },
    mounted () {

      function collateModels(root, target) {

        target.propertyHints = []
        root.items.forEach(
          item => {
            const targetItem = JSON.parse(JSON.stringify(item))
            target.propertyHints.push(targetItem)
            if (item.typeHint === 'object') {
              collateModels(root.models[item.key], targetItem)
            }
          }
        )
      }
      this.editor = brace.edit('vue-bulma-editor')
      const output = {}
      collateModels(this.$store.state.models.$ROOT, output)
      this.editor.session.setValue(
        JSON.stringify(jsonSchemaBuilder.dslToJsonSchema(output), null, 2)
      )
      this.$nextTick(
        function () {
          this.$store.commit('paletteDrawerOpen', false)
        }
      )
    },
    methods: {
      codeChange: function (code) {
      }
    },
    data: function () {
      return {
        editor: null
      }
    }
  }
</script>
