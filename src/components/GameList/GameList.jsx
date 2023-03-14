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
    // display: flex;
    // flex-wrap: wrap;
    // list-style: none;
    // gap: 30px;
    // margin-bottom: 20px

    align-items: center;
    display: grid;
    max-width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-gap: 1em;
    margin-top: 0;
    margin-bottom: 0;
    padding: 0;

`

const Item = styled.li`
    display: flex;
    justify-content: center
`