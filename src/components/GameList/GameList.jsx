import { Container, GameCard } from 'components';
import styled from 'styled-components';

export const GameList = ({ games }) => {
  return (
    <Container>
      <List>
        {games.map(game => (
          <Item key={game.id}>
            <GameCard data={game} className={'catalog'} />
          </Item>
        ))}
      </List>
    </Container>
  );
};

const List = styled.ul`
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;

const Item = styled.li`
  width: 100%;
  display: flex;

  @media screen and (min-width: 650px) {
    width: calc((100% - 30px) / 2);
  }

  @media screen and (min-width: 1000px) {
    width: calc((100% - 60px) / 3);
  }

  @media screen and (min-width: 1440px) {
    width: calc((100% - 90px) / 4);
  }
`;
