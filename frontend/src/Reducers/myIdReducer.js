const initialId = -1;

export default (id = initialId, action) => {
    if (action.type === 'init') {
        return action.myId;
    }

    return id;
};
