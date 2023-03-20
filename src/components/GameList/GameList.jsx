import { GameCard } from "../GameCard/GameCard"
import styled from "styled-components"
import { Container } from "components/Container/Container"
export const GameList = ({games}) => {
    return (
        <Container>
            <List>
                {
                    games.map((game) => 
                    <Item key={game.id}>
                        <GameCard data={game} width={500} className={'gamecard_catalog'}/>
                    </Item>)
                }
            </List>
        </Container>
    )
}

const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    padding: 0 20px;

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