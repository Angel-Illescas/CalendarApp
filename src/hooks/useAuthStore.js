import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api"
import { onChecking, onDeleteMessage, onLogin, onLogout } from "../store"

export const useAuthStore = () => {

    const { status, user, errorMessage} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const startLogin = async({ email,password }) => {
        dispatch(onChecking())
        try {

            const res = await calendarApi.post('/auth',{email,password})
            localStorage.setItem( 'token', res.data.token )
            localStorage.setItem( 'token-init-date', new Date().getTime() )
            dispatch( onLogin({name:res.data.name,uid:res.data.uid}) )
            
            
        } catch (error) {
            console.log({error});
            dispatch(onLogout(error.response.data.msg))

            setTimeout( () => {
                dispatch(onDeleteMessage())
            },10)
        }
    
    }
  return {
    //Props
    status, user, errorMessage,
    //Mehods
    startLogin,
  }
}
