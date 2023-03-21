import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getUserInfo, acceptInvitationAndAddUser } from "utils/firebase"
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png'
import styled from "styled-components"
import { authContext } from "context/context"



export const UserCard = ({id, isPending, setPending}) => {
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState()
    const { userId } = useContext(authContext)

    useEffect(() => {
        getUserInfo(id).then(res => {
            console.log(res.val())
            setName(res.val().username)
            if(res.val().photoUrl) {setAvatar(res.val().photoUrl)}
            else {setAvatar(avatarPlaceholder)}
        })
    }, [id])

    return(
        <Card>     
            <CardLink style={{color: 'black'}} to={`/users/${id}`}>
                <AvatarWrapper>
                <img style={{objectFit: 'cover', width: 100, height: '100%'}} width={200} src={`${avatar}`} alt={`${name}'s avatar`}></img>
            </AvatarWrapper>
                <Username>{name}</Username>
              
            </CardLink>
            {isPending && <button onClick={() =>
                acceptInvitationAndAddUser(id, userId).then(() =>
                        setPending(prev => prev.filter(friend => friend !== id))
                )}>
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

    &:hover{
        transform: scale(0.95)
    }

    @media screen and (min-width: 768px){
        width: 400px
    }
    
`
const AvatarWrapper = styled.div`
    border-radius: 100px;
    height: 50px;
    width: 50px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: #080D2B;

    @media screen and (min-width: 420px){
        height: 100px;
        width: 100px;
    }
`

const CardLink = styled(Link)`
display: flex;
align-items: center;
gap: 10px;
justify-content: flex-start;
`

const Username = styled.p`
    color: white;
    font-size: 25px;
    font-weight: 500
`