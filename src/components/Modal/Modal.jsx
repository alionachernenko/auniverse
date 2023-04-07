import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

export const Modal = ({ image, onClick, children }) => {
  return (
    <ModalWindow>
      <Image src={image} alt="" />
      <CloseButton type="button" onClick={onClick}>
        <MdClose color="white" size="100%" />
      </CloseButton>
      {children}
    </ModalWindow>
  );
};

const ModalWindow = styled.div`
  position: relative;
  width: 95%;
  max-width: 800px;
  height: auto;
  max-height: 95vh;
  overflow-y: overlay;
  overflow-x: hidden;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CloseButton = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  position: absolute;
  top: 10px;
  right: 12px;
  background-color: #00021a;
  border: 1px solid orange;
  transition: 150ms all ease;

  &:hover {
    transform: scale(1.1);
  }
`;
