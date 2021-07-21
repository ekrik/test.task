import Item from './Item.js';
import { useSelector } from 'react-redux';
import store from '../store/store.js';

const ListItems = () => {
    const editId = useSelector(state => state.editItem.id);

    const items = store.getState().stores.map(item => {
        if (item.id === editId) {
            return <Item key={item.id} data={item} edit={true}/>            
        } else {
            return <Item key={item.id} data={item}/>
        }
    });

    return (
        <div>
            {items}
        </div>
    )
}

export default ListItems;