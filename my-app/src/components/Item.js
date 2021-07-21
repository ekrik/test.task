import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SAVE_ITEM, EDIT_ITEM, CHANGE_EDIT_ITEM } from '../store/action.js';
import store from '../store/store.js';

const Item = (props) => {
    const dispatch = useDispatch();
    const { name } = props.data;
    const edit = useSelector(state => state.editItem);

    const changeField = (e) => {
        dispatch({type: CHANGE_EDIT_ITEM, value: e.target.value});
    }

    const onEdit = () => {
        let flag = true;

        if (store.getState().editItem && store.getState().editItem.id !== props.data) {
            flag = window.confirm('Изменения не вступят в силу. Продолжить?');
        }
        
        if (flag) {
            dispatch({type: EDIT_ITEM, item: props.data});
        }
    }

    const onSave = () => {
        dispatch({type: SAVE_ITEM, item: store.getState().editItem});
    }

    const render = () => {
        return (
            <div>
                <p>{ name }</p>
            </div>
        )
    }

    const renderForm = () => {
        return (
            <form>
                <input type="text" value={edit.name} name="name" onChange={(e) => { changeField(e) }} autoComplete="off"/>
            </form>
        )
    }

    const rend = (
        <div>
            { props.edit ? renderForm() : render() }
            <button onClick={() => { props.edit ? onSave(): onEdit() }}>{ props.edit ? 'save' : 'edit' }</button>
        </div>
    );

    return rend;
}

export default Item;