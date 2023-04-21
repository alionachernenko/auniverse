import { Link, useLocation } from 'react-router-dom';
import {
  SearchForm,
  Navigation,
  Container,
  MenuButton,
  ProfileButton,
  Logo,
} from 'components';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

import styled from 'styled-components';
import { LogoutButton } from 'components/LogoutButton/LogoutButton';
import { useContext, useState } from 'react';
import { authContext } from 'context';

export const Header = ({ onSubmit }) => {
  const { isLoggedIn } = useContext(authContext);
  const [showLogoutOption, setShowLogoutOption] = useState(false);
  const location = useLocation();

  return (
    <>
      <PageHeader>
        <Container>
          <HeaderContainer>
            <Link to="/">
              <Logo className={'logo_header'}>AUNIVERSE</Logo>
            </Link>
            <>
              {location.pathname !== '/catalog' && (
                <SearchForm onSubmit={onSubmit} className={'header'} />
              )}
              <Navigation />
              <ProfileOptions>
                <ProfileMenu>
                  <ProfileButton />
                  {isLoggedIn && (!showLogoutOption ? (
                    <IoMdArrowDropdown
                      color="white"
                      onClick={() => setShowLogoutOption(prev => !prev)}
                      className="open-logout-menu-icon open"
                    />
                  ) : (
                    <IoMdArrowDropup
                      color="white"
                      onClick={() => setShowLogoutOption(prev => !prev)}
                      className="open-logout-menu-icon close"
                    />
                  ))}
                </ProfileMenu>{' '}
              </ProfileOptions>
              <MenuButton />
            </>
          </HeaderContainer>
        </Container>
      </PageHeader>
      <LogOutOption className={showLogoutOption ? 'show' : 'hide'}>
        <LogoutButton
          setShowLogoutOption={setShowLogoutOption}
          className="header"
        />
      </LogOutOption>
    </>
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

const ProfileMenu = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  & .open-logout-menu-icon {
    transition: 150ms all ease;

    &:hover {
      &.open {
        transform: translateY(3px);
      }

      &.close {
        transform: translateY(-3px);
      }
    }
    @media screen and (max-width: 1199px) {
      display: none;
    }
  }
`;

const LogOutOption = styled.div`
  position: fixed;
  right: 50px;
  width: auto;
  z-index: 1;
  transition: 150ms all ease;

  &.show {
    top: 60px;
  }

  &.hide {
    top: 0;
  }

  @media screen and (max-width: 1199px) {
    display: none;
  }
`;

const ProfileOptions = styled.div`
  width: auto;
`;
