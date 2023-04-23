import { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate, useRoutes } from 'react-router-dom';

import {
  fetchBookmarks,
  fetchUserInfo,
  fetchFriendsList,
  fetchFriendsInvitationsList,
} from 'utils';
import {
  Loader,
  ProfileCard,
  Container,
  ErrorComponent,
  Friends,
  Bookmarks,
} from 'components';

import { authContext } from 'context';

import avatarPlaceholder from '../../assets/images/avatar-placeholder.png';
import styled from 'styled-components';

const AccountPage = () => {
  const { userId, isLoggedIn } = useContext(authContext);
  const [friends, setFriends] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [username, setUsername] = useState('');
  const [invitations, setInvitations] = useState([]);
  const [photoPath, setPhotoPath] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const routes = useRoutes([
    {
      path: '/friends',
      element: (
        <Friends
          navigate={navigate}
          friends={friends}
          setFriends={setFriends}
          invitations={invitations}
          setInvitations={setInvitations}
        />
      ),
    },
    {
      path: '/bookmarks',
      element: <Bookmarks navigate={navigate} bookmarks={bookmarks} setBookmarks={setBookmarks}/>,
    },
  ]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login/login-page');
      return;
    }

    Promise.all([
      fetchUserInfo(userId),
      fetchBookmarks(userId),
      fetchFriendsList(userId),
      fetchFriendsInvitationsList(userId),
    ])
      .then(res => {
        const [snapshot, games, friends, invitations] = res;
        if (snapshot.exists()) {
          const { username, photoUrl } = snapshot.val();
          setUsername(username);
          if (photoUrl) {
            setPhotoPath(photoUrl);
          } else {
            setPhotoPath(avatarPlaceholder);
          }
        } else {
          setUsername('User');
        }

        if (games.val()) setBookmarks([...Object.values(games.val())]);
        if (friends.val()) setFriends([...Object.values(friends.val())]);
        if (invitations.val())
          setInvitations([...Object.values(invitations.val())]);

        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsError(true);
        setIsLoading(false);
      });
  }, [isLoggedIn, navigate, userId]);

  return (
    <>
      <Page style={{ marginTop: 61 }}>
        <Container>
          {isLoading ? (
            <Loader className={'loader-profile'} color={'white'} />
          ) : isError ? (
            <ErrorComponent />
          ) : (
            <>
              <Page>
                <ProfileCard
                  setPhotoPath={setPhotoPath}
                  avatar={photoPath}
                  username={username}
                  setUsername={setUsername}
                  setInvitations={setInvitations}
                  setFriends={setFriends}
                />
                <OutletsSection>
                  <Tabs>
                    <Tab to="bookmarks">Bookmarks</Tab>
                    <Tab to="friends">
                      Friends{' '}
                      {invitations.length > 0 && (
                        <InvitationsIndicator>
                          {invitations.length}
                        </InvitationsIndicator>
                      )}
                    </Tab>
                  </Tabs>

                  {routes}
                </OutletsSection>
              </Page>
            </>
          )}
        </Container>
      </Page>
    </>
  );
};

const InvitationsIndicator = styled.span`
  width: 15px;
  height: 15px;
  border-radius: 8px;
  position: absolute;
  top: 0;
  right: -15px;

  font-size: 14px;
  text-align: center;
  vertical-align: center;

  background-color: green;
`;

const Page = styled.div`
  width: 100%;
  min-height: calc(100vh - 61px);
  padding: 20px;
  box-sizing: border-box;

  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  color: white;

  background-color: #00021a;

  @media screen and (min-width: 1200px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const OutletsSection = styled.div`
  width: 100%;

  @media screen and (min-width: 1200px) {
    margin-left: auto;
  }

  @media screen and (min-width: 768px) {
    width: 50%;
  }
`;


const Tabs = styled.div`
  margin-bottom: 20px;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0 40px;
`;

const Tab = styled(NavLink)`
  display: block;
  padding: 10px 0;
  border: none;

  font-family: 'Nunito', sans-serif;
  font-size: 20px;
  font-weight: 500;

  position: relative;
  background-color: transparent;
  cursor: pointer;
  color: white;

  &.active::after {
    content: '';
    display: block;
    height: 3px;
    width: 100%;
    border-radius: 4px;
    position: absolute;
    bottom: 0;
    left: 0;

    background-color: #ff6600;
  }
`;
export default AccountPage;
