import './Profile.scss'
import { useEffect, useState } from "react"
import { useNavigate} from "react-router-dom"
import { getUserInfo } from "../../services/firebase"
import { getFavouriteGames } from "../../services/firebase"
import { GameCard } from "../../components/GameCard/GameCard"
import { signOutUser } from "../../services/firebase"
import { Loader } from 'components/Loader/Loader'

export const Profile = ({ isLoggedIn, setIsLoggedIn}) => {
    const navigate = useNavigate()
    const userId = JSON.parse(localStorage.getItem('userId'))
    const [favouriteGames, setFavouriteGames] = useState([])
    const [username, setUsername] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    

    useEffect(() => {
        if (!isLoggedIn) {
        console.log('no')
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
                setIsLoading(false)
            }).catch((error) => {
                console.error(error);
                setIsLoading(false)
    })
    
    }, [isLoggedIn, navigate, userId])

    const logOut = () => {
        signOutUser()
            .then(() => {
                navigate('/auniverse/login/login-page')
                setIsLoggedIn(false)
                localStorage.setItem('isLoggedIn', false)}
        );
    }
    
    return (
        <>
            <div className='profile' style={{ marginTop: 61 }}>
               {isLoading ? <Loader className={'loader-profile'} color={'darkblue'} /> : <><div>
                    <h1>Hello, {username}</h1>
                    <button type="button" onClick={logOut}>Log out</button>
                </div> 
                    <ul style={{
                        display: 'flex', gap: 30, flexWrap: 'wrap'
                    }}>
                        {favouriteGames && favouriteGames.map(game => <GameCard data={game} width={500} className='gamecard_catalog' />)}
                    </ul></>}
            </div>
        </>
        
    )
}