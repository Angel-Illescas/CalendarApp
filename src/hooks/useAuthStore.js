import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api"
import { onChecking, onDeleteMessage, onLogin, onLogout } from "../store"

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking())
        try {

            const res = await calendarApi.post('/auth', { email, password })
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: res.data.name, uid: res.data.uid }))


        } catch (error) {
            dispatch(onLogout(error.response.data.msg))

            setTimeout(() => {
                dispatch(onDeleteMessage())
            }, 10)
        }

    }

    const starRegister = async ({ name, email, password }) => {
        dispatch(onChecking())

        try {

            const res = await calendarApi.post('/auth/new', { name, email, password })
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            
            dispatch(onLogin({ name: res.data.name, uid: res.data.uid }))

        } catch (error) {
            
            dispatch(onLogout(error.response.data.msg))

            setTimeout(() => {
                dispatch(onDeleteMessage())
            }, 10)
        }

    }


    const cheackAuthToken = async() => {
        const token = localStorage.getItem('token')
        if (!token){
            return dispatch(onLogout())
        }

        try {

            const {data} = await calendarApi.get('/auth/renew')
            console.log(data);
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            
            dispatch(onLogin({ name:data.name, uid:data.uid }))

            
        } catch (error) {
            localStorage.clear()
            dispatch(onLogout())
        }
    }


    return {
        //Props
        status, user, errorMessage,
        //Mehods
        startLogin, starRegister,cheackAuthToken
    }
}
