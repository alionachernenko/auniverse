import { Link, useLocation } from 'react-router-dom';
import {
  SearchForm,
  Navigation,
  Container,
  MenuButton,
  ProfileButton,
  Logo,
} from 'components';

import styled from 'styled-components';
export const Header = ({ onSubmit }) => {
  const location = useLocation();

  return (
    <PageHeader>
      <Container>
        <HeaderContainer>
          <Link to="/">
            <Logo className={'logo_header'}>AUNIVERSE</Logo>
          </Link>
          <>
            {location.pathname === '/' && (
              <SearchForm onSubmit={onSubmit} className={'header'} />
            )}
            <Navigation />
            <ProfileButton />
            <MenuButton />
          </>
        </HeaderContainer>
      </Container>
    </PageHeader>
  );
};

const PageHeader = styled.header`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 0 13px;
  position: fixed;
  z-index: 111111;
  display: flex;
  top: 0;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  background-color: #00021a;

  @media screen and (min-width: 420px) and (max-width: 767px) {
    padding: 0 16px;
  }

  @media screen and (min-width: 768px) {
    padding: 0 70px;
  }
`;

const HeaderContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
