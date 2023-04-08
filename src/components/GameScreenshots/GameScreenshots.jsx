import styled from 'styled-components';
import { memo, useState } from 'react';
import { Modal, Backdrop } from 'components';
import { GoArrowRight, GoArrowLeft } from 'react-icons/go';

export const GameScreenshots = memo(({ screenshots }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeScreenshot, setActiveImage] = useState();

  return (
    <>
      <Screenshots>
        {screenshots.map(({ image, id }, index) => (
          <ScreenshotWrapper key={id}>
            <Screenshot
              src={image}
              alt="fdff"
              loading="lazy"
              onClick={() => {
                setShowModal(true);
                setActiveImage(index);
              }}
            />
          </ScreenshotWrapper>
        ))}
      </Screenshots>
      {showModal && (
        <Backdrop onClick={() => setShowModal(false)}>
          <Modal
            image={screenshots[activeScreenshot].image}
            onClick={() => setShowModal(false)}
          >
            <Button
              className={`previous ${activeScreenshot > 0 && 'enable'}`}
              onClick={() => {
                if (activeScreenshot > 0) setActiveImage(prev => prev - 1);
              }}
            >
              <GoArrowLeft />
            </Button>
            <Button
              className={`next ${
                activeScreenshot !== screenshots.length - 1 && 'enable'
              }`}
              onClick={() => {
                if (activeScreenshot !== screenshots.length - 1)
                  setActiveImage(prev => prev + 1);
              }}
            >
              <GoArrowRight />
            </Button>
          </Modal>
        </Backdrop>
      )}
    </>
  );
});
const Screenshots = styled.ul`
  width: 100%;
  height: auto;
  margin-bottom: 60px;

  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  backdrop-filter: blur(10px);
`;

const Screenshot = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const ScreenshotWrapper = styled.li`
  width: 100%;
  min-height: 250px;
  background-color: #000112;
  transition: 250ms all ease;
  cursor: zoom-in;

  clip-path: polygon(
    5% 0,
    100% 0,
    100% 10%,
    100% 91%,
    95% 100%,
    0 100%,
    0 71%,
    0 10%
  );

  &:hover {
    transform: scale(1.01);
    clip-path: none;
    z-index: 1111;
  }

  @media screen and (min-width: 768px) {
    width: calc((100% - 10px) / 2);
  }

  @media screen and (min-width: 1200px) {
    width: calc((100% - 20px) / 3);
  }

  @media screen and (min-width: 1440px) {
    width: calc((100% - 30px) / 4);
  }
`;

const Button = styled.button`
  position: absolute;
  bottom: 10px;
  background-color: #00021a;
  color: white;
  font-family: inherit;
  padding: 5px 7px;

  border: 1px solid orange;
  font-size: 20px;
  display: flex;
  align-items: center;
  transition: 100ms all ease;
  width: 100px;

  &.previous {
    left: -60px;
    border-radius: 0 10px 10px 0;
    justify-content: flex-end;

    &.enable:hover {
      left: -50px;
    }
  }
  &.next {
    right: -60px;
    border-radius: 10px 0 0 10px;
    justify-content: flex-start;

    &.enable:hover {
      right: -50px;
    }
  }
`;
