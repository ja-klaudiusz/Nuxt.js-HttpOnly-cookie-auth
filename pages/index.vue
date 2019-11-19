<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">Cookie base auth</h1>
      <h2 class="subtitle">HttpOnly cookie base authentication</h2>
      <div class="links" v-if="$store.state.auth">
        <p>
          You are authenticated. You can see the
          <NuxtLink to="/secret" class="button--green">
            secret page
          </NuxtLink>
        </p>  
      </div>
      <div class="links" v-else>
        <p>
          You are not authenticated. 
          <NuxtLink to="/login" class="button--green">Login</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
import Logo from '~/components/Logo.vue'

export default { 
  components: {
    Logo
  },
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
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
