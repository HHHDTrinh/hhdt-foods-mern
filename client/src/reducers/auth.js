import { AUTH, LOGOUT } from '../constants/actionTypes';
import jwt_decode from 'jwt-decode';

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            const decode = action.data && jwt_decode(action.data);
            localStorage.setItem('profile', JSON.stringify(decode));
            return { ...state, authData: decode };
        case LOGOUT:
            console.log('log out');
            localStorage.clear();
            return { ...state, authData: null };
        default:
            return state;
    }
};

export default authReducer;
