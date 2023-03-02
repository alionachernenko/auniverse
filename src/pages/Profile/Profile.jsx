import { useEffect, useState } from "react"
import { useNavigate} from "react-router-dom"
import { getUserInfo } from "../../services/firebase"
import { getFavGames } from "../../services/firebase"
import { GameCard } from "../../components/GameCard/GameCard"
import { signOutUser } from "../../services/firebase"
export const Profile = ({ isLoggedIn, setIsLoggedIn}) => {
    const navigate = useNavigate()
    const userId = JSON.parse(localStorage.getItem('userId'))
    const [favouriteGames, setFavouriteGames] = useState([])
    // console.log(JSON.parse(localStorage.getItem('userId')))

    useEffect(() => {
        if (!isLoggedIn) {
        console.log('no')
            navigate('/login')
            return
        }
        
        getUserInfo(userId).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val())
            } else {
                console.log("No data available");
            }
            })
    .catch((error) => {
        console.error(error);
        
    });
        console.log(userId)
        getFavGames(userId).then(res => {
            console.log(res.val())
            setFavouriteGames([...Object.values(res.val())])
        })
    }, [])

    const logOut = () => {
        signOutUser()
            .then(() => {
                navigate('/login/login-page')
                setIsLoggedIn(false)
                localStorage.setItem('isLoggedIn', false)}
        );
    }

    console.log(favouriteGames)
    
    return (
        <>
            <div style={{marginTop: 61, minHeight: '100vh'}}>
                <h1>Hello</h1>
                <ul style={{
                    display: 'flex', gap: 30, flexWrap: 'wrap'}}>
                    {favouriteGames && favouriteGames.map(game => <GameCard data={game} width={500} className='gamecard_catalog' />)}
                </ul>
                <button type="button" onClick={logOut}>Log out</button>
                </div>
        </>
        
    )
}