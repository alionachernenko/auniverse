import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getUserInfo } from "utils/firebase"
// import avatarPlaceholder from '../../assets/images/avatar-placeholder.png'
import styled from "styled-components"

export const UserCard = ({id}) => {
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState()

    useEffect(() => {
        getUserInfo(id).then(res => {
            console.log(res.val())
            setName(res.val().username)
            setAvatar(res.val().photoUrl)
        })
    }, [id])

    return(
        <Card>     
            <CardLink style={{color: 'black'}} to={`/auniverse/users/${id}`}>
                <AvatarWrapper>
                {avatar && <img style={{objectFit: 'cover', width: 100, height: '100%'}} width={200} src={`${avatar}`} alt={`${name}'s avatar`}></img>}
            </AvatarWrapper>
            <Username>{name}</Username>
            </CardLink>
           
        </Card>
    )
}

const Card = styled.div`
    height: auto;
    width: calc((100vw - 80px)/5);
    padding: 10px;
    border-radius: 20px;
    background-color: #080D2B;
    transform: scale(1);
    transition: 200ms all ease;

    &:hover{
        transform: scale(0.95)
    }
    
`
const AvatarWrapper = styled.div`
    border-radius: 100px;
    height: 100px;
    width: 100px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: #080D2B
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