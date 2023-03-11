import { useContext, useEffect, useState } from "react"
import authContext from '../../context/context'
import { removeGameFromFavourite, addGameToFavourite, getFavouriteGames } from "services/firebase"
import { FaHeart, FaHeartBroken } from "react-icons/fa"
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
            }}><FaHeartBroken size='30px' fill="orange"/></Button> :
            <Button type="button" onClick={() => {
                addGameToFavourite(userId, gameData.slug, gameData)
                setIsFavourite(true)
            }}><FaHeart size='30px' fill="orange"/></Button>}</>
        )
    }

const Button = styled.button`
    background-color: white;
    height: auto;
    width: auto;
    border: none;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center
`