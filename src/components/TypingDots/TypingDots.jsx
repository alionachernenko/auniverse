import styled, { keyframes } from 'styled-components';

export const TypingDots = ({ size, color, className }) => {
  return (
    <Dots className={`bouncing-loader ${className}`}>
      <div style={{ width: size, height: size, backgroundColor: color }}></div>
      <div style={{ width: size, height: size, backgroundColor: color }}></div>
      <div style={{ width: size, height: size, backgroundColor: color }}></div>
    </Dots>
  );
};

const loaderAnimation = keyframes`
to {
    opacity: 0.1;
    transform: translateY(-5px);
}
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;

  &.large {
    bottom: 110%;

    & > div {
      margin: 3px 6px;
    }
  }

  &.small {
    top: 15px;
    right: 10px;

    & > div {
      margin: 3px 2px;
    }
  }

  & > div {
    border-radius: 50%;
    opacity: 1;
    animation: ${loaderAnimation} 0.6s infinite alternate;
  }

  & > div:nth-child(2) {
    animation-delay: 0.2s;
  }

  & > div:nth-child(3) {
    animation-delay: 0.4s;
  }
`;
