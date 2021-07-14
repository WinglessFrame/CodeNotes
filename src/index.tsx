import ReactDOM from 'react-dom';
import 'bulmaswatch/superhero/bulmaswatch.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import { Provider } from 'react-redux';
import CellList from './components/CellList';
import { store } from './store';
import useAuth from './hooks/useAuth';
import NavBar from './components/NavBar';
import Loading from './components/Loading';
import * as db from './firestore'

const App: React.FC = () => {
  const { user, loading } = useAuth()
  if (loading) return <Loading />
  if (user) db.fetchUserNotes(user?.uid)
  return (
    <>
      <NavBar user={user} />
      {user &&
        <Provider store={store}>
          <div>
            <CellList />
          </div>
        </Provider>
      }
    </>)
};


ReactDOM.render(<App />, document.querySelector('#root'));
