<template>
  <div>
    <div class="row">
      <div>
        <v-breadcrumbs divider="/">
          <v-breadcrumbs-item v-for="item in breadcrumbs" :key="item" :href="item.href" target="_self">
            {{ item.text }}
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </div>
    </div>
    <div class="row">
      <v-col xs12 md6>
        <v-pagination v-bind:length.number="pages" v-model="page" />
      </v-col>
      <v-col xs12 md6>
        <ul class="sort">
          <v-subheader>Sort</v-subheader>
          <li>
            <v-radio label="A - Z" primary v-model="sort" value="a2z" light />
          </li>
          <li>
            <v-radio label="Z - A" primary v-model="sort" value="z2a" light />
          </li>
          <li>
            <v-radio label="Stars" primary v-model="sort" value="stars"/>
          </li>
        </ul>
      </v-col>
    </div>
    <div class="row">
      <div class="col sm6">
        <Item v-for="item in leftCol" :key="item.url" :title="item.title" :description="item.description" :url="item.url"></Item>
      </div>
      <div class="col sm6">
        <Item v-for="item in rightCol" :key="item.url" :title="item.title" :description="item.description" :url="item.url"></Item>
      </div>
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
        page: 1,
        sort: 'a2z'
      }
    },
    computed: {
      breadcrumbs() {
        return this.categories.map((item, index) => {
          let href = '';
          for (let i = index; i >= 0; i--) {
            href = this.categories[i] + (href.length ? '/' + href : '');
          }
          href = '/' + href;
          return {
            text: item,
            href
          };
        });
      },
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
        return data
        .sort((a, b) => {
          switch(this.sort) {
            case 'a2z':
              return a.title < b.title ? -1 : 1;
              break;
            case 'z2a':
              return a.title < b.title ? 1 : -1;
              break;
            case 'stars':
              return 1;
              break;
          }
        })
        .filter(item => {
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
<style>
  .sort {
    list-style: none;
    display: flex;
  }
  .sort li {
    flex: 1 1 auto;
  }
</style>

