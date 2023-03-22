import { useContext, useEffect, useState } from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import {   getUserInfo } from "utils/firebase"
import { NavLink } from "react-router-dom"
import {authContext} from '../../context/context'
import styled from "styled-components"
import { ProfileCard } from "components/ProfileCard/ProfileCard"
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png'
import { Loader } from "components/Loader/Loader"
import {ErrorComponent} from "../../components/ErrorComponent/ErrorComponent"

const User = () => {
    const { userId } = useContext(authContext)
    const { id } = useParams()
    
    const [name, setName] = useState('')
    const [photo, setPhoto] = useState('')
    const [favouriteGames, setFavs] = useState([])
    const [isPendingFriend, setIsPendingFriend] = useState(false)
    const [isFriend, setIsFriend] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const navigate = useNavigate()

    if(userId === id) navigate('/profile/bookmarks')

    useEffect(() => {
        getUserInfo(id).then((res) => {
            setIsLoading(true)
            const {username, favs, photoUrl} = res.val() 
            setName(username)

            if(favs) setFavs(Object.values(favs))
            if(photoUrl){ setPhoto(photoUrl)}
            else (setPhoto(avatarPlaceholder))
            
            setIsLoading(false)
        }).catch(error => {
            console.log(error)
            setIsError(true)
            setIsLoading(false)
        })

    }, [id, setIsPendingFriend, userId])

    return(
        <Page>
            {isLoading ? <Loader className={'loader-profile'} color={'white'} /> : 
                (isError ? <ErrorComponent/> :
                <>
                    <ProfileCard
                        avatar={photo}
                        username={name}
                        isPendingFriend={isPendingFriend}
                        isFriend={isFriend}
                        setIsPendingFriend={setIsPendingFriend}
                        setIsFriend={setIsFriend}
                    />
                    <OutletsSection>
                        <Tabs>
                            <Tab to='bookmarks'>Bookmarks</Tab>
                        </Tabs>
                        <Outlet context={[favouriteGames]} />
                    </OutletsSection>
                </>)
            }
        </Page>
    )
}

const Page = styled.div`
    min-height: calc(100vh - 61px);
    width: 100%;
    padding: 20px;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    align-items: center;

    position: relative;

    color: white;
    background-color: #00021A;

    
    @media screen and (min-width: 1200px) {
        flex-direction: row;
        align-items: flex-start;
    }
`

const OutletsSection = styled.div`
    width: 100%;
   
    @media screen and (min-width: 768px) {
        width: 50%;
    }

    @media screen and (min-width: 1200px) {
        margin-left: auto;
    }
`

const Tabs = styled.div`
    margin-bottom: 20px;
    margin-left: auto;

    display: flex;
    justify-content: center;
    gap: 10px;

    & :not(:last-child) {
        margin-right: 100px;
    }
`


const Tab = styled(NavLink)`
    color: #090E2F;
    font-weight: 500;
    padding: 10px 0;
    background-color: transparent;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    cursor: pointer;
    color: white;
    border: none;
    position: relative;
    display: block;

    &.active::after{
        content: '';
        display: block;
        height: 3px;
        width: 100%;
        border-radius: 4px;

        position: absolute;
        bottom: 0;
        left: 0;
        background-color: #FF6600;
    }
`

export default User 