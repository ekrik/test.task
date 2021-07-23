import ListItems from './components/ListItems.js';
import Detail from './components/Detail.js';
import Error from './components/Error.js';
import dataset from './dataset.json';
import { useDispatch, useSelector } from 'react-redux';
import { INIT_DATA } from './store/action.js';

const App = () => {  
  const dispatch = useDispatch();
  const { editId, viewDetail, error, stores } = useSelector(state => state);

  const getData = () => {
    dispatch({type: INIT_DATA, stores: dataset.stores});    
  }
  
  if (!stores) {
    getData();
  }

  return (
    <div>
        {error &&
          <Error text={error}/>
        }
        {viewDetail &&
          <Detail data={viewDetail} edit={editId}/>
        }
        <ListItems/>
    </div>
  )
}

export default App;