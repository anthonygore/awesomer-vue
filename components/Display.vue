<template>
  <div>
    <div class="row">
      <div class="col sm6">
        <Item v-for="(item, index) in leftCol" :key="index" :title="item.title" ></Item>
      </div>
      <div class="col sm6">
        <Item v-for="(item, index) in rightCol" :key="index" :title="item.title"></Item>
      </div>
    </div>
    <div class="row">
      <v-pagination v-bind:length.number="pages" v-model="page" />
    </div>
  </div>
</template>
<script>
  import data from '~assets/json/data.json';
  import Item from '~components/Item.vue';

  const PAGE_SIZE = 10;

  export default {
    props: [ 'categories' ],
    data() {
      return {
        data,
        page: 1
      }
    },
    computed: {
      pages() {
        return Math.ceil(this.filtered.length / PAGE_SIZE);
      },
      from() {
        return (this.page - 1) * PAGE_SIZE;
      },
      to() {
        return (this.page * PAGE_SIZE);
      },
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
        return this.filtered.slice(this.from, this.to).map((item, index) => {
          if ((index + 1) % 2) {
            return item;
          }
        }).filter(item => !!item);
      },
      rightCol() {
        return this.filtered.slice(this.from, this.to).map((item, index) => {
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

