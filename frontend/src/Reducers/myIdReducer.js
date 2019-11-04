import * as types from 'actions/types';

const initialId = -1;

export default (id = initialId, action) => {
    if (action.type === types.INIT) {
        return action.myId;
    }

    return id;
};
