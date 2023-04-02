import { useContext, useEffect, useState } from "react"
import {  useNavigate, useParams, useRoutes } from "react-router-dom"
import { fetchFriendsInvitationsList, fetchUserInfo, fetchFriendsList } from "utils"
import { NavLink } from "react-router-dom"
import {authContext} from 'context'
import styled from "styled-components"
import { ProfileCard, Loader, ErrorComponent, AcceptInvitationForm, Bookmarks, GoBackLink, FriendshipOptions} from "components"
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png'

const User = () => {
    const { userId } = useContext(authContext)
    const { id } = useParams()
    const [name, setName] = useState('')
    const [photo, setPhoto] = useState('')
    const [bookmarks, setBookmarks] = useState([])
    const [isFriendInvited, setIsFriendInvited] = useState(false)
    const [isFriend, setIsFriend] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isPending, setIsPending] = useState(false)

    const navigate = useNavigate()

    const routes = useRoutes([
        {
            path: '/bookmarks',
            element: <Bookmarks navigate={navigate} bookmarks={bookmarks}/>
        }
    ])

    useEffect(() => {
        setIsLoading(true)
        Promise.all([fetchUserInfo(id), fetchFriendsInvitationsList(id), fetchFriendsList(userId)]).then(res => {
            const [userInfo, invitationsList, friendsList] = res
            
            const { username, bookmarks, photoUrl } = userInfo.val()
            
            setName(username)

            if (bookmarks) {
                setBookmarks(Object.values(bookmarks))
            }

            if (photoUrl) {
                setPhoto(photoUrl)
            }
            else {
                setPhoto(avatarPlaceholder)
            }
            
            if (invitationsList.val()) {
                setIsFriendInvited(Object.values(invitationsList.val()).some(user => user === userId))
                setIsPending(Object.keys(invitationsList.val()).some(friendId => friendId === id))
            }

            if (friendsList.val()) {
                setIsFriend(Object.values(friendsList.val()).some(user => user === id))
            }

            setIsLoading(false)
        }).catch(error => {
            console.log(error)
            setIsError(true)
            setIsLoading(false)
        })

    }, [id, userId])

    return(
        <Page>
            {isLoading ? <Loader className={'loader_profile'} color={'white'} /> : isError ? <ErrorComponent /> : 
                <>
                    <GoBackLink />
                <Wrapper >
                <ProfileCard
                    avatar={photo}
                    username={name}
                    isFriendInvited={isFriendInvited}
                    isFriend={isFriend}
                    setIsFriendInvited={setIsFriendInvited}
                    setIsFriend={setIsFriend}
                    isPending={isPending}
                />
                    
                <FriendshipOptions
                    isFriendInvited={isFriendInvited}
                    isFriend={isFriend}
                    setIsFriendInvited={setIsFriendInvited}
                    setIsFriend={setIsFriend}
                    isPending={isPending}
                    />
                </Wrapper>
                    
                {isPending && <AcceptInvitationForm setIsPending={setIsPending} setIsFriend={setIsFriend} username={name} />}
                <OutletsSection>
                    <Tabs>
                        <Tab to='bookmarks'>Bookmarks</Tab>
                    </Tabs>
                        {routes}
                </OutletsSection>
            </>
            }
        </Page>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%
`

const Page = styled.div`
    min-height: calc(100vh - 61px);
    width: 100%;
    padding: 40px;
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