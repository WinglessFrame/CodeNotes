import ReactDOM from 'react-dom';
import 'bulma/css/bulma.min.css'
import 'bulmaswatch/superhero/bulmaswatch.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Provider } from 'react-redux';

import CellList from './components/CellList';
import { store } from './store';
import useAuth from './hooks/useAuth';
import NavBar from './components/NavBar';
import Loading from './components/Loading';

const MainApp: React.FC = () => {
  const { user, loading } = useAuth()
  if (loading) return <Loading />
  return (
    <>
      <NavBar />
      {user &&
        <div>
          <CellList />
        </div>
      }
    </>)
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>

  )
}


ReactDOM.render(<App />, document.querySelector('#root'));
