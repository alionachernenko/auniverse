import {
  FaPlaystation,
  FaSteam,
  FaAppStore,
  FaXbox,
  FaGooglePlay,
  FaItchIo,
} from 'react-icons/fa';
import { SiGogdotcom, SiNintendo, SiEpicgames } from 'react-icons/si';
import { RiXboxLine } from 'react-icons/ri';
import styled from 'styled-components';
import { memo } from 'react';

export const StoresList = memo(({ stores }) => {
  const icons = [
    <FaSteam />,
    <FaXbox />,
    <FaPlaystation />,
    <FaAppStore />,
    <SiGogdotcom />,
    <SiNintendo />,
    <RiXboxLine />,
    <FaGooglePlay />,
    <FaItchIo />,
    <SiEpicgames />,
  ];

  return (
    <List>
      {stores.map(({ url, store_id }) => (
        <li key={store_id}>
          <Link href={url} target="_blank" rel="noreferrer">
            {icons[store_id - 1]}
          </Link>
        </li>
      ))}
    </List>
  );
});

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
    gap: 20px;
  }

  & svg {
    width: 30px;
    height: 30px;
  }
`;

const Link = styled.a`
  position: relative;
  height: auto;
  overflow: hidden;
  display: block;
  transition: 250ms transform ease;

  &:hover {
    transform: scale(1.2);
  }
`;
