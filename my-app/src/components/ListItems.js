import Item from './Item.js';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const ListWrap = styled.ul`
    list-style-type: none;
    width: 80%;
    margin: auto;
    font-family: sans-serif;
`

const ListItems = () => {
    const editId = useSelector(state => state.editItem.id);
    const stores = useSelector(state => state.stores);
    const viewDetail = useSelector(state => state.viewDetail);
    console.log(viewDetail, 'item');

    const items = stores.map(item => {
        if (item.id === editId && !viewDetail) {
            return <Item key={item.id} data={item} edit={true}/>            
        } else {
            return <Item key={item.id} data={item}/>
        }
    });

    return (
        <ListWrap>
            {items}
        </ListWrap>
    )
}

export default ListItems;