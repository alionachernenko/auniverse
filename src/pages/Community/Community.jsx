import { useContext, useEffect, useState } from 'react';
import { fetchUsers } from 'utils';
import { authContext } from 'context';

import { UserCard, Container, ErrorComponent, Loader } from 'components';

import { Link } from 'react-router-dom';

import styled, { keyframes } from 'styled-components';

const Users = () => {
  const [userIDs, setUserIDs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { userId, isLoggedIn } = useContext(authContext);

  useEffect(() => {
    fetchUsers()
      .then(res => {
        const IDs = res.val();

        if (IDs) {
          setUserIDs(Object.keys(IDs).filter(ID => ID !== userId));
        }

        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsError(true);
        setIsLoading(false);
      });
  }, [userId]);

  return (
    <div style={{ minHeight: '100vh', marginTop: 61 }}>
      {isLoading ? (
        <Loader className={'loader-profile'} color={'#00021A'} />
      ) : isError ? (
        <ErrorComponent />
      ) : (
        <>
          <TitleWrapper>
            <Title>Find friends among the fans in our community</Title>
            {!isLoggedIn && (
              <JoinUsLink to="/login/signup-page">Join us</JoinUsLink>
            )}
          </TitleWrapper>
          <Page>
            <Container>
              {isLoading ? (
                <Loader className={'loader-profile'} color={'#00021A'} />
              ) : isError ? (
                <ErrorComponent />
              ) : (
                <>
                  <UsersList>
                    {userIDs.map(userID => (
                      <UserCard id={userID} key={userID} />
                    ))}
                  </UsersList>
                </>
              )}
            </Container>
          </Page>
        </>
      )}
    </div>
  );
};

const showTitle = keyframes`
    from {
        left: -100%
    }

    to {
        left: 0
    }
`;

const Page = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  min-height: calc(100vh - 61px);
  background-color: #fff;
`;

const UsersList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  position: relative;
  text-align: center;
  color: white;
  text-shadow: 2px 4px purple;
  font-size: 30px;

  @media screen and (min-width: 420px) {
    font-size: 50px;
  }

  @media screen and (min-width: 768px) {
    font-size: 80px;
  }

  @media screen and (min-width: 1200px) {
    font-size: 100px;
  }

  animation: ${showTitle} 500ms ease;
`;

const TitleWrapper = styled.div`
  width: 100%;
  background-color: #00021a;
  padding: 50px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;
const JoinUsLink = styled(Link)`
  display: block;
  box-sizing: border-box;
  padding: 10px 20px;

  position: relative;

  font-family: 'Nunito', sans-serif;
  font-size: 20px;

  background-color: orange;
  box-shadow: red 2px 3px;

  transition: 100ms all linear;
  animation: ${showTitle} 600ms ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: red 4px 5px;

    color: orange;
    background-color: white;
  }

  &::before {
    content: '';
    height: 20px;
    border-top: 2px solid orange;
    border-right: 2px solid orange;

    position: absolute;
    top: 0px;
    right: 0px;
    width: 20px;

    background-color: transparent;

    transition: 100ms all linear;
  }

  &::after {
    content: '';
    height: 20px;
    border-bottom: 2px solid orange;
    border-left: 2px solid orange;

    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 20px;

    background-color: transparent;
    transition: 100ms all linear;
  }

  &:hover::after {
    bottom: -15px;
    left: -13px;
  }

  &:hover::before {
    top: -13px;
    right: -15px;
  }
`;

export default Users;
