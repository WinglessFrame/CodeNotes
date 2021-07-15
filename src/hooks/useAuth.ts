import { useTypedSelector } from './useTypedSelector';
import { useActions } from './useActions';
import firebase from 'firebase/app';
import React from 'react';
import * as db from '../firestore';

function useAuth() {
  const [user, setUser] = React.useState<firebase.User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { setUser: setFirebaseUser } = useActions();
  const stateUser = useTypedSelector((state) => state.user.user);
  React.useEffect(() => {
    return db.checkAuth((user) => {
      setLoading(false);
      setUser(user);
      if (!stateUser) {
        setFirebaseUser(user);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, loading };
}

export default useAuth;
