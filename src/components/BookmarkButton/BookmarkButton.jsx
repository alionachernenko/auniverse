import { useContext, useEffect, useState } from "react"
import { authContext } from '../../context/context'
import { removeGameFromFavourite, addGameToFavourite, getFavouriteGames } from "utils/firebase"
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs'

import styled from "styled-components"

export const BookmarkButton = ({gameData}) => {
    const { userId } = useContext(authContext)
    
    const [isFavourite, setIsFavourite] = useState()

    const { slug } = gameData

    const toggleIsFavourite = () => {
        if (isFavourite) {
            removeGameFromFavourite(userId, slug)
        }
        else if (!isFavourite) {
            addGameToFavourite(userId, slug, gameData)
        }
        
        setIsFavourite(prevState => !prevState)
    }

    useEffect(() => {
        getFavouriteGames(userId).then(res => {
            if(res.val()) setIsFavourite(Object.keys(res.val()).some(el => el === slug))
        })
    }, [userId, isFavourite, slug])

        return (
            <Button type="button" onClick={toggleIsFavourite}>
                Bookmark {isFavourite ? <BsFillBookmarkFill size='20px' /> : <BsBookmark size='20px' />}
            </Button>
        )
}
    


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