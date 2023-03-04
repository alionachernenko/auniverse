import { IoMdLogIn } from 'react-icons/io'
import { Oval } from 'react-loader-spinner'

export const LoginForm = ({ onSubmit, isLoading}) => {
    return (
        <form className='login_form' onSubmit={(e) => onSubmit(e, e.target.elements.email.value, e.target.elements.password.value)}>
            <div className='icon-wrapper'>
                {isLoading ? <Oval color='#FF6600' secondaryColor='orange' width={40} height={40} strokeWidth={4} /> : <IoMdLogIn fill='orange' className='icon' /> } 
            </div>
            
            <p>Sign in</p>
            <input type="email" name="email" placeholder='email' required/>
            <input type="password" name="password" placeholder="password" required/>
                
            <button type="submit">Log In</button>
            </form>
    ) 
}