import { useContext, useEffect, useState } from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import { getFriendsInvitationsList, getFriendsList, getUserInfo } from "utils/firebase"
import { NavLink } from "react-router-dom"
import {authContext} from '../../context/context'
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
    const [isPendingFriend, setIsPendingFriend] = useState(false)
    const [isFriend, setIsFriend] = useState(false)

    console.log(isPendingFriend)

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

        getFriendsInvitationsList(id).then(res => {
           if(res.val()) setIsPendingFriend(Object.values(res.val()).some(user => user === userId))
        })

        getFriendsList(userId).then(res => {
            if(res.val()) setIsFriend(Object.values(res.val()).some(user => user === id))
        })

    }, [id, setIsPendingFriend, userId])

    return(
        <Page>
            <ProfileCard avatar={photo} username={name} isPendingFriend={isPendingFriend} isFriend={isFriend} setIsPendingFriend={setIsPendingFriend} setIsFriend={setIsFriend} />
                
                {/* {isPendingFriend && <p>User sent you an invitation</p>} */}
                <OutletsSection>

                    <Tabs>
                        <Tab to='bookmarks'>Bookmarks</Tab>
                    </Tabs>
                    <Outlet context={[favouriteGames]} />
                    </OutletsSection>
            {/* </Container> */}
        </Page>
    )
}

export default User 


const Page = styled.div`
    color: white;
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    box-sizing: border-box;
    position: relative;
    min-height: calc(100vh - 61px);
    width: 100%;
    background-color: #00021A;
`

const OutletsSection = styled.div`
    width: 50%;
    margin-left: auto;
    & .item{
        width: 50%
    }
`

const Tabs = styled.div`
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    margin-left: auto;
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