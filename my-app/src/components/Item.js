import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SAVE_ITEM, EDIT_ITEM, CHANGE_EDIT_ITEM, DELETE_ITEM, VIEW_DETAIL } from '../store/action.js';
import store from '../store/store.js';
import styled from 'styled-components';

const ItemWrapp = styled.div`
    background-color: #7c7b89;
    margin-bottom: 20px;
    display: flex;
    padding: 20px;
`;
const ItemP = styled.p`
    color: white;
    margin-bottom: 15px;
`;
const Button = styled.button`
    display: block;
    width: 100px;
    height: 26px;
    margin-bottom: 5px;
    outline: 0;
    border-radius: 0;
    border: 1px solid #f1e4de;
    font-weight: bold;
    cursor: pointer;
`;

const Input = styled.input`
    display: block;
    margin-bottom: 15px;
    width: 100%;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    &:last-child {
        align-items: flex-end;
    }
`;

const Item = (props) => {
    const dispatch = useDispatch();
    const { id, name, workTime: { descr } } = props.data;
    const edit = useSelector(state => state.editItem);

    const changeField = (e) => {
        dispatch({
            type: CHANGE_EDIT_ITEM,
            value: e.target.value,
            name: e.target.name
        });
    }

    const onDelete = (id) => {
        if (window.confirm('Удалить запись ' + id + '?')) {
            dispatch({type: DELETE_ITEM, id: id});
        }
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
        dispatch({type: SAVE_ITEM, item: edit});
    }

    const onOpenDetail = (item) => {
        let flag = true;

        if (store.getState().editItem) {
            flag = window.confirm('Изменения не вступят в силу. Продолжить?');
        }

        if (flag) {
            dispatch({type: EDIT_ITEM, item: false})
            dispatch({type: VIEW_DETAIL, item: item});
        }
    }

    const render = () => {
        return (
            <React.Fragment>
                <ItemP>{ name }</ItemP>
                <ItemP>{ descr }</ItemP>
            </React.Fragment>
        )
    }

    const renderForm = () => {
        return (
            <form>
                <Input type="text" value={edit.name} name="name" onChange={(e) => { changeField(e) }} autoComplete="off"/>
                <Input type="text" value={edit.workTime.descr} name="descr" onChange={(e) => { changeField(e) }} autoComplete="off"/>
            </form>
        )
    }

    const renderWrap = (
        <ItemWrapp>
            <Section>
                { props.edit ? renderForm() : render() }
            </Section>
            <Section>
                <Button onClick={() => { props.edit ? onSave(): onEdit() }}>{ props.edit ? 'Save' : 'Edit' }</Button>
                <Button onClick={() => { onDelete(id) }}>Delete</Button>
                <Button onClick={() => { onOpenDetail(props.data) }}>More</Button>
            </Section>
        </ItemWrapp>
    );

    return renderWrap;
}

export default Item;