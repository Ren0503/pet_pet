import axios from 'axios'
import actionHandler from '@/store/actionHandler'

const actions = {
    /* 
     * @desc        Authenticate user & get token
     * @access      Public
     */
    loginUser: actionHandler(async ({ commit }, { email, password }) => {
        const { data } = await axios.post(
            '/api/users/login/', 
            { 'username': email, 'password': password }
        )

        localStorage.setItem('user', JSON.stringify(data.data))
        commit('setUser', { user: data.data, statePiece: 'loggedUser' })
    }),

    /* 
     * @desc        Sign out logged user
     * @access      Private
     */
    logoutUser({ commit }) {
        localStorage.removeItem('user')
        commit('resetLoggedUser')

        router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath.slice(1) } })
    },

    /* 
     * @desc        Register a new user
     * @access      Public
     */
    registerUser: actionHandler(async ({ commit }, { name, email, password }) => {
        const { data } = await axios.post(
            '/api/users/register/', 
            { 'name': name, 'email': email, 'password': password },
        )

        localStorage.setItem('user', JSON.stringify(data.data))
        commit('setUser', { user: data.data, statePiece: 'loggedUser' })
    }),

    /**
     * @desc        Get profile user
     * @access      Private | |User
     */
    getUserProfile: actionHandler(async ({ commit, state }) => {
        
    }),

    /* 
     * @desc        Get User by id or the logged in
     * @access      Private || Admin
     */
    fetchUserDetails: actionHandler(async ({ commit, state }, user = 'profile') => {
        commit('resetUserDetails')

        const { data } = await axios.get(`/api/users/${user}/`, {
            headers: { Authorization: `Bearer ${state.loggedUser.token}` }
        })

        commit('setUser', { user: data.data, statePiece: 'userDetails' })
    }),

    /* 
     * @desc        Update logged in or by id user data
     * @access      Private || Admin
     */
    updateUserDetails: actionHandler(async ({ commit, state }, { user, route = 'profile' }) => {
        const { name, email, password, isAdmin } = user

        const { data } = await axios.put(`/api/users/${route}/update`,
            { name, email, password, isAdmin },
            { headers: { Authorization: `Bearer ${state.loggedUser.token}` } }
        )

        if (route === 'profile') {
            localStorage.setItem('user', JSON.stringify(data.data))
            commit('setUser', { user: data.data, statePiece: 'loggedUser' })
        }

        commit('resetUserDetails')
        commit('setUser', { user: data.data, statePiece: 'userDetails' })
    }),

    /* 
     * @desc        Get all registered users
     * @access      Admin
     */
    fetchAllUsers: actionHandler(async ({ commit, state }) => {
        commit('resetAllUsers')

        const { data } = await axios.get('/api/users', {
            headers: { Authorization: `Bearer ${state.loggedUser.token}` }
        })

        commit('setAllUsers', data.data)
    }),

    /* 
     * @desc        Delete user by id
     * @access      Admin
     */
    deleteUser: actionHandler(async ({ dispatch, state }, userId) => {
        await axios.delete(`/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${state.loggedUser.token}` }
        })

        dispatch('fetchAllUsers')
    })
}