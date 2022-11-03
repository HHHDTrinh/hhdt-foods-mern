import React, { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';
import { AUTH } from '../../constants/actionTypes';

const LoginWithGoogle = () => {
    const clientId = process.env.REACT_APP_GOOGLE_KEY;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: `${process.env.REACT_APP_GOOGLE_KEY}`,
                scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
            });
        };
        gapi.load('client:auth2', initClient);
    });

    const onSuccess = async (res) => {
        const credentials = await res?.credential;
        try {
            dispatch({ type: AUTH, data: credentials });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const onFailure = (err) => {
        console.log('failed:', err);
    };

    return (
        <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    );
};

export default LoginWithGoogle;
