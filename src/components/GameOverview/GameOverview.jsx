import styled from 'styled-components';
import { memo, useState } from 'react';

export const GameOverview = memo(({ description }) => {
  const [showOverview, setShowOverview] = useState(false);

  const toggleShowDescription = () => {
    setShowOverview(prev => !prev);
  };

  return (
    <>
      <Overview className={showOverview ? 'more' : 'less'}>
        {description}
      </Overview>
      {description.length > 673 && (
        <ToggleShowButton onClick={toggleShowDescription}>
          Show {showOverview ? 'less' : 'more'}
        </ToggleShowButton>
      )}
    </>
  );
});

const Overview = styled.p`
  color: white;
  max-width: 80vw;
  font-size: 20px;
  line-height: 35px;
  overflow: hidden;
  transition: 250ms all ease;

  text-overflow: ellipsis;

  &.less {
    height: auto;
    max-height: 205px;
  }

  &.more {
    height: auto;
    margin-bottom: 20px;
  }
`;

const ToggleShowButton = styled.button`
  background-color: transparent;
  font-family: 'Nunito', sans-serif;
  color: white;
  font-size: 17px;
  padding: 5px 10px;
  border: 1px solid orange;
  border-radius: 10px;
`;
