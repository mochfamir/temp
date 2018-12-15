<template>
  <!-- <div class="home"> -->
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!-- </div> -->
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <BlogPost :search="search" />
      </div>
      <div class="col-md-4">
        <SearchBlogPost @widget-search="widgetSearch"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BlogPost from '@/components/BlogPost.vue';
import SearchBlogPost from '@/components/SearchBlogPost.vue';

export default {
  name: 'home',
  components: {
    BlogPost,
    SearchBlogPost,
  },
  data() {
    return {
      search: '',
    };
  },
  methods: {
    widgetSearch(value) {
      this.search = value;
    },
  },
};
</script>
