import { useState, useEffect, useContext } from "react"
import { fetchUserInfo, removeFriendFromInvitationsList, acceptInvitationAndAddUser, removeFriend } from "utils"
import { authContext } from "context"
import { FiUserX } from "react-icons/fi"

import { Link, useLocation } from "react-router-dom"
import { FiPlusCircle } from 'react-icons/fi'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import styled from "styled-components"
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png'

export const FriendCard = ({id, isPending, setInvitations, setFriends, friends}) => {
    const { userId } = useContext(authContext)

    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState()
    const location = useLocation()

    const onRemoveFriendButtonClick = () => {
        setFriends(prev => prev.filter(friend => friend !== id))
        removeFriend(id, userId)
    }

      const onAcceptButtonClick = () => {
          acceptInvitationAndAddUser(id, userId).then(() => {
            removeFriendFromInvitationsList(id, userId)
            setInvitations(prev => prev.filter(friend => friend !== id))
            setFriends(prev => [...prev, id])
          })
      }
    
    const onDeclineButtonClick = () => {
        removeFriendFromInvitationsList(id, userId)
        setInvitations(prev => prev.filter(friend => friend !== id))
    }

    useEffect(() => {
        fetchUserInfo(id).then(res => {
            const { username, photoUrl } = res.val()
            
            setName(username)
            if(res.val().photoUrl) {setAvatar(photoUrl)}
            else {setAvatar(avatarPlaceholder)}
        }).catch(error => console.log(error))
    }, [id])

    return (
        <li key={id} style={{position: 'relative'}}>     
            <Card to={`/users/${id}/bookmarks`} state={{from: location.pathname}}>
                <Avatar width={200} src={`${avatar}`} alt={`${name}'s avatar`}/>

            <Username>{name}</Username></Card>
            {isPending ?
                <ChangeInviteStatusButtons><AcceptButton onClick={onAcceptButtonClick}>
                    <FiPlusCircle size='100%' /></AcceptButton>
                    <DeclineButton onClick={onDeclineButtonClick}>
                        <AiOutlineCloseCircle size='100%' />
                    </DeclineButton>
                </ChangeInviteStatusButtons> : <RemoveFriendButton onClick={onRemoveFriendButtonClick}>
                    <FiUserX className="icon" size={30} fill='orange' stroke="orange" />
                    </RemoveFriendButton>}
                    
        </li>
    )
}

const RemoveFriendButton = styled.button`
    height: auto;
    width: auto;
    border: none;
    background-color: white;
   
    border-radius: 100px;
    cursor: pointer;    

    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    transition: 150ms all ease;

    &:hover {
        transform: translateY(-50%) scale(1.1)
    }
`

const ChangeInviteStatusButtons = styled.div`
    display: flex;
    gap: 5px;
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    height: auto;
    width: auto;
       @media screen and (min-width: 1200px) {
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
    }
`


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

const AcceptButton = styled.button`
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

 
`


const DeclineButton = styled.button`
    width: 30px;
    height: 30px;
    
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0;
    border: none;
    background-color: red;
    border-radius: 100px;

    font-family: 'Nunito', sans-serif;
    font-size: 15px;

    color: white;
`