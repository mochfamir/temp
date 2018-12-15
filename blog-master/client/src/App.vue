<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <button class="navbar-toggler" type="button" data-toggle="collapse"
      data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
      aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/me">My Blog</router-link>
          </li>
        </ul>
        <div>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search"
            placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success mr-sm-5" type="submit">Search</button>
          </form>
        </div>
        <div v-if="!isLogin">
          <router-link class="nav-link" to="/login">
            <button type="button" class="btn btn-info mr-sm-2">Login</button>
          </router-link>
        </div>
        <div v-if="!isLogin">
          <router-link class="nav-link" to="/register">
            <button type="button" class="btn btn-info mr-sm-2">Register</button>
          </router-link>
        </div>
        <div v-else>
          <router-link class="nav-link" to="/register">
            <button type="button" @click="logout" class="btn btn-info mr-sm-2">Log Out</button>
          </router-link>
        </div>
      </div>
    </nav>
    <router-view @login="statusLogin"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: true,
    };
  },
  created() {
    if (localStorage.getItem('access_token')) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('access_token');
      this.isLogin = false;
    },
    statusLogin(v) {
      this.isLogin = true;
    }
  },
};
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
