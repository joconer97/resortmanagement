import { getLocalUser } from './helpers/auth'

const user = getLocalUser()
// server.js
 
// Replace with your stripe public and secret keys




export default {
  state: {
    currentUser  : user,
    isLoggedIn   : !!user,
    loading      : false,
    auth_error   : null,
    customers    : [],
    userCustomers: [],
  },
  getters: {
    isLoading (state) {
      return state.loading
    },
    isLoggedIn (state) {
      return state.isLoggedIn
    },
    currentUser (state) {
      return state.currentUser
    },
    authError (state) {
      return state.auth_error
    },
    customers (state) {
      return state.customers
    },
    userCustomers (state) {
      return state.userCustomers
    },
  },
  mutations: {
    login (state) {
      state.loading    = true
      state.auth_error = null
    },
    loginSuccess (state, payload) {
      state.auth_error  = null
      state.isLoggedIn  = true
      state.loading     = false
      state.currentUser = Object.assign({}, payload.user, { token: payload.access_token })

      localStorage.setItem('user', JSON.stringify(state.currentUser))
    },
    loginFailed (state, payload) {
      state.loading    = false
      state.auth_error = payload.error
    },
    logout (state) {
      localStorage.removeItem('user')
      state.isLoggedIn  = false
      state.currentUser = null
    },
    updateCustomers (state, payload) {
      state.customers = payload
    },
    updateUserCustomers (state, payload) {
      state.userCustomers = payload
    },
  },
  actions: {
    login (context) {
      context.commit('login')
    },
    getCustomers (context) {
      axios.get('/api/customers')
        .then((response) => {
          context.commit('updateCustomers', response.data.customers)
        })
    },
    getUserCustomers (context) {
      axios.get(`/api/customers/usercustomers/${this.state.currentUser.id}`)
        .then((response) => {
          context.commit('updateUserCustomers', response.data.customers)
        })
    },

  },
}
