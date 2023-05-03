import styled from 'styled-components';
import { animateScroll as scroll } from 'react-scroll';
import { AiOutlineCaretUp } from 'react-icons/ai';
import { useEffect, useState } from 'react';

export const ScrollButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setShowButton(window.scrollY > 0);
    });
  }, []);

  return (
    <ScrollToTopButton
      onClick={() => scroll.scrollToTop()}
      className={showButton ? 'show' : 'hidden'}
    >
      <AiOutlineCaretUp size="100%" fill="#00021A" />
    </ScrollToTopButton>
  );
};

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: -30px;
  transition: 200ms all ease;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  border-radius: 20px 20px 0 0;
  height: 30px;
  box-sizing: border-box;
  z-index: 11111111111;
  border: 1px solid orange;
  background-color: white;

  &.show {
    bottom: 0;
  }
`;
