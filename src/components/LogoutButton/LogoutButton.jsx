import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from 'context';

import styled from 'styled-components';
import { userSignOut } from 'utils';
import { MdLogout } from 'react-icons/md';

export const LogoutButton = ({ setShowLogoutOption, className }) => {
  const { setUserId } = useContext(authContext);
  const navigate = useNavigate();

  const logOut = () => {
    userSignOut().then(() => {
      navigate('/login/login-page');
      setUserId('');
      setShowLogoutOption(false);
    });
  };
  return (
    <Button type="button" onClick={logOut} className={className}>
      Log out
      <MdLogout size="15px" />
    </Button>
  );
};

const Button = styled.button`
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  height: auto;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0 0 10px 10px;
  color: white;
  background-color: #80808047;

  user-select: none;

  &.dropdown-menu {
    position: absolute;
    padding: 10px 0;
    bottom: 0;
    right: 0;
    width: 100%
  }


  &.header {
  padding: 5px 10px;
  }
}
`;
