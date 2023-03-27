import { useState, useEffect, useContext} from "react"
import { getUserInfo, removeFriendFromPending } from "utils/firebase"
import { authContext } from "context/context"
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png'
import { acceptInvitationAndAddUser } from "utils/firebase"
import { Link } from "react-router-dom"
import {FiPlusCircle} from 'react-icons/fi'
import styled from "styled-components"
import {AiOutlineCloseCircle} from 'react-icons/ai'

export const FriendCard = ({id, isPending, setInvitations, setFriends}) => {
    const { userId } = useContext(authContext)

    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState()

      const onAcceptButtonClick = () => {
          acceptInvitationAndAddUser(id, userId).then(() => {
            removeFriendFromPending(id, userId)
            setInvitations(prev => prev.filter(friend => friend !== id))
            setFriends(prev => [...prev, id])
          })
      }
    
    const onDeclineButtonClick = () => {
        removeFriendFromPending(id, userId)
        setInvitations(prev => prev.filter(friend => friend !== id))
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
        <li key={id} style={{position: 'relative'}}>     
            <Card to={`/users/${id}/bookmarks`}>
                <Avatar width={200} src={`${avatar}`} alt={`${name}'s avatar`}/>

            <Username>{name}</Username></Card>
            {isPending &&
                <ChangeInviteStatusButtons><AcceptButton onClick={onAcceptButtonClick}>
                    <FiPlusCircle size='100%' /></AcceptButton>
                    <DeclineButton onClick={onDeclineButtonClick}>
                        <AiOutlineCloseCircle size='100%' />
                    </DeclineButton>
                </ChangeInviteStatusButtons>}
                    
        </li>
    )
}

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