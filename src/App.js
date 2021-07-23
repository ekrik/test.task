import ListItems from './components/ListItems.js';
import Detail from './components/Detail.js';
import Error from './components/Error.js';
import { useSelector } from 'react-redux';

const App = () => {
  const { editId, viewDetail, error } = useSelector(state => state);

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