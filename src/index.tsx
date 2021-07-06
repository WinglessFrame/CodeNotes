import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CellList from './components/CellList';
import { store } from './store';

import 'bulmaswatch/superhero/bulmaswatch.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

const App = () => {

  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
