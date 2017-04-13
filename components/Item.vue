<template>
  <v-card horizontal v-on:click="open" height="125px" class="item mb-4" hover>
    <v-card-row :img="img" height="125px"></v-card-row>
    <v-card-column class="teal white--text">
      <v-card-row>
        <v-spacer></v-spacer>
        <v-card-text>
          <h6>{{ title }}<span v-if="stars" class="stars pl-2">({{ stars }})</span></h6>
          <div class="description text-xs">{{ description }}</div>
          <div class="url text-xs">{{ url }}</div>
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
        stars: null,
        img: null
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
            console.log(response.data);
            this.img = response.data.owner.avatar_url + '&amp;s=150';
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
  .item .url {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item .stars {
    display: inline-block;
  }
</style>
