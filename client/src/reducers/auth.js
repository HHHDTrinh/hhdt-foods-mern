import { AUTH, LOGOUT } from '../constants/actionTypes';
import jwt_decode from 'jwt-decode';

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            const token = action.data;
            const decode = action.data && jwt_decode(action.data);
            localStorage.setItem(
                'profile',
                JSON.stringify({ ...decode, token: token }),
            );
            return { ...state, authData: decode };
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };
        default:
            return state;
    }
};

export default authReducer;
