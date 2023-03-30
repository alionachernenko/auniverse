import { memo, useContext } from "react"
import { authContext } from 'context'
import { removeGameFromBookmarks, addGameToBookmarks } from "utils"
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs'
import { useParams } from "react-router-dom"

import styled from "styled-components"

export const BookmarkButton = memo(({isBookmark, gameData, setIsBookmark}) => {
    const { userId } = useContext(authContext)
    const {gameSlug} = useParams()

    const toggleIsFavourite = () => {
        if (isBookmark) {
            removeGameFromBookmarks(userId, gameSlug)
        }
        else {
            addGameToBookmarks(userId, gameSlug, gameData)
        }
        
        setIsBookmark(prevState => !prevState)
    }


        return (
            <Button type="button" onClick={toggleIsFavourite}>
                Bookmark {isBookmark ? <BsFillBookmarkFill size='20px' /> : <BsBookmark size='20px' />}
            </Button>
        )
})
    


const Button = styled.button`
    height: auto;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    font-family: 'Nunito', sans-serif;
    font-size: 17px;

    color: white;
    background-color: rgba(84, 84, 84, 0.5);
`