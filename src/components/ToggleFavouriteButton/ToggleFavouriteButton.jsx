import { useContext, useEffect, useState } from "react"
import authContext from '../../context/context'
import { removeGameFromFavourite, addGameToFavourite, getFavouriteGames } from "utils/firebase"
import {BsBookmark, BsFillBookmarkFill} from 'react-icons/bs'
import styled from "styled-components"

export const ToggleFavouriteButton = ({gameData}) => {
    const {userId} = useContext(authContext)
    const [isFavourite, setIsFavourite] = useState()

    useEffect(() => {
        getFavouriteGames(userId).then(res => {
            if(res.val()) setIsFavourite(Object.keys(res.val()).some(el => el === gameData.slug))
        })
    }, [gameData.slug, userId, isFavourite])

        return (
            <>{isFavourite ? <Button type="button" onClick={() => {
                removeGameFromFavourite(userId, gameData.slug)
                setIsFavourite(false)
            }}>Bookmark <BsFillBookmarkFill size='20px'/></Button> :
            <Button type="button" onClick={() => {
                addGameToFavourite(userId, gameData.slug, gameData)
                setIsFavourite(true)
            }}>Bookmark <BsBookmark size='20px'/></Button>}</>
        )
    }

const Button = styled.button`
    background-color: rgba(84, 84, 84, 0.5);
    color: white;
    height: auto;
    padding: 10px 20px;
    font-size: 17px;
    display: flex;
    gap: 10px;
    border: none;
    border-radius: 10px;
    font-family: 'Nunito', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center
`