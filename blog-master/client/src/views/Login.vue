<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-6"></div>
        <div class="col-sm">
          <h1>Login Page</h1>
          <form action="" class="form-group">
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" v-model="login.email">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" v-model="login.password">
            </div>
            <button type="submit" class="btn btn-primary" @click.prevent="loginMethods">Submit</button>
          </form>
        </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        login: {
          email: '',
          password: ''
        }
      };
    },
    methods: {
      loginMethods() {
        axios({
          method: 'POST',
          url: 'http://localhost:3000/users/login',
          data: this.login
        })
          .then(({data}) => {
            localStorage.setItem('access_token', data.token)
            this.login = {
              email: '',
              password: ''
            }
            this.$emit('login', true)
            this.$router.push('home')
          })
          .catch(err => {
            alert(err);
          });
      }
    }
  }
</script>
