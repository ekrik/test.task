import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SAVE_ITEM, EDIT_ITEM, DELETE_ITEM, VIEW_DETAIL, ERROR } from '../store/action.js';
import server from '../server.js';
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
    font-size: 20px;
    line-height: 24px;
    padding: 5px;
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
    border: none;
    padding: 5px;
    display: block;
    margin-bottom: 15px;
    font-size: 20px;
    line-height: 24px;
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
    const { id, name, workTime, workTime: { descr } } = props.data;
 
    const [newName, setNewName] = useState(name);
    const [newDescr, setNewDescr] = useState(descr);

    const changeField = (e) => {
        switch (e.target.name) {
            case 'name':
                    setNewName(e.target.value);                
                break;
            case 'descr':
                    setNewDescr(e.target.value);                
                break;            
            default:
                break;
        }
    }

    const onDelete = () => {
        const response = server.response('delete');

        if (response !== 200) {
            dispatch({type: ERROR, value: response});
        } else {
            dispatch({type: DELETE_ITEM, id: id});
        }
    }

    const onEdit = () => {
        dispatch({type: EDIT_ITEM, id: id});
    }

    const onSave = () => {
        const newItem = {
            ...props.data,
            name: newName,
            workTime: {
                ...workTime,
                descr: newDescr
            }
        };

        const response = server.response('save');

        if (response !== 200) {
            dispatch({type: ERROR, value: response});
        } else {
            dispatch({type: SAVE_ITEM, item: newItem});
        }
    }

    const onOpenDetail = (item) => {
        let flag = true;

        if (store.getState().editId) {
            flag = window.confirm('Изменения не вступят в силу. Продолжить?');
        }
        
        if (flag) {
            if (store.getState.editId) {
                dispatch({type: EDIT_ITEM, id: false});
            }
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
                <Input type="text" value={newName} name="name" onChange={(e) => { changeField(e) }} autoComplete="off"/>
                <Input type="text" value={newDescr} name="descr" onChange={(e) => { changeField(e) }} autoComplete="off"/>
            </form>
        )
    }

    return (
        <ItemWrapp>
            <Section>
                { props.edit ? renderForm() : render() }
            </Section>
            <Section>
                <Button onClick={() => { props.edit ? onSave(): onEdit() }}>{ props.edit ? 'Save' : 'Edit' }</Button>
                <Button onClick={() => { onDelete() }}>Delete</Button>
                <Button onClick={() => { onOpenDetail(props.data) }}>More</Button>
            </Section>
        </ItemWrapp>
    );
}

export default Item;