import { authContext } from "context/context"
import { useContext } from "react"
import { useParams } from "react-router-dom"

import styled from "styled-components"
import { acceptInvitationAndAddUser, removeFriendFromPending } from "utils/firebase"


export const AcceptInvitationButton = ({setIsPending, setIsFriend}) => {
    const { userId } = useContext(authContext)
    const { id } = useParams()
    
    const onAcceptButtonClick = () => {
        acceptInvitationAndAddUser(id, userId).then(() => {
            removeFriendFromPending(id, userId)
            setIsFriend(true)
            setIsPending(false)
        } )
    }

    return (
        <AcceptButton onClick={onAcceptButtonClick}></AcceptButton>
    )
}

const AcceptButton = styled.button`
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    height: auto;
    width: auto;
    width: 30px;
    height: 30px;
    
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0;
    border: none;
    background-color: green;
    border-radius: 100px;

    font-family: 'Nunito', sans-serif;
    font-size: 15px;

    color: white;

    @media screen and (min-width: 1200px) {
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
    }
`