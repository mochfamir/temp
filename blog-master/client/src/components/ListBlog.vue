<template>
  <div>
    <div>
      <!-- Blog Post -->
      <div class="card mb-4" v-for="key in articles" :key="key._id">
        <div class="card-header">
          <div class="row">
            <div class="col-sm-10"></div>
            <div class="col-sm-1">
              <a href="" @click.prevent="updateForm(key._id)" class="btn btn-primary"><i class="far fa-edit"></i>edit</a>
            </div>
            <div class="col-sm-1">
              <a href="" @click.prevent="deleteMethod(key._id)" class="btn btn-primary"><i class="far fa-trash-alt"></i>delete</a>
            </div>
          </div>
        </div>
        <div class="card-body">
          <h2 class="card-title" v-html="key.title"></h2>
          <p class="card-text" v-html="key.content"></p>
        </div>
        <div class="card-footer text-muted">
          <h5 v-html="key.createdAt"></h5><h5 v-html="key.user.name"></h5>
          <div v-if='updateState.state' class="container mt-5">
            <div class="row justify-content-md-center">
              <h3>Title</h3>
              <wysiwyg class="title-blog" v-model="key.title" />
            </div>
            <div class="row justify-content-md-center">
              <hr>
              <hr>
            </div>
            <div class="row justify-content-md-center">
              <h3>Content</h3>
              <wysiwyg class="text-blog" v-model="key.content" />
            </div>
            <div class="row justify-content-md-center">
              <button @click="updateMethod(key.title, key.content, key._id)">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListBlog',
  props: ['articles'],
  data() {
    return {
      dataArticles: [],
      updateState: {
        state: false,
        id: '',
      },
    };
  },
  methods: {
    deleteMethod(id) {
      console.log('masuk', id)
      axios({
        method: 'DELETE',
        url: `http://localhost:3000/article/${id}`,
        headers: {
          token: localStorage.getItem('access_token'),
        },
      })
        .then(() => {
          this.$router.push('/me')
        })
        .catch(err => {
          alert(err.message)
        })
    },
    updateForm(id) {
      this.updateState.state = true
      this.updateState.id = id
    },
    updateMethod(title, data, id) {
      console.log(id)
      // axios({
      //   data
      // })
    }
  }
};
</script>
