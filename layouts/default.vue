<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand to="/">Home</b-navbar-brand> 
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> 
      <b-collapse id="nav-collapse" is-nav> 
        <b-navbar-nav class="ml-auto"> 
          <b-nav-form class="pr-2"> 
            <b-input-group prepend="User">
              <b-form-input placeholder="Username" v-if="$store.state.auth" :value="$store.state.auth.u"></b-form-input>
            </b-input-group> 
          </b-nav-form> 
          <b-nav-form right class="pr-2"> 
            <b-input-group prepend="Token">
              <b-form-input placeholder="Token" v-if="$store.state.auth" :value="$store.state.auth.t"></b-form-input>
            </b-input-group> 
          </b-nav-form> 
          <b-button @click="logout" v-if="$store.state.auth">Logout</b-button> 
        </b-navbar-nav>
      </b-collapse>
    </b-navbar> 
    <nuxt />
  </div>
</template>
<script> 
export default { 
  methods: {
    logout () {
      this.$axios('/auth/logout', {
        method: 'post', 
        headers: {
          Accept: 'application/json',
          Content: 'application/json'
        }
      }).then(res => {
        console.log(res) 
        this.$store.commit('setAuth', null)
        this.$router.push('/')
      }).catch(err => {
        alert('Wrong login/password') 
        console.log(err)
      })
    }
  }
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
