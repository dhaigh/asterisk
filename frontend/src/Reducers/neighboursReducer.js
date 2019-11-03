const initialState = {
    on: false,
    tid: null,
};

export default (state = initialState, action) => {
    if (action.type === 'hover_territory') {
        const { territoryId } = action;
        return {
            ...state,
            tid: territoryId,
        };

    } else if (action.type === 'set_viewing_neighbours') {
        return {
            ...state,
            on: action.on,
        };
    }

    return state;
};
