export const LoginForm = ({onSubmit}) => {
    return (
        <form action="" onSubmit={(e) => onSubmit(e, e.target.elements.email.value, e.target.elements.password.value)}>
                <input type="password" name="password" placeholder="password"/>
                <input type="email" name="email" id="" />
                <button type="submit"></button>
            </form>
    ) 
}