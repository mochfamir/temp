<template>
  <div>
    <div>
      <div class="card mb-4" v-for="key in dataArticles" :key="key._id">
        <div class="card-body">
          <h2 class="card-title" v-html="key.title"></h2>
          <p class="card-text" v-html="key.content"></p>
          <a href="#" class="btn btn-primary">Read More &rarr;</a>
        </div>
        <div class="card-footer text-muted">
          <h5 v-html="key.createdAt"></h5><h5 v-html="key.user.name"></h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogPost',
  data() {
    return {
      dataArticles: [],
    };
  },
  created() {
    axios({
        method: 'GET',
        url: 'http://localhost:3000/article',
        headers: {
          token: localStorage.getItem('access_token'),
        },
      })
        .then(({ data }) => {
          this.dataArticles = data.reverse();
        })
        .catch((err) => {
          console.log(err.messsage);
        });
  }
};
</script>
