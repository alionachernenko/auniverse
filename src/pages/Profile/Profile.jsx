import './Profile.scss'
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserInfo } from "../../utils/firebase"
import { getFavouriteGames, userSignOut } from "../../utils/firebase"
import { Loader } from 'components/Loader/Loader'
import authContext from '../../context/context'
import { GameList } from 'components/GameList/GameList'
// import avatarPlaceholder from '../../assets/images/avatar-placeholder.png'
import styled from 'styled-components'
import { ProfileCard } from 'components/ProfileCard/ProfileCard'


const Profile = () => {
    const {userId, isLoggedIn, setUserId} = useContext(authContext)

    const [favouriteGames, setFavouriteGames] = useState([])
    const [username, setUsername] = useState('')
    const [photoPath, setPhotoPath] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isAvatarLoading, setIsAvatarLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/auniverse/login/login-page')
            return
        }

        
        Promise.all([getUserInfo(userId), getFavouriteGames(userId)])
            .then(res => {
                const [snapshot, games] = res
            if (snapshot.exists()) {
                setUsername(snapshot.val().username)
                if(snapshot.val().photoUrl) setPhotoPath(snapshot.val().photoUrl)
            } else {
                setUsername('User')
            }

                if(games.val()) setFavouriteGames([...Object.values(games.val())])
                console.log(games.val())
                setIsLoading(false)
               
            }).catch((error) => {
                console.error(error);
                setIsLoading(false)
    })
    
    }, [isLoggedIn, navigate, userId])

    const logOut = () => {
        userSignOut()
            .then(() => {
                navigate('/login/login-page')
                setUserId('')
            }
        );
    }
    
    return (
        <>
            <Page>
               {isLoading ? <Loader className={'loader-profile'} color={'darkblue'} /> : <><Page className='top'>
                    <ProfileCard setPhotoPath={setPhotoPath} avatar={photoPath} username={username} isAvatarLoading={isAvatarLoading} setIsAvatarLoading={setIsAvatarLoading}/>
                    
                    <LogOut type="button" onClick={logOut}>Log out</LogOut>
                    <h2 >Your favourite games:</h2>
                    <GameList games={favouriteGames}/>
                    </Page> 
                </>}
            </Page>
        </>
        
    )
}

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

const LogOut = styled.button`
    color: white;
    background-color: orange;
    font-size: 20px;
    font-family: 'Nunito', sans-serif;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
`

export default Profile