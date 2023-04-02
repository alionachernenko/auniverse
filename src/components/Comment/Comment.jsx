import { memo, useContext, useEffect, useState } from "react"
import { fetchUserInfo } from "utils"
import styled from "styled-components"
import { Link, useLocation } from "react-router-dom"
import { authContext } from "context"

export const Comment = memo(({ authorId, text }) => {

    const [authorAvatar, setAuthorAvatar] = useState()
    const [authorUsername, setAuthorUsername] = useState('')
    const location = useLocation()
    const { userId } = useContext(authContext)
        
    useEffect(() => {
        fetchUserInfo(authorId).then(res => {
            const { username, photoUrl} = res.val()
            
            setAuthorUsername(username)
            setAuthorAvatar(photoUrl)
        }).catch(error => {
            console.log(error)
        }
    )
    }, [authorId])

    return (
        <CommentWrapper>
            <AuthorInfo>
                <AvatarWrapper>
                    {authorAvatar && <AuthorAvatar src={authorAvatar} alt={`${authorUsername}'s avatar`}></AuthorAvatar>}
                </AvatarWrapper>
                <AuthorName>
                    <Link to={authorId === userId ? '/profile/bookmarks' : `/users/${authorId}/bookmarks`}
                        state={{ from: location.pathname }}>
                        {authorUsername}
                    </Link>
                </AuthorName>
            </AuthorInfo>
            <CommentText>{text}</CommentText>
        </CommentWrapper>
    )
})

const CommentWrapper = styled.li`
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
    border: 2px solid #2F3149;
    border-radius: 20px;
    
    @media screen and (min-width: 768px){
        width: 542px;
    }
`

const AuthorName = styled.p`
    color: white
`

const CommentText = styled.p`
    color: white
`

const AuthorInfo = styled.div`
    margin-bottom: 10px;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
   
`

const AvatarWrapper = styled.div`
    height: 60px;
    width: 60px;
    overflow: hidden;
    margin-right: 10px;
    position: relative;
    border-radius: 100px;    
`

const AuthorAvatar = styled.img`
    width: 60px;
    height: 60px;
    object-fit: cover;
`