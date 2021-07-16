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


const AuthApp: React.FC = () => {
  return (
    <div>
      <CellList />
    </div>
  )
};

const UnAuthApp: React.FC = () => {
  return (
    <div>
      <h2 className="has-text-centered is-size-3 my-4">
        Please, sign Up to save your notes and add new cells with code and text!
      </h2>
      <CellList />
    </div>
  )
}

const App: React.FC = () => {
  const { user, loading } = useAuth()

  return (
    <>
      {loading &&
        (<Loading />)
      }

      <NavBar />

      {user ?
        (<AuthApp />)
        :
        (<UnAuthApp />)
      }
    </>
  )
}


ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector('#root'));
