import styled from "styled-components";
import { useDispatch } from "react-redux";
import { ERROR } from "../store/action";

const ErrorWrap = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 100;
`
const ErrorWindow = styled.div`
    position: absolute;
    padding: 20px;
    border: 1px solid red;
    width: 50%;
    background-color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: red;
    display: flex;
`

const ErrorButton = styled.button`
    display: block
    text-align: center;
    width: 100px;
    height: 26px;
    outline: 0;
    border-radius: 0;
    border: 1px solid #f1e4de;
    font-weight: bold;
    cursor: pointer;
    margin-right: 20px;
    margin-left: 20px;
`

const Error = (props) => {
    const dispatch = useDispatch();
    const { text } = props;

    const closeWindow = () => {
        dispatch({type: ERROR, value: false});
    }

    return (
        <ErrorWrap>
            <ErrorWindow>
                <p>{ text }</p>
                <ErrorButton onClick={() => closeWindow()}>Close</ErrorButton>
            </ErrorWindow>
        </ErrorWrap>
    );
}

export default Error;