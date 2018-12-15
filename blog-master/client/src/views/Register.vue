<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-6"></div>
            <div class="col-sm">
                <h1>Register Page</h1>
                <form action="" class="form-group">
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" class="form-control" v-model="register.name">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" v-model="register.email">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" v-model="register.password">
                    </div>
                    <button type="submit" class="btn btn-primary" @click.prevent="registerMethods">Submit</button>
                </form>
            </div>
            <div class="col-2"></div>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
          register: {
              name: '',
              email: '',
              password: ''
          }
      }
  },
  methods: {
      registerMethods() {
          axios({
              method: 'POST',
              url: 'http://localhost:3000/users/register',
              data: this.register,                 
          })
            .then(user => {
                this.register = {
                  name: '',
                  email: '',
                  password: ''
                };
                this.$router.push('login')
            })
            .catch(err => {
              alert(err)
            })
      }
    }
  }
</script>

