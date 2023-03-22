import { useContext, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { authContext } from '../../context/context'
import { addAvatar, addUserToFriensInvitationsList, changeUsername, removeFriend} from "utils/firebase"

import { Oval } from "react-loader-spinner"

import { RxUpload } from "react-icons/rx"
import { BsPenFill } from 'react-icons/bs'
import {FiUserPlus, FiUserX} from 'react-icons/fi'
import { MdDone } from 'react-icons/md'

import styled from "styled-components"
import { toast } from "react-toastify"

export const ProfileCard = ({avatar, username, isAvatarLoading, setPhotoPath, setIsAvatarLoading, setUsername, isPendingFriend, isFriend, setIsPendingFriend, setIsFriend}) => {
    const { userId } = useContext(authContext)
    const { id } = useParams()
    const location = useLocation()

    const [showChangeUsernameFrom, setShowChangeUsernameForm] = useState(false)

    const deleteFriend = () => {
        removeFriend(id, userId)
        setIsFriend(false)
    }

    const sendInvitation = () => {
        addUserToFriensInvitationsList(id, userId)
        setIsPendingFriend(true)
    }
    
    const onUsernameFormSubmit = (e) => {
        e.preventDefault()

        const username = e.target.elements.username.value

        changeUsername(userId, username)
        setUsername(username)
        setShowChangeUsernameForm(false)
    }

    const uploadAvatar = (e) => {

        const file = e.target.files[0]
        e.preventDefault()
        if (file) {
            
            if (file.size > 2097152) {
                toast.info('Maximum size: 2 MB', {
                        position: "top-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        theme: "dark",
                    });
                setIsAvatarLoading(false)
                return
            }

            setIsAvatarLoading(true)
            addAvatar(file, userId, setPhotoPath, setIsAvatarLoading)
        }
    }
    return(
        <Info>
            <AvatarWrapper>
                {location.pathname.includes('profile') ?
                    <>
                        <UploadInput id='upload_file' accept=".png, .jpg, .jpeg, .gif" type='file' name='photo' onChange={(e) => uploadAvatar(e)} />
                        <UploadButton htmlFor="upload_file">
                            <RxUpload size='100%' fill='orange' color="orange" stroke="orange"/>
                        </UploadButton>
                    </>
                    : !isPendingFriend && !isFriend ?
                        <ChangeFriendStatusButton type='button' onClick={sendInvitation}>
                            <FiUserPlus />
                        </ChangeFriendStatusButton>
                        : isPendingFriend ?
                            <FriendStatus>You sent an invitation</FriendStatus>
                        :   <ChangeFriendStatusButton onClick={deleteFriend}>
                                <FiUserX />
                            </ChangeFriendStatusButton>}
                
                {isAvatarLoading ?
                    <Spinner>
                        <Oval color='#FF6600' secondaryColor='orange' width={'100%'} height={'100%'} />
                    </Spinner> : 
                    <Avatar src={`${avatar}`} alt={`${username}'s avatar`} />}
            </AvatarWrapper>
                    <div style={{display: 'flex', gap: 5, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap'}}>
                        {!showChangeUsernameFrom && <Username>
                            {username}
                        </Username>}
                        {location.pathname.includes('profile') && !showChangeUsernameFrom && <ChangeUsernameButton onClick={() => setShowChangeUsernameForm(true)}>
                            <BsPenFill color="white" />
                        </ChangeUsernameButton>}
                    </div>
                    {showChangeUsernameFrom && <ChangeUsernameForm onSubmit={(e) => onUsernameFormSubmit(e)}>
                        <input type='text' name="username" minLength='3' required autoComplete='off'/>
                        <button><MdDone size={15}/></button>
                    </ChangeUsernameForm>}
        </Info>
    )
}

const Info = styled.div`
    margin-bottom: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 10px;

    @media screen and (min-width: 1200px) {
        margin-left: auto;
        margin-right: auto
    }
    
`

const Username = styled.h1`
    text-align: center
`
const Spinner = styled.div`
    width: 90%;
    height: 90%;
    text-align: center;
    
`
const AvatarWrapper = styled.div`
    height: 200px;
    width: 200px;
    border-radius: 100px;

    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    overflow: hidden;
    
    background-color: transparent;

`

const FriendStatus = styled.p`
    position: absolute;
    z-index: 1111;
    opacity: 0;
    transition: 250ms opacity ease;

    ${AvatarWrapper}:hover &{
        opacity: 1
    }
`

const Avatar = styled.img`
width: 200px;
height: 100%;
object-fit: cover;

transition: 250ms filter ease;
    ${AvatarWrapper}:hover &{
        filter: blur(3px)
    }
`

const UploadButton = styled.label`
    width: 30px;
    height: 30px;
    padding: 5px;
    border: none;
    border-radius: 100px;

    position: absolute;
    z-index: 1111;
    opacity: 0;
    
    background-color: white;
    cursor: pointer;
    transition: 250ms all ease;

    ${AvatarWrapper}:hover &{
        opacity: 1
    }
`

const UploadInput = styled.input`
    width: 0.1px;
    height: 0.1px;
    position: absolute;
    z-index: -1;
    opacity: 0;
    overflow: hidden;
`

const ChangeUsernameButton = styled.button`
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
`

const ChangeUsernameForm = styled.form`
    height: 30px;
    display: flex;
    & input{
        height: 100%;
        padding: 0 15px;
        width: 200px;
        border-radius: 15px;
        background-color: white;
        border: 1px solid orange;
        margin-right: 5px
    }

    & button{
        height: 100%;
        width: 30px;
        border-radius: 15px;
        border: 1px solid green;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center
    }
`

const ChangeFriendStatusButton = styled.button`
    width: 30px;
    height: 30px;
    padding: 5px;
    border: none;

    position: absolute;
    z-index: 1111;
    opacity: 0;
    
    background-color: white;
   
    border-radius: 100px;
    cursor: pointer;
    
    transition: 250ms all ease;

    ${AvatarWrapper}:hover &{
        opacity: 1
    }
`