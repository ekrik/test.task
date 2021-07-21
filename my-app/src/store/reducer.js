import { DELETE_ITEM, CHANGE_EDIT_ITEM, EDIT_ITEM, SAVE_ITEM, VIEW_DETAIL, SWITCH_PAGE } from './action.js';
import data from './dataset.json';

const defaultState = {
    stores: data.stores,
    item: data.stores[1].name,
    editItem: false
}

const reducer = (state = defaultState, action) => {
    switch(action.type) {
        case DELETE_ITEM: return { ...state, value: action.value_1 };
        case EDIT_ITEM: return { ...state , editItem: action.item };
        case CHANGE_EDIT_ITEM:
            return { ...state , editItem: {...state.editItem, name: action.value} };
        case SAVE_ITEM: return { ...state, stores: action.value_3 };
        case VIEW_DETAIL: return { ...state, viewItemId: action.id };
        case SWITCH_PAGE: return { ...state, item: action.item };
        default: return state;
    }
}

export default reducer;