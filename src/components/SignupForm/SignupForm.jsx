import { FaUserEdit } from 'react-icons/fa'
// import { useLocation } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'

export const SignupForm = ({ onSignUp, isLoading}) => {
    
    return (
        <form className='signup_form' action="" onSubmit={(e) =>
            onSignUp(e, e.target.elements.email.value, e.target.elements.password.value, e.target.elements.username.value)
        }>
            <div className='icon-wrapper'>
                {isLoading ? <Oval color='#FF6600' secondaryColor='orange' width={40} height={40} strokeWidth={4} /> : <FaUserEdit className='icon' fill='orange'/> } 
                
                </div>
            <p>Sign up</p>
            <input type="text" name="username" placeholder="username" />
            <input type="email" name="email" id="" placeholder="email"/>
            <input type="password" name="password" placeholder="password" />
               
            <button type="submit">Sign Up</button>
            </form>
    )
}