// import { useState } from 'react'
// import authContext from '../../context/context'
// import { useContext } from "react"
// import { uploadBytes, getDownloadURL, ref as sRef } from 'firebase/storage'
// import {set, ref} from 'firebase/database'
// import firebaseApps from 'config/firebase'

// import styled from 'styled-components'

// export const ChangeAvatarForm = ({setPhotoPath, setShowAvatarForm, setIsAvatarLoading}) => {
//     const {userId} = useContext(authContext)

    
//     return(
//         <Form action="" onSubmit={
//             (e) => {
//                 e.preventDefault()
//                 setIsAvatarLoading(true)
//                 setShowAvatarForm(false)
                
//                 uploadBytes(sRef(firebaseApps.storage, `/userpics/${e.target.files[0].name}`), e.target.files[0]).then(() => {
//                     ci
//                 return getDownloadURL(sRef(firebaseApps.storage, `/userpics/${e.target.files[0].name}`))}).then((url) =>{
//                     console.log(url)
                    
//                     set(ref(firebaseApps.database, 'users/' + userId + '/photoUrl'), url)
//                     setPhotoPath(url)

//                     setIsAvatarLoading(false)
//                 })
//             }
//         }>
//             <input accept=".png, .jpg, .jpeg, .gif" type='file' name='photo'/>
//             <button type="submit">Change photo</button>
//         </Form>
//     )
// }

// const Form = styled.form`
//     position: absolute;
//     z-index: 2;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     background-color: white;
//     width: 50vw;
//     height: 50vh;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     border: 1px solid orange;
//     border-radius: 20px
// `