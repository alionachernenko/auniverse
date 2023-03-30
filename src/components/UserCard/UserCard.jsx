import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchUserInfo } from "utils"
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png'
import styled from "styled-components"

export const UserCard = ({ id}) => {

    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState()
    

    useEffect(() => {
        fetchUserInfo(id).then(res => {
            const { username, photoUrl } = res.val()
            
            setName(username)
            if(res.val().photoUrl) {setAvatar(photoUrl)}
            else {setAvatar(avatarPlaceholder)}
        }).catch(error => console.log(error))
    }, [id])

    return(
        <Card>     
            <CardLink to={`/users/${id}/bookmarks`} state={{from: '/users' }}>
                <AvatarWrapper>
                <Avatar width={200} src={`${avatar}`} alt={`${name}'s avatar`}/>
            </AvatarWrapper>
                <Username>{name}</Username>
            </CardLink>
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
    max-width: 500px;
    flex-wrap: wrap;

    &:hover{
        transform: scale(0.95)
    }
   
   
    
`
const AvatarWrapper = styled.div`
    height: 60px;
    width: 60px;
    border-radius: 100px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    overflow: hidden;
    
    position: relative;
    background-color: #080D2B;

    @media screen and (min-width: 420px){
        height: 100px;
        width: 100px;
        
    }
`

const Avatar = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const CardLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 10px;
    color: black;
`

const Username = styled.p`
    color: white;
    font-size: 25px;
    font-weight: 500;    
`