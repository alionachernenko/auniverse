import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getUserInfo, acceptInvitationAndAddUser } from "utils/firebase"
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png'
import styled from "styled-components"
import { authContext } from "context/context"


export const UserCard = ({ id, isPending, setInvitations, setFriends }) => {
    const { userId } = useContext(authContext)

    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState()
    
    const onAcceptButtonClick = () => {
        acceptInvitationAndAddUser(id, userId).then(() =>
                    setInvitations(prev => prev.filter(friend => friend !== id)),
                    setFriends(prev => [...prev, id]))
    }

    useEffect(() => {
        getUserInfo(id).then(res => {
            const { username, photoUrl } = res.val()
            
            setName(username)
            if(res.val().photoUrl) {setAvatar(photoUrl)}
            else {setAvatar(avatarPlaceholder)}
        })
    }, [id])

    return(
        <Card>     
            <CardLink to={`/users/${id}`}>
                <AvatarWrapper>
                <Avatar width={200} src={`${avatar}`} alt={`${name}'s avatar`}/>
            </AvatarWrapper>
                <Username>{name}</Username>
              
            </CardLink>
            {isPending && <button onClick={onAcceptButtonClick}>
                Accept invitation</button>}
        </Card>
    )
}

const Card = styled.li`
    height: auto;
    padding: 10px;
    border-radius: 20px;
    background-color: #00021A;
    transform: scale(1);
    transition: 200ms all ease;
    width: auto;

    &:hover{
        transform: scale(0.95)
    }

    @media screen and (max-width: 360px) {
        width: fit-content;
    }
   
   max-width: 360px
    
`
const AvatarWrapper = styled.div`
    height: 90px;
    width: 90px;
    border-radius: 100px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    overflow: hidden;
    
    position: relative;
    background-color: #080D2B;

    @media screen and (min-width: 320px){
        height: 100px;
        width: 100px;
    }
`

const Avatar = styled.img`
    width: 100%;
    height: 100%;
    object-fit: 'cover';
`

const CardLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    
    color: black;
`

const Username = styled.p`
    color: white;
    font-size: 25px;
    font-weight: 500;
        
     @media screen and (max-width: 360px) {
        display: none;
    }
    
`