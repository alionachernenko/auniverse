import { useOutletContext } from "react-router-dom"
import styled from "styled-components"
import { Link } from "react-router-dom"
export const Bookmarks = () => {
    const [favouriteGames] = useOutletContext()
    return (
        <Block>
            <BookmarksList>
                {favouriteGames.map(game => <li>
                    <img src={`${game.background_image}`} alt={`${game} poster`}></img>
                    <Link to={`/catalog/${game.slug}`}>{game.name}</Link>
                </li>)}
            </BookmarksList>
        </Block>
    )
}
const Block = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

`

const BookmarksList = styled.ul`
    display: flex;
    flex-direction: column;

    list-style: none;
    gap: 10px;
    padding: 10px;
    width: 100%;
    align-items: center;
    overflow: hidden;
    height: 100%;

    & img{
        width: 90px;
        height: 67px;
        margin-right: 10px;
        object-fit: cover;
        border-radius: 10px
    }

    & li{
        padding: 10px;
        display: flex;
        width: 100%;
        background-color: white;
        align-items: center;
        font-weight: 900;
        border-radius: 20px

    }

    & a {
        color: black;
    }

    @media screen and (min-width: 1200px) {
            width: 50%;
    }
`
