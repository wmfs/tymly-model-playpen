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
      this.editor = brace.edit('vue-bulma-editor')
      this.editor.session.setValue(
        JSON.stringify(jsonSchemaBuilder.dslToJsonSchema(
          {
            propertyHints: this.$store.state.currentItems
          }
        ), null, 2)
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
