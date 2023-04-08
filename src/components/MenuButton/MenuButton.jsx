import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { DropdownMenu, Backdrop } from 'components';
import styled from 'styled-components';

export const MenuButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsMenuOpen(true)}>
        <GiHamburgerMenu color="white" size="100%" />
      </Button>
      {isMenuOpen && (
        <Backdrop onClick={() => setIsMenuOpen(false)}>
          <DropdownMenu onClick={() => setIsMenuOpen(false)} />
        </Backdrop>
      )}
    </>
  );
};

const Button = styled.button`
  border: none;
  padding: 0;
  width: 20px;
  height: 20px;

  background-color: transparent;

  @media screen and (min-width: 1201px) {
    display: none;
  }
`;
