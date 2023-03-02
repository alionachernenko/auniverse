export const SignupForm = ({onSignUp}) => {
    return (
        <form action="" onSubmit={(e) => onSignUp(e, e.target.elements.email.value, e.target.elements.password.value)}>
                <input type="password" name="password" placeholder="password"/>
                <input type="email" name="email" id="" />
                <button type="submit"></button>
            </form>
    )
}