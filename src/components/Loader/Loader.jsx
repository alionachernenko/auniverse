import { FidgetSpinner } from 'react-loader-spinner';
import styled from 'styled-components';

export const Loader = ({ className, color }) => {
  return (
    <Wrapper className={className}>
      <FidgetSpinner
        backgroundColor={color}
        ballColors={['orange', 'darkblue', 'red']}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: fit-content;
  &.loader-homepage {
    margin: auto;
    @media screen and (min-width: 1200px) {
      margin-left: 100px;
    }
  }
  &:not(.loader-homepage) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
  }
`;
