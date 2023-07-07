/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react"
import { getAccessToken } from "../services/TasksApi"
import { checkToken, logout } from "../store/auth"
import { useAppDispatch } from "../utils/appDispatch"

const Logout = () => {
    const token = getAccessToken()
    const dispath = useAppDispatch()
    if (token)
      dispath(checkToken(token))
    
    const logoutHandler = () => {
        dispath(logout())
        window.localStorage.removeItem('token')
        console.log('logout')        
      }  
      useEffect(() => {
        logoutHandler()      
        
      }, [])
      
    return (
        <div>
            
        </div>
    )
}
export default Logout