

export const ChangeUsernameForm = () => {
    return (
        <Form onSubmit={
                    (e) => onUsernameFormSubmit(e)}>
                    <input type='text' name="username" minLength='3' required autoComplete='off'/>
                    <button><MdDone size={15}/></button>
                </Form>
    )
}

const Form = styled.form`
    height: 30px;
    display: flex;
    & input{
        height: 100%;
        padding: 0 15px;
        width: 200px;
        border-radius: 15px;
        background-color: white;
        border: 1px solid orange;
        margin-right: 5px
    }

    & button{
        height: 100%;
        width: 30px;
        border-radius: 15px;
        border: 1px solid green;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center
    }
`