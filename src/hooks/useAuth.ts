import firebase from 'firebase/app';
import React from 'react';
import * as db from '../firestore';

function useAuth() {
  const [user, setUser] = React.useState<firebase.User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    return db.checkAuth((user) => {
      setLoading(false);
      setUser(user);
    });
  }, []);

  return { user, loading };
}

export default useAuth;
