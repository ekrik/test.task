import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CLOSE_DETAIL, SAVE_ITEM, EDIT_ITEM, VIEW_DETAIL, ERROR } from "../store/action";
import server from "../server";
import styled from "styled-components";

const DetailWrap = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
`;

const DetailWindow = styled.div`
    position: absolute;
    width: 80%;
    height: 60%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
`; 

const DetailP = styled.p`
    margin-bottom: 20px;
    padding: 5px;
    font-size: 20px;
    font-size: 24px;
    font-family: sans-serif;
`;

const Input = styled.input`
    display: block;
    width: 100%;
    margin-bottom: 20px;
    padding: 5px;
    font-size: 20px;
    font-size: 24px;
    border: none;
    background-color: #E9F2F4; 
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
    margin-right: 20px;
`;

const Detail = (props) => {
    const dispatch = useDispatch();
    const {id, name, address: {address, coordinates, coordinates: {lat, lon}}, workTime, workTime: { descr }} = props.data; 

    const [newName, setNewName] = useState(name);
    const [newDescr, setNewDescr] = useState(descr);
    const [newAddress, setNewAddress] = useState(address);
    const [newLat, setNewLat] = useState(lat);
    const [newLon, setNewLon] = useState(lon);

    const closeDetail = () => {
        dispatch({type: CLOSE_DETAIL});
    }

    const changeField = (e) => {
        switch (e.target.name) {
            case 'name':
                    setNewName(e.target.value);                
                break;
            case 'descr':
                    setNewDescr(e.target.value);                
                break;            
            case 'address':
                    setNewAddress(e.target.value);                
                break;            
            case 'lat':
                    setNewLat(e.target.value);                
                break;            
            case 'lon':
                    setNewLon(e.target.value);                
                break;            
            default:
                break;
        }
    }

    const onEdit = () => {
        dispatch({type: EDIT_ITEM, id: id});
    }

    const onSave = () => {
        const newItem = {
            ...props.data,
            name: newName,
            address: {
                ...props.data.address,
                address: newAddress,
                coordinates: {
                    ...coordinates,
                    lat: newLat,
                    lon: newLon
                }
            },
            workTime: {
                ...workTime,
                descr: newDescr
            }
        }

        const response = server.response('save');

        if (response !== 200) {
            dispatch({type: ERROR, value: response});
        } else {
            dispatch({type: VIEW_DETAIL, item: newItem});
            dispatch({type: SAVE_ITEM, item: newItem});
        }
    }

    const render = () => {
        return (
            <React.Fragment>
                Имя: <DetailP>{name}</DetailP>
                Время работы: <DetailP>{descr}</DetailP>
                Адрес: <DetailP>{address}</DetailP>
                Широта: <DetailP>{lat}</DetailP>
                Долгота: <DetailP>{lon}</DetailP>
            </React.Fragment>
        )
    }

    const renderForm = () => {
        return (
            <React.Fragment>
                Имя: <Input type="text" value={newName} name="name" onChange={(e) => { changeField(e) }} autoComplete="off"/>
                Время работы: <Input type="text" value={newDescr} name="descr" onChange={(e) => { changeField(e) }} autoComplete="off"/>
                Адрес: <Input type="text" value={newAddress} name="address" onChange={(e) => { changeField(e) }} autoComplete="off"/>
                Широта: <Input type="text" value={newLat} name="lat" onChange={(e) => { changeField(e) }} autoComplete="off"/>
                Долгота: <Input type="text" value={newLon} name="lon" onChange={(e) => { changeField(e) }} autoComplete="off"/>
            </React.Fragment>
        )
    }

    return (
        <DetailWrap>
            <DetailWindow>
                {!props.edit ? render() : renderForm()}
                <Button onClick={() => {!props.edit ? onEdit() : onSave()}}>{!props.edit ? 'Edit' : 'Save'}</Button>
                <Button onClick={() => {closeDetail()}}>Close</Button>
            </DetailWindow>
        </DetailWrap>
    );
}

export default Detail;