import { 
    DELETE_ITEM,
    CHANGE_EDIT_ITEM,
    EDIT_ITEM,
    SAVE_ITEM,
    CLOSE_DETAIL,
    VIEW_DETAIL,
    SWITCH_PAGE 
} from './action.js';
import data from './dataset.json';

const defaultState = {
    stores: data.stores,
    item: data.stores[1].name,
    editItem: false,
    viewDetail: false,
    delete: 0,
}

const reducer = (state = defaultState, action) => {
    switch(action.type) {
        case DELETE_ITEM:
            const storesUpdate = state.stores.filter((item) => item.id !== action.id );
            return { ...state, stores: storesUpdate};
        case EDIT_ITEM:
            return { ...state , editItem: action.item };
        case CHANGE_EDIT_ITEM:
            return { 
                ...state,
                 editItem: {
                    ...state.editItem,
                    name: action.name === 'name' ? action.value : state.editItem.name,
                    workTime: {
                        ...state.editItem.workTime,
                        descr: action.name === 'descr' ? action.value : state.editItem.workTime.descr
                    },
                    address: {
                        ...state.editItem.address,
                        address: action.name === 'address' ? action.value : state.editItem.address.address,
                        coordinates: {
                            ...state.editItem.address.coordinates,
                            lat: action.name === 'lat' ? action.value : state.editItem.address.coordinates.lat,
                            lon: action.name === 'lon' ? action.value : state.editItem.address.coordinates.lon,
                        }
                    }
                } 
            };
        case SAVE_ITEM:
            const stores = state.stores.map((item) => {
                if (action.item.id === item.id) {
                    return action.item;
                } else {
                    return item;
                }
            });
            return { ...state, stores: stores, editItem: false};
        case CLOSE_DETAIL:
            return { ...state, viewDetail: false, editItem: false };
        case VIEW_DETAIL:
            return { ...state, viewDetail: action.item };
        case SWITCH_PAGE:
            return { ...state, item: action.item };
        default: return state;
    }
}

export default reducer;