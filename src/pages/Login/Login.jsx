import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export const Login = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('isLoggedIn')) === true) navigate(`/${JSON.parse(localStorage.getItem('userId'))}/profile`)
    }, [])
    
    return (
        <div style={{ height: '100vh', marginTop: '61px' }} >
            <Link to='login-page'><button type="button">Log In</button></Link>
            <Link to='sign-page'><button type="button">Sign Up</button></Link>
            <Outlet/>
        </div>
    )
}