import './Profile.scss'
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserInfo } from "../../utils/firebase"
import { getFavouriteGames, userSignOut } from "../../utils/firebase"
import { GameCard } from "../../components/GameCard/GameCard"
import { Loader } from 'components/Loader/Loader'
import authContext from '../../context/context'
import { GameList } from 'components/GameList/GameList'

export const Profile = () => {
    const {userId, isLoggedIn} = useContext(authContext)

    const [favouriteGames, setFavouriteGames] = useState([])
    const [username, setUsername] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    
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
            } else {
                setUsername('User')
            }
                setFavouriteGames([...Object.values(games.val())])
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
                navigate('/auniverse/login/login-page')
            }
        );
    }
    
    return (
        <>
            <div className='profile' style={{ marginTop: 61 }}>
               {isLoading ? <Loader className={'loader-profile'} color={'darkblue'} /> : <><div>
                    <h1>Hello, {username}</h1>
                    <button type="button" onClick={logOut}>Log out</button>
                </div> 
                    <GameList games={favouriteGames}/></>}
            </div>
        </>
        
    )
}