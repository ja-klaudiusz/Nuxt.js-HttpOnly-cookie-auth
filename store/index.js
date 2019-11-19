const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    auth: null
  }
}
export const mutations = {
  setAuth (state, auth) { 
    state.auth = typeof auth == 'string' ? JSON.parse(auth) : auth
  },
  clearAuth(state, redirect) {
    state.auth = null
    redirect('/login')
  }
}
export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let auth = null 
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie) 
      try {
        auth = parsed.auth
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setAuth', auth)
  }, 
  clearAuth({ commit }, redirect) {
    commit('clearAuth', redirect)
  }
}
