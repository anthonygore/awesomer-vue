<template>
  <v-app sidebar-under-toolbar sidebar="left-fixed">
    <v-toolbar fixed>
      <v-toolbar-side-icon @click.native.stop="sidebar = !sidebar" class="hidden-sm-and-up"/>
      <v-toolbar-title>
        <img src="~static/logo.png" class="pr-3">
        <div>Awesome(r) Vue</div>
      </v-toolbar-title>
    </v-toolbar>
    <main>
      <v-sidebar v-model="sidebar" :mobileBreakPoint="576" fixed>
        <v-list>
          <recursive-list-group v-for="item in categories" :item="item" :key="item.title"></recursive-list-group>
        </v-list>
      </v-sidebar>
      <v-content>
        <v-container fluid>
          <Display :categories="cats"></Display>
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>
  import categories from '~assets/json/categories.json';
  import Display from '~components/Display.vue';

  export default {
    data() {
      return {
        sidebar: true,
        categories
      }
    },
    components: {
      Display
    },
    computed: {
      cats() {
        return this.$route.path.split('/').slice(1);
      }
    }
  }
</script>

<style scoped>
  .title {
    padding-left: 20px;
  }

  .toolbar__title {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .toolbar__title > img {
    height: 40px;
  }

  .toolbar__title > div {

  }

  .content {
    margin: 75px 0 0 310px;
  }
</style>
