import { GameCard } from "../GameCard/GameCard"
import { Container } from "components/Container/Container"
import styled from "styled-components"

export const GameList = ({ games }) => {

    
    return (
        <Container>
            <List>
                {
                    games.map((game) => 
                    <Item key={game.id}>
                        <GameCard data={game} className={'gamecard_catalog'}/>
                    </Item>)
                }
            </List>
        </Container>
    )
}

const List = styled.ul`
    padding: 0 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
`

const Item = styled.li`
    width: 100%;

    @media screen and (min-width: 768px) {
        width: calc((100% - 30px)/2);
    }

    @media screen and (min-width: 1200px) {
        width: calc((100% - 60px)/3);
    }

    @media screen and (min-width: 1440px) {
        width: calc((100% - 90px)/4);
    }
`