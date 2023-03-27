import { useContext, useEffect, useState } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png'
import { getFavouriteGames, userSignOut, getUserInfo, getFriendsList, getFriendsInvitationsList} from "../../utils/firebase"
import { Loader } from 'components/Loader/Loader'
import { ProfileCard } from 'components/ProfileCard/ProfileCard'
import {ImExit} from 'react-icons/im'

import { authContext } from "context/context"

import styled from 'styled-components'
import { Container } from "components/Container/Container"
import { ErrorComponent } from "components/ErrorComponent/ErrorComponent"

const AccountPage = () => {
    const { userId, isLoggedIn, setUserId } = useContext(authContext)
    
    const [friends, setFriends] = useState([])
    const [favouriteGames, setFavouriteGames] = useState([])
    const [username, setUsername] = useState('')
    const [invitations, setInvitations] = useState([])
    const [photoPath, setPhotoPath] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isAvatarLoading, setIsAvatarLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login/login-page')
            return
        }

        Promise.all([getUserInfo(userId), getFavouriteGames(userId), getFriendsList(userId), getFriendsInvitationsList(userId)])
            .then(res => {
                const [snapshot, games, friends, invitations] = res
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

                if (games.val()) setFavouriteGames([...Object.values(games.val())])
                if (friends.val()) setFriends([...Object.values(friends.val())])
                if (invitations.val()) setInvitations([...Object.values(invitations.val())])
                
                setIsLoading(false)
               
            }).catch((error) => {
                console.error(error);
                setIsError(true)
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
                <Container>
                    {isLoading ?
                        <Loader className={'loader-profile'} color={'white'} /> : isError ? <ErrorComponent/> :
                        <>
                            <Page>
                                <ProfileCard
                                    setPhotoPath={setPhotoPath}
                                    avatar={photoPath} username={username}
                                    isAvatarLoading={isAvatarLoading}
                                    setIsAvatarLoading={setIsAvatarLoading}
                                    setUsername={setUsername}
                                    setInvitations={setInvitations}
                                    setFriends={setFriends}
                                />
                                <OutletsSection>
                                    <Tabs>
                                        <Tab to='bookmarks'>Bookmarks</Tab>
                                        <Tab to='friends'>Friends {invitations.length > 0 &&
                                            <InvitationsIndicator>{invitations.length}</InvitationsIndicator>}
                                        </Tab>
                                    </Tabs>
                        
                                    <Outlet
                                        context={[favouriteGames, friends, setFriends, invitations, setInvitations]}
                                    />
                                </OutletsSection>
                                <LogOut type="button" onClick={logOut}><ImExit/></LogOut>
                            </Page>
                        </>}
                </Container>
            </Page>
        </>
    )
}

const InvitationsIndicator = styled.span`
    width: 15px;
    height: 15px;
    border-radius: 8px;

    position: absolute;
    top: 0;
    right: -15px;

    font-size: 14px;
    text-align: center;
    vertical-align: center;

    background-color: green;
    
`

const Page = styled.div`
    width: 100%;
    min-height: calc(100vh - 61px);
    padding: 20px;
    box-sizing: border-box;
    
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    
    color: white;
    
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
    position: absolute;
    top: 0;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    color: white;

        font-family: 'Nunito', sans-serif;
        width: fit-content;
        box-sizing: border-box;
        padding: 10px;
        background-color: #080D2B;
        font-size: 20px;
        background-color: orange;
        box-shadow: red 2px 3px;
        transition: 100ms all linear;

        &:hover {
            box-shadow: red 4px 5px;
            transform: scale(1.05);
            background-color: white;
            color: orange
        }

        &::before {
            content: '';
            width: 20px;
            height: 20px;

            position: absolute;
            top: 0px;
            right: 0px;
            
            background-color: transparent;
            border-top: 2px solid orange;
            border-right: 2px solid orange;
            
            transition: 100ms all linear;
        }

        &::after{
            content: '';
            height: 20px;
            width: 20px;
            position: absolute;
            bottom: 0px;
            left: 0px;

            background-color: transparent;
            border-bottom: 2px solid orange;
            border-left: 2px solid orange;
        
            transition: 100ms all linear;
        }

        &:hover::after{
            bottom: -15px;
            left: -13px;
        }

        &:hover::before {
            top: -13px;
            right: -15px;
        }
`

const Tabs = styled.div`
    margin-bottom: 20px;
    margin-left: auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0 40px;
    
`


const Tab = styled(NavLink)`
    display: block;
    padding: 10px 0;
    border: none;

    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 500;
    
    
    position: relative;
    background-color: transparent;
    cursor: pointer;
    color: white;

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
export default AccountPage