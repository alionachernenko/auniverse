import { authContext } from "context/context"
import { useContext } from "react"
import { useParams } from "react-router-dom"
import { acceptInvitationAndAddUser, removeFriendFromInvitationsList } from "utils/firebase/database"
import styled from "styled-components"

export const AcceptInvitationForm = ({setIsPending, setIsFriend, username}) => {
    const { userId } = useContext(authContext)
    const { id } = useParams()

     const onAcceptButtonClick = () => {
        acceptInvitationAndAddUser(id, userId).then(() => {
            removeFriendFromInvitationsList(id, userId)
            setIsPending(false)
            setIsFriend(true)
        } )
    }

    const onDeclineButtonClick = () => {
        removeFriendFromInvitationsList(id, userId)
        setIsPending(false)
        setIsFriend(false)
    }
    
    return (
        <Form>
            <Message>{`${username} wants to be your friend`}</Message>
            <div>
                <AcceptButton onClick={onAcceptButtonClick} type="button">Accept</AcceptButton>
                <DeclineButton onClick={onDeclineButtonClick} type="button">Decline</DeclineButton>
            </div>
        </Form>
    )
}

const Form = styled.div`
    font-family: 'Nunito', sans-serif;
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    gap: 10px;

    @media screen and (min-width: 768px) {
        position: absolute;
        z-index: 111;
        top: 10px;
        left: 10px;
        max-width: 250px
    }
`

const Message = styled.p`
    text-align: center;
    font-family: inherit
`

const AcceptButton = styled.button`
    background-color: white;
    border: 1px solid green;
    font-family: inherit;
    color: green;
    padding: 5px 10px;
    border-radius: 10px;
    margin-right: 10px

`
const DeclineButton = styled.button`
    background-color: white;
    border: 1px solid red;
    font-family: inherit;
    color: red;
    padding: 5px 10px;
    border-radius: 10px;
`