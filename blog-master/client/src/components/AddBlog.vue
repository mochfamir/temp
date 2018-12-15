<template>
    <div class="container mt-5">
      <div class="row justify-content-md-center">
        <h3>Title</h3>
        <wysiwyg class="title-blog" v-model="title" />
      </div>
      <div class="row justify-content-md-center">
        <hr>
        <hr>
      </div>
      <div class="row justify-content-md-center">
        <h3>Content</h3>
        <wysiwyg class="text-blog" v-model="content" />
      </div>
      <div class="row justify-content-md-center">
        <button @click="addArticle">Submit</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'AddBlog',
  data() {
      return {
          title: '',
          content: '',
      }
  },
  watch: {
    title(value) {
      this.title = value;
    },
    content(value, old) {
      this.content = value;
    },
  },
  methods: {
    addArticle() {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/article',
        headers: {
          token: localStorage.getItem('access_token'),
        },
        data: {
          title: this.title,
          content: this.content,
          createdAt: new Date(),
        },
      })
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
};
</script>

<style>
  @import "~vue-wysiwyg/dist/vueWysiwyg.css";

  .title-blog {
    height: 100px;
  }
</style>
