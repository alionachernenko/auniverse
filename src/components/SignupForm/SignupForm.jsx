import { FaUserEdit } from 'react-icons/fa'

export const SignupForm = ({ onSignUp, error }) => {
    console.log(error)
    return (
        <form className='signup_form' action="" onSubmit={(e) => onSignUp(e, e.target.elements.email.value, e.target.elements.password.value)}>
            <div className='icon-wrapper'>
                <FaUserEdit className='icon' fill='orange'/>
                </div>
            <p>Sign up</p>
             <input type="email" name="email" id="" placeholder="email"/>
            <input type="password" name="password" placeholder="password" />
               
            <button type="submit">Sign Up</button>
            {error && <p>{error}</p>}
            </form>
    )
}