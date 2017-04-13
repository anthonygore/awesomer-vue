<template>
  <v-card horizontal v-on:click="open" height="125px" class="item mb-4" hover>
    <v-card-column class="primary">
      <v-card-row>
        <v-spacer></v-spacer>
        <v-card-text>
          <h6 class="title white--text">{{ title }}<span v-if="stars" class="stars pl-2 secondary--text">({{ stars }})</span></h6>
          <div class="description text-xs accent--text">{{ description }}</div>
          <div class="url text-xs secondary--text">{{ url }}</div>
        </v-card-text>
      </v-card-row>
    </v-card-column>
  </v-card>
</template>
<script>
  import axios from 'axios';

  export default {
    props: [ 'title', 'description', 'url' ],
    data() {
      return {
        stars: null
      };
    },
    methods: {
      open() {
        window.open(this.url);
      },
      getLocation(url) {
        var l = document.createElement("a");
        l.href = url;
        return l;
      }
    },
    mounted() {
      let url = this.getLocation(this.url);
      if (url.hostname === 'github.com') {
        axios.get('https://api.github.com/repos' + url.pathname + '').then((response) => {
          if (response.status === 200) {
            this.stars = response.data.stargazers_count;
          }
        });
      }
    }
  }
</script>
<style>
  .item {
    cursor: pointer;
  }
  .item > div:first-child {
    flex-shrink: 0;
  }

  .item > div:last-child {
    min-width: 0;
  }

  .item .description {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
  }
  .item .url {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item .stars {
    display: inline-block;

  }
</style>
