import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CellList from './components/CellList';
import { store } from './store';

import 'bulmaswatch/superhero/bulmaswatch.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import useAuth from './hooks/useAuth';
import NavBar from './components/NavBar';

const App: React.FC = () => {
  const { user, loading } = useAuth()
  if (loading) return <h1>Loading...</h1>
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
