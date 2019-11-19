<template>
  <b-container>
    <b-row align-v="center">
      <b-col>
        <b-card bg-variant="light" label-cols-lg="12">
          <form @submit.prevent="loginUser"> 
            <b-form-group label-cols-lg="12" label="Sign in" label-size="lg" label-class="font-weight-bold pt-0" class="mb-0">
              
              <b-form-group label-cols-sm="4" label="Login:" label-align-sm="right" label-for="nested-login">
                <b-form-input id="nested-login" type="text" value="demo"  v-model="login" required></b-form-input>
              </b-form-group>

              <b-form-group  label-cols-sm="4" label="Password:" label-align-sm="right" label-for="nested-password">
                <b-form-input id="nested-password" type="password" value="demo" v-model="password"></b-form-input>
              </b-form-group> 

              <b-button type="submit">Sign In</b-button> 
            </b-form-group>
          </form>  
        </b-card>
      </b-col>
    </b-row> 
  </b-container>
</template>

<script>
 
export default {
  middleware: 'notAuthenticated',
  data() {
    return {
      login: 'demo',
      password: 'demo'
    }
  }, 
  methods: {
    loginUser() {
      const { login, password } = this
      const data = { login, password }
    
      this.$axios('/auth/login', {
        method: 'post', 
        headers: {
          Accept: 'application/json',
          Content: 'application/json'
        },
        data: data
      }).then(res => { 
        const auth = res.data
        this.$store.commit('setAuth', auth)  
        this.$router.push('/')
      }).catch(err => {
        alert('Wrong login/password') 
        console.log(err)
      })
    } 
  }
}
</script>