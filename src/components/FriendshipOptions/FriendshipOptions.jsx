import styled from "styled-components"
import { FiUserPlus, FiUserX } from 'react-icons/fi'
import { addUserToFriendsInvitationsList, removeFriend} from "utils"
import { useContext } from "react"
import { useParams } from "react-router-dom"
import { authContext } from "context"
import { memo } from "react"

export const FriendshipOptions = memo(({
    isFriendInvited,
    isFriend,
    setIsFriendInvited,
    setIsFriend,
    isPending
}) => {

    console.log(isFriendInvited)

    const { userId } = useContext(authContext)
    const { id } = useParams()

    const deleteFriend = () => {
        removeFriend(id, userId)
        setIsFriend(false)
    }

    const sendInvitation = () => {
        addUserToFriendsInvitationsList(id, userId)
        setIsFriendInvited(true)
    }

    if (!isPending && !isFriendInvited && !isFriend) {
            return <ChangeFriendStatusButton type='button' onClick={sendInvitation}>
                <FiUserPlus className="icon" size={20} fill='orange' stroke="orange" />
                <span>Add Friend</span>
                </ChangeFriendStatusButton>
    }

        if (!isPending && isFriendInvited) {
            return <FriendStatus>You sent an invitation</FriendStatus>
    }

        if(!isPending){
            return <ChangeFriendStatusButton onClick={deleteFriend}>
                    <FiUserX className="icon" size={20} fill='orange' stroke="orange" />
                        <span>Remove Friend</span>
                    </ChangeFriendStatusButton>
    }

})

const ChangeFriendStatusButton = styled.button`
    height: auto;
    padding: 5px 8px;
    display: flex;
    border: none;
    gap: 5px;
    align-items: center;

    width: fit-content;
    background-color: white;
   
    border-radius: 100px;
    cursor: pointer;
    
    transition: 250ms all ease;
    font-family: 'Nunito', sans-serif;
    font-size: 17px;
    font-weight: 500;
    color: #00021A;

    &:hover {
        background-color: orange;
        color: white;
    }

zz

    & .icon{
        fill: orange
    }
`

const FriendStatus = styled.p`
    z-index: 1111;
`