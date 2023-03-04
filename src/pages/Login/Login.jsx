import './LoginForm.scss'
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    

    const signupButtonClassName = location.pathname === '/auniverse/login/sign-page' ? 'active' : 'disabled'
    const loginButtonClassName = location.pathname === '/auniverse/login/login-page'? 'active' : 'disabled'

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('isLoggedIn')) === true) {
            navigate(`/auniverse/profile`)
        }
    }, [navigate])
    
    return (
        <div className='login_page' >
            <div className='tabs'>
            <Link to='login-page' className={loginButtonClassName}>Log In</Link>
            <Link to='sign-page' className={signupButtonClassName}>Sign Up</Link>
            </div>
            <Outlet/>
        </div>
    )
}