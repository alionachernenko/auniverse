import { useContext, useEffect, useState } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png'
import { getFavouriteGames, userSignOut, getUserInfo, getFriendsList, getFriendsInvitationsList } from "../../utils/firebase"
import { Loader } from 'components/Loader/Loader'
import { ProfileCard } from 'components/ProfileCard/ProfileCard'

import { authContext } from "context/context"


import styled from 'styled-components'
import { Container } from "components/Container/Container"

const AccountPage = () => {
    const {userId, isLoggedIn, setUserId } = useContext(authContext)
    const [friends, setFriends] = useState([])
    const [favouriteGames, setFavouriteGames] = useState([])
    const [username, setUsername] = useState('')
    const [friendPending, setFriendsPending] = useState([])
    const [photoPath, setPhotoPath] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isAvatarLoading, setIsAvatarLoading] = useState(false)
    const navigate = useNavigate()

    console.log(isLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login/login-page')
            return
        }

        const showInvitations = () => {
            getFriendsInvitationsList(userId).then((res) => {
                if (res.val()) setFriendsPending(Object.values(res.val()))
            }
            )
        }
        
        const showFriends = () => {
            getFriendsList(userId).then((res) => {
                if(res.val()) setFriends(Object.values(res.val()))
            })
        }
        
        Promise.all([getUserInfo(userId), getFavouriteGames(userId)])
            .then(res => {
                const [snapshot, games] = res
            if (snapshot.exists()) {
                const {username, photoUrl} = snapshot.val()
                setUsername(username)
                if(photoUrl) {
                    setPhotoPath(photoUrl)
                }
                else {
                    setPhotoPath(avatarPlaceholder)
                }
            } else {
                setUsername('User')
            }

                if(games.val()) setFavouriteGames([...Object.values(games.val())])
                setIsLoading(false)
               
            }).catch((error) => {
                console.error(error);
                setIsLoading(false)
            })
        
        showInvitations()
        showFriends()
    
    }, [isLoggedIn, navigate, setFriends, userId])

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
                <Container>
                    {isLoading ? <Loader className={'loader-profile'} color={'#00021A'} /> : <>
                        <Page>
                    <ProfileCard setPhotoPath={setPhotoPath} avatar={photoPath} username={username} isAvatarLoading={isAvatarLoading} setIsAvatarLoading={setIsAvatarLoading} setUsername={setUsername}/>
                        
                        <OutletsSection>
                            
                            <Tabs>
                        <Tab to='bookmarks'>Bookmarks</Tab>
                        <Tab to='friends'>Friends</Tab>
                            </Tabs>
                        
                            <Outlet context={[favouriteGames, friends, friendPending, setFriendsPending, setFriends]} />
                        </OutletsSection>
                        <LogOut type="button" onClick={logOut}>Log out</LogOut>
                    </Page> 
                        
                    </>}
                </Container>
        </>
        
    )
}

const Page = styled.div`
    color: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    position: relative;
    min-height: calc(100vh - 61px);
    width: 100%;
    background-color: #00021A;

    @media screen and (min-width: 1200px) {
        flex-direction: row;
        align-items: flex-start;
    }
`

const OutletsSection = styled.div`
    width: 100%;

    @media screen and (min-width: 1200px) {
        margin-left: auto;
    }

     @media screen and (min-width: 768px) {
        width: 50%;
    }
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

const Tabs = styled.div`
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    margin-left: auto;
    gap: 0 40px;
    flex-wrap: wrap;
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
        position: absolute;
        width: 100%;
        display: block;
        bottom: 0;
        left: 0;
        height: 3px;
        border-radius: 4px;
        content: '';
        background-color: #FF6600;
    }
`
export default AccountPage