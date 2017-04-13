<template>

  <v-list-group v-if="item.items.length > 0" v-model="active" :group="item.href">
    <v-list-tile slot="item">
      <v-list-tile-content v-on:click="active = !active">
        <v-list-tile-title ripple>{{ item.title }}</v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-action v-if="item.items.length > 0">
        <v-icon>keyboard_arrow_down</v-icon>
      </v-list-tile-action>
    </v-list-tile>


      <recursive-list-group v-for="i in item.items" :item="i" :key="i.title"></recursive-list-group>


  </v-list-group>

    <v-list-tile v-else :href="item.href" slot="item">
      <v-list-tile-content v-on:click="active = !active">
        <v-list-tile-title ripple>{{ item.title }}</v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-action v-if="item.items.length > 0">
        <v-icon>keyboard_arrow_down</v-icon>
      </v-list-tile-action>
    </v-list-tile>



</template>
<script>
  export default {
    props: [ 'item' ],
    data() {
      return {
        active: false
      }
    }
  }
</script>
