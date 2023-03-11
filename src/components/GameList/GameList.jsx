import { GameCard } from "../GameCard/GameCard"
import styled from "styled-components"
export const GameList = ({games}) => {
    return (
        <List>
            {
                games.map((game) => 
                <li key={game.id}>
                    <GameCard data={game} width={500} className={'gamecard_catalog'}/>
                </li>)
            }
        </List>
    )
}

const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    gap: 30px;
    margin-bottom: 20px
`