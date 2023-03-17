import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getUserInfo } from "utils/firebase"
import { GameList } from "components/GameList/GameList"
import authContext from '../../context/context'
import styled from "styled-components"
import { ProfileCard } from "components/ProfileCard/ProfileCard"
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png'

const User = () => {
    const {id} = useParams()
    const [name, setName] = useState('')
    const [photo, setPhoto] = useState('')
    const [favouriteGames, setFavs] = useState([])
    const {userId} = useContext(authContext)
    const navigate = useNavigate()

    if(userId === id) navigate('/profile')

    useEffect(() => {
        getUserInfo(id).then((res) => {
            console.log(res.val())
            const {username, favs, photoUrl} = res.val() 
            setName(username)
            if(favs) setFavs(Object.values(favs))
            if(photoUrl){ setPhoto(photoUrl)}
            else(setPhoto(avatarPlaceholder))
        })
    }, [id])
   

    return(
        <Page>
            <ProfileCard avatar={photo} username={name}/>
            {favouriteGames && <GameList games={favouriteGames}/>}
        </Page>
    )
}

export default User 


const Page = styled.div`
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    position: relative;
    min-height: calc(100vh - 61px);
    width: 100%;
`
