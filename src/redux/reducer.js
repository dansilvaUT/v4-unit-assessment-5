const initialState = {
    username: '',
    profile_picture: ''
}

const ACTION_TYPE = 'ACTION_TYPE';
const LOGOUT = 'LOGOUT';




export function logout() {
    return {
        type: LOGOUT
    }
}

export function updateUser(obj) {
    return {
        type: ACTION_TYPE,
        payload: obj
    }
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case ACTION_TYPE:
            return { ...state, username: payload.username, profile_picture: payload.profile_pic };
        case LOGOUT:
            return { username: '', profile_picture: '' };
        default:
            return state;
    }
}