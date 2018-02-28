export default {
  state: {
    authInfo: null,
    userInfo: null
  },
  getters: {
  },
  actions: {
    setAuthInfo ({state, commit}, authInfo) {
      commit('setAuthInfo', authInfo)
    },
    setUserInfo ({state, commit}, userInfo) {
      commit('setUserInfo', userInfo)
    },
    logout ({commit}) {
      commit('removeAuthInfo')
      commit('removeUserInfo')
    }
  },
  mutations: {
    setAuthInfo (state, authInfo) {
      let authInfoTmp = {token: authInfo.token || authInfo['access-token'] || authInfo['auth_token'], client: authInfo.client || authInfo['client_id'], uid: authInfo.uid}
      localStorage.setItem('authInfo', JSON.stringify(authInfoTmp))
      state.authInfo = authInfoTmp
    },
    removeAuthInfo (state) {
      localStorage.removeItem('authInfo')
      state.authInfo = null
    },
    setUserInfo (state, userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      state.userInfo = userInfo
    },
    removeUserInfo (state) {
      localStorage.removeItem('userInfo')
      state.userInfo = null
    }
  }
}
