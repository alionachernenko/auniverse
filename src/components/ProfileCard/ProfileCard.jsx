import styled from "styled-components"
import { GrFormUpload } from "react-icons/gr"
import { Oval } from "react-loader-spinner"
import authContext from '../../context/context'
import { useContext } from "react"
import { uploadBytes, getDownloadURL, ref as sRef } from 'firebase/storage'
import {set, ref} from 'firebase/database'
import firebaseApps from 'config/firebase'
import { useLocation } from "react-router-dom"
export const ProfileCard = ({avatar, username, isAvatarLoading, setPhotoPath, setIsAvatarLoading}) => {
    const {userId} = useContext(authContext)
    const location = useLocation()

    return(
        <Info>
            <AvatarWrapper>
                {location.pathname === '/auniverse/profile' && <UploadBlock>
                    <UploadInput id='upload_file'accept=".png, .jpg, .jpeg, .gif" type='file' name='photo' onChange={
                (e) => {
                e.preventDefault()
                console.log('changed')
                setIsAvatarLoading(true)

                uploadBytes(sRef(firebaseApps.storage, `/userpics/${e.target.files[0].name}`), e.target.files[0]).then(() => {
                return getDownloadURL(sRef(firebaseApps.storage, `/userpics/${e.target.files[0].name}`))}).then((url) =>{
                    console.log(url)
                    
                    set(ref(firebaseApps.database, 'users/' + userId + '/photoUrl'), url)
                    setPhotoPath(url)

                    setIsAvatarLoading(false)
                })}
            }/>
                    <UploadButton htmlFor="upload_file">
                        <GrFormUpload size={40} color='orange'/>
                    </UploadButton>
                        </UploadBlock>}
                        {isAvatarLoading ? <Spinner><Oval color='#FF6600' secondaryColor='orange' width={'100%'} height={'100%'}/></Spinner> : 
                        <img style={{objectFit: 'cover',width: 200, height: '100%'}} src={`${avatar}`} alt=""/>}
                    </AvatarWrapper>
                <h1>{username}</h1>
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
    background-color: #080D2B
`


const UploadBlock = styled.div`
    position: absolute;
    bottom: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(8, 13, 43, .8);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 250ms all ease;

    ${AvatarWrapper}:hover &{
        opacity: 1
    }
`
const UploadButton = styled.label`
    border: none;
    background-color: transparent;
    width: auto;
    height: auto;
    cursor: pointer
`

const UploadInput = styled.input`
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
`