import styled from "styled-components"
import { RxUpload } from "react-icons/rx"
import { Oval } from "react-loader-spinner"
import authContext from '../../context/context'
import { useContext, useState } from "react"
import { uploadBytes, getDownloadURL, ref as sRef } from 'firebase/storage'
import {set, ref} from 'firebase/database'
import firebaseApps from 'config/firebase'
import { useLocation } from "react-router-dom"
import {BsPenFill} from 'react-icons/bs'
import {MdDone} from 'react-icons/md'
export const ProfileCard = ({avatar, username, isAvatarLoading, setPhotoPath, setIsAvatarLoading, setUsername}) => {

    const {userId} = useContext(authContext)
    const location = useLocation()
    const [showChangeUsernameFrom, setShowChangeUsernameForm] = useState(false)
    
    return(
        <Info>
            <AvatarWrapper>
                {location.pathname === '/profile' &&
                    <><UploadInput id='upload_file'accept=".png, .jpg, .jpeg, .gif" type='file' name='photo' onChange={
                (e) => {
                e.preventDefault()
                
                if(e.target.files[0]){
                    if(e.target.files[0].size > 2097152){
                        console.log('noooooJJFJFJJFJFJ')
                        setIsAvatarLoading(false)
                        return
                    }
                    setIsAvatarLoading(true)
                    uploadBytes(sRef(firebaseApps.storage, `/userpics/${e.target.files[0].name}`), e.target.files[0]).then(() => {
                    return getDownloadURL(sRef(firebaseApps.storage, `/userpics/${e.target.files[0].name}`))}).then((url) =>{
                        console.log(url)
                        
                        set(ref(firebaseApps.database, 'users/' + userId + '/photoUrl'), url)
                        setPhotoPath(url)
    
                        setIsAvatarLoading(false)
                    })
                }
                }
            }/>
                    <UploadButton htmlFor="upload_file">
                        <RxUpload size='100%' fill='orange' color="orange" stroke="orange"/>
                    </UploadButton></>
                        }
                        {isAvatarLoading ? <Spinner><Oval color='#FF6600' secondaryColor='orange' width={'100%'} height={'100%'}/></Spinner> : 
                        <Avatar style={{objectFit: 'cover',width: 200, height: '100%'}} src={`${avatar}`} alt=""/>}
                    </AvatarWrapper>
                    <div style={{display: 'flex', gap: 5, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap'}}>
                {!showChangeUsernameFrom && <h1>{username}</h1>}
                {location.pathname === '/profile' && !showChangeUsernameFrom && <ChangeUsernameButton onClick={() => setShowChangeUsernameForm(true)}><BsPenFill/></ChangeUsernameButton>}</div>
                {showChangeUsernameFrom && <ChangeUsernameForm action="" onSubmit={
                    (e) => {
                        e.preventDefault()
                        set(ref(firebaseApps.database, 'users/' + userId + '/username'), e.target.elements.username.value)
                        setUsername(e.target.elements.username.value)
                        setShowChangeUsernameForm(false)
                    }
                }>
                    <input type='text' name="username" minLength='3' required autoComplete='off'/>
                    <button><MdDone size={15}/></button>
                </ChangeUsernameForm>}
            </Info>
    )
}

const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px
`
const Spinner = styled.div`
    text-align: center;
    width: 90%;
    height: 90%
`
const AvatarWrapper = styled.div`
    border-radius: 100px;
    height: 200px;
    width: 200px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: transparent;

`

const Avatar = styled.img`
transition: 250ms filter ease;

    ${AvatarWrapper}:hover &{
        filter: blur(3px)
    }
`

const UploadButton = styled.label`
    border: none;
    position: absolute;
    opacity: 0;
    width: 30px;
    height: 30px;
    background-color: white;
    padding: 5px;
    border-radius: 100px;
    cursor: pointer;
    z-index: 1111;
    transition: 250ms all ease;

    ${AvatarWrapper}:hover &{
        opacity: 1
    }
`

const UploadInput = styled.input`
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
`

const ChangeUsernameButton = styled.button`
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center
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