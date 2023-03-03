import {IoMdLogIn} from 'react-icons/io'

export const LoginForm = ({ onSubmit }) => {
    return (
        <form className='login_form' onSubmit={(e) => onSubmit(e, e.target.elements.email.value, e.target.elements.password.value)}>
            <div className='icon-wrapper'>
                <IoMdLogIn fill='orange' className='icon'/> 
            </div>
            
            <p>Sign in</p>
            <input type="email" name="email" id="" placeholder='email'/>
            <input type="password" name="password" placeholder="password" />
                
                <button type="submit">Log In</button>
            </form>
    ) 
}