<template>
  <div class="container">
    <div v-if="button">
      <a href="" @click.prevent="toogleButton">Add Article</a>
    </div>
    <div v-else>
      <a href="" @click.prevent="toogleButton">Show Article</a>
    </div>
    <div class="row-8" v-if="!button">
      <AddBlog />
    </div>
    <div v-else>
      <ListBlog :articles="articles" />
    </div>
  </div>
</template>

<script>
import AddBlog from '@/components/AddBlog.vue';
import ListBlog from '@/components/ListBlog.vue';

export default {
  name: 'myBlog',
  components: {
    AddBlog,
    ListBlog,
  },
  data() {
    return {
      button: true,
      articles: [],
      routes: '',
    };
  },
  created() {
    this.showArticles()
  },
  methods: {
    toogleButton() {
      if (this.button) {
        this.button = false;
        this.showArticles();
      } else {
        this.button = true;
      }
    },
    showArticles() {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/article/me',
        headers: {
          token: localStorage.getItem('access_token'),
        },
      })
        .then(({ data }) => {
          console.log(data, '===============')
          this.articles = data;
        })
        .catch((err) => {
          console.log(err.messsage);
        });
    },
  },
  watch: {
    articles(v) {
      console.log(v)
    }
  }
};
</script>
