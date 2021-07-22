import ListItems from './components/ListItems.js';
import Detail from './components/Detail.js';
import { useSelector } from 'react-redux';

const App = () => {
  const dataDetail = useSelector(state => state.viewDetail);
  const editItem = useSelector(state => state.editItem);

  return (
    <div>
        {dataDetail &&
          <Detail data={dataDetail} edit={editItem}/>
        }
        <ListItems/>
    </div>
  )
}

export default App;