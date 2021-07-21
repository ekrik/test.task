import { Provider } from 'react-redux';
import store from './store/store.js';
import ListItems from './components/ListItems.js';

const App = () => {

  return (
    <Provider store = {store}>
      <ListItems/>
    </Provider>
  )
}

export default App;