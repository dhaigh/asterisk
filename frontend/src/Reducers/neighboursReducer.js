import * as types from 'actions/types';

const initialState = {
    on: false,
    tid: null,
};

export default (state = initialState, action) => {
    if (action.type === types.HOVER_TERRITORY) {
        const { territoryId } = action;
        return {
            ...state,
            tid: territoryId,
        };

    } else if (action.type === types.SET_VIEWING_NEIGHBOURS) {
        return {
            ...state,
            on: action.on,
        };
    }

    return state;
};
