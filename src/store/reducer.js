import { 
    DELETE_ITEM,
    EDIT_ITEM,
    SAVE_ITEM,
    CLOSE_DETAIL,
    VIEW_DETAIL,
    ERROR,
    INIT_DATA
} from './action.js';

const defaultState = {
    stores: false,
    editId: false,
    viewDetail: false,
    delete: 0,
    error: false
}

const reducer = (state = defaultState, action) => {
    switch(action.type) {
        case INIT_DATA:
            return { ...state, stores: action.stores };
        case DELETE_ITEM:
            const storesUpdate = state.stores.filter((item) => item.id !== action.id );
            return { ...state, stores: storesUpdate};
        case EDIT_ITEM:
            return { ...state , editId: action.id };
        case SAVE_ITEM:
            const storesSave = state.stores.map((item) => {
                if (action.item.id === item.id) {
                    return action.item;
                } else {
                    return item;
                }
            });

            return { ...state, stores: storesSave, editId: false};
        case CLOSE_DETAIL:
            return { ...state, viewDetail: false, editId: false };
        case VIEW_DETAIL:
            return { ...state, viewDetail: action.item };
        case ERROR:
            return { ...state, error: action.value };
        default: return state;
    }
}

export default reducer;