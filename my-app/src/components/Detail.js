import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_DETAIL, CHANGE_EDIT_ITEM, SAVE_ITEM, EDIT_ITEM } from "../store/action";
import styled from "styled-components";

const DetailWrap = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: grey;
`;

const DetailWindow = styled.div`
    position: absolute;
    width: 60%;
    height: 60%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
`; 

const DetailP = styled.p`
    margin-bottom: 20px;
    font-size: 24px;
`;

const Input = styled.input`
    display: block;
    width: 100%;
    margin-bottom: 20px;
`;

const Button = styled.button`
    text-align: center;
    width: 100px;
    height: 26px;
    outline: 0;
    border-radius: 0;
    border: 1px solid #f1e4de;
    font-weight: bold;
    cursor: pointer;
`;

const Detail = (props) => {
    const dispatch = useDispatch();
    const edit = useSelector(state => state.editItem);
    const {name, address: {address, coordinates: {lat, lon}}, workTime: { descr }} = props.data; 

    const closeDetail = () => {
        dispatch({type: CLOSE_DETAIL});
    }

    const changeField = (e) => {
        dispatch({
            type: CHANGE_EDIT_ITEM,
            value: e.target.value,
            name: e.target.name
        });
    }

    const onEdit = () => {
        dispatch({type: EDIT_ITEM, item: props.data});
    }

    const onSave = () => {
        dispatch({type: SAVE_ITEM, item: edit});
    }

    const render = () => {
        return (
            <React.Fragment>
                <DetailP>Имя: {name}</DetailP>
                <DetailP>Время работы: {descr}</DetailP>
                <DetailP>Адрес: {address}</DetailP>
                <DetailP>Широта: {lat}</DetailP>
                <DetailP>Долгота: {lon}</DetailP>
            </React.Fragment>
        )
    }

    const renderForm = () => {
        return (
            <React.Fragment>
                <Input type="text" value={edit.name} name="name" onChange={(e) => { changeField(e) }} autoComplete="off"/>
                <Input type="text" value={edit.workTime.descr} name="descr" onChange={(e) => { changeField(e) }} autoComplete="off"/>
                <Input type="text" value={edit.address.address} name="address" onChange={(e) => { changeField(e) }} autoComplete="off"/>
                <Input type="text" value={edit.address.coordinates.lat} name="lat" onChange={(e) => { changeField(e) }} autoComplete="off"/>
                <Input type="text" value={edit.address.coordinates.lon} name="lon" onChange={(e) => { changeField(e) }} autoComplete="off"/>
            </React.Fragment>
        )
    }
    const renderWrap = (
        <DetailWrap>
            <DetailWindow>
                {!props.edit ? render() : renderForm()}
                <Button onClick={() => {!props.edit ? onEdit() : onSave()}}>{!props.edit ? 'Edit' : 'Save'}</Button>
                <Button onClick={() => {closeDetail()}}>Close</Button>
            </DetailWindow>
        </DetailWrap>
    );

    return renderWrap;
}

export default Detail;