import { NavLink, useLocation } from 'react-router-dom';

import { MdClose } from 'react-icons/md';
import { ImHome2 } from 'react-icons/im';
import { FaUserCircle } from 'react-icons/fa';
import { IoLogoGameControllerB } from 'react-icons/io';
import { HiUsers } from 'react-icons/hi';
import { IoLogIn } from 'react-icons/io5';

import styled, { keyframes } from 'styled-components';
import { useContext } from 'react';
import { authContext } from 'context';
import { LogoutButton } from 'components/LogoutButton/LogoutButton';

export const DropdownMenu = ({ onClick }) => {
  const { isLoggedIn } = useContext(authContext);
  const location = useLocation();
  return (
    <Menu>
      <CloseButton onClick={onClick}>
        <MdClose color="orange" size="100%" />
      </CloseButton>
      <Options className={isLoggedIn && 'user-logged-in'}>
        <li>
          <OptionLink onClick={onClick} to={'/'}>
            <ImHome2 size={50} />
          </OptionLink>
        </li>
        <li>
          <OptionLink onClick={onClick} to={`/catalog${location.search}`}>
            <IoLogoGameControllerB size={50} />
          </OptionLink>
        </li>
        <li>
          <OptionLink onClick={onClick} to={'/users'}>
            <HiUsers size={50} />
          </OptionLink>
        </li>
        <li>
          {isLoggedIn ? (
            <OptionLink onClick={onClick} to={'/profile/bookmarks'}>
              <FaUserCircle size={50} />
            </OptionLink>
          ) : (
            <OptionLink onClick={onClick} to={'/login'}>
              <IoLogIn size={50} />
            </OptionLink>
          )}
        </li>
        {isLoggedIn && <LogoutButton className="dropdown-menu" />}
      </Options>
    </Menu>
  );
};

const menuShow = keyframes`
    0% {
        right: -100%
    }

    100% {
        right: 0
    }
`;

const Menu = styled.div`
  height: auto;
  padding: 20px;
  position: absolute;
  right: 20px;
  top: 20px;

  border-radius: 20px;
  overflow: hidden;

  background-color: #00021a;
  animation: ${menuShow} 100ms ease;
`;

const Options = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 30px;
  gap: 20px;

  &.user-logged-in {
    margin-bottom: 30px
  }
`;

const CloseButton = styled.button`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  right: 0;

  background-color: white;
  border: orange;
`;

const OptionLink = styled(NavLink)`
  &.active svg {
    fill: orange;
  }
`;
