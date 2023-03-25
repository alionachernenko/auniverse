import { useState, useEffect, useContext} from "react"
import { getUserInfo } from "utils/firebase"
import { authContext } from "context/context"
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png'
import { acceptInvitationAndAddUser } from "utils/firebase"
import { Link } from "react-router-dom"
import {FiPlusCircle} from 'react-icons/fi'
import styled from "styled-components"
import { AcceptInvitationButton } from "components/AcceptInvitationButton/AcceptInvitationButton"

export const FriendCard = ({id, isPending, setInvitations, setFriends}) => {
    const { userId } = useContext(authContext)

    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState()

      const onAcceptButtonClick = () => {
        acceptInvitationAndAddUser(id, userId).then(() =>
            setInvitations(prev => prev.filter(friend => friend !== id)),
            setFriends(prev => [...prev, id])).catch(error => console.log(error))
    }

    useEffect(() => {
    getUserInfo(id).then(res => {
            const { username, photoUrl } = res.val()
            
            setName(username)
            if(res.val().photoUrl) {setAvatar(photoUrl)}
            else {setAvatar(avatarPlaceholder)}
        }).catch(error => console.log(error))
    }, [id])

    return (
        <li style={{position: 'relative'}}>     
            <Card to={`/users/${id}/bookmarks`}>
                <Avatar width={200} src={`${avatar}`} alt={`${name}'s avatar`}/>

            <Username>{name}</Username></Card>
            {isPending && <AcceptInvitationButton onClick={onAcceptButtonClick}>
                        <FiPlusCircle size='100%'/></AcceptInvitationButton>}
                    
        </li>
    )
}

const Card = styled(Link)`
    
    padding: 10px;
    border-radius: 20px;
    width: fit-content;
    background: transparent;

    display: flex;
    align-items: center;

    position: relative;

    font-weight: 900;

    

    @media screen and (min-width: 1200px) {
        width: 470px;
        background-color: white;
    }
`
const Avatar = styled.img`
    width: 90px;
    height: 90px;
    border-radius: 45px;
    

    object-fit: cover;


     @media screen and (min-width: 1200px) {
        margin-right: 10px;
    }
    
`

const Username = styled.p`
    color: black;
    
    font-size: 20px;

    @media screen and (max-width: 1199px) {
        display: none
    }
`