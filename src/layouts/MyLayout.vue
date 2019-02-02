<template>
  <q-layout>
    <q-layout-header>
      <q-toolbar
        color="primary"
      >
        <q-toolbar-title>
          Tymly Model Editor
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
