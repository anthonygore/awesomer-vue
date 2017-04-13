<template>
  <div class="row">
    <div class="col sm6">
      <Item v-for="(item, index) in leftCol" :key="index" :title="item.title" ></Item>
    </div>
    <div class="col sm6">
      <Item v-for="(item, index) in rightCol" :key="index" :title="item.title"></Item>
    </div>
  </div>
</template>
<script>
  import data from '~assets/json/data.json';
  import Item from '~components/Item.vue';

  export default {
    props: [ 'categories' ],
    data() {
      return {
        data
      }
    },
    computed: {
      filtered() {
        return data.filter(item => {
          let match = true;
          item.href.split('/').forEach((category, index) => {
            if (this.categories[index] && category !== this.categories[index]) {
              match = false;
            }
          });
          return match;
        });
      },
      leftCol() {
        return this.filtered.map((item, index) => {
          if ((index + 1) % 2) {
            return item;
          }
        }).filter(item => !!item);
      },
      rightCol() {
        return this.filtered.map((item, index) => {
          if (index % 2) {
            return item;
          }
        }).filter(item => !!item);
      }
    },
    components: {
      Item
    }
  }
</script>