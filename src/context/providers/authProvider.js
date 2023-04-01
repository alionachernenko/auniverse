import { authContext } from 'context';
import { useEffect, useState } from 'react';
import { userSignUp, userLogIn } from '../../utils/firebase/users';
import { addNewUser } from '../../utils/firebase/database';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../utils/firebase/users';

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        setUserId(user.uid);
      } else setIsLoggedIn(false);
    });
  }, []);

  const navigate = useNavigate();

  const handleLogInSubmit = (e, email, password) => {
    e.preventDefault();
    setIsLoading(true);

    userLogIn(email, password)
      .then(() => {
        navigate(`/profile/bookmarks`, { replace: 'true' });
        setIsLoading(false);
      })
      .catch(({ code }) => {
        toast.error(`${code.slice(5, code.length).split('-').join(' ')}`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setIsLoading(false);
      });
  };

  const handleSignUp = (e, email, password, username, photo) => {
    e.preventDefault();
    setIsLoading(true);
    userSignUp(email, password, username, photo)
      .then(({ user }) => {
        const { uid } = user;

        addNewUser(uid, email, [], username);
        navigate(`/profile/bookmarks`, { replace: 'true' });
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        toast.error(
          `${error.code.slice(5, error.code.length).split('-').join(' ')}`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
        setIsLoading(false);
      });
  };

  return (
    <authContext.Provider
      value={{
        handleLogInSubmit,
        isLoading,
        userId,
        handleSignUp,
        isLoggedIn,
        setUserId,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
