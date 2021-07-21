import Item from './Item.js';
import data from '../dataset.json';

const ListItems = () => {
    const html = data.stores.map((item) => {
        return <Item key={item.id} data={item}/>
    });

    return (
        <div>
            { html }
        </div>
    )
}

export default ListItems;