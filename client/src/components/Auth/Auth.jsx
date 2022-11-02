import React, { useState } from 'react';
import {
    Avatar,
    Button,
    Paper,
    Grid,
    Typography,
    Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import GoogleLogo from './Icon';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Input from './Input/Input';

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = (evt) => {
        evt.preventDefault();
    };

    const switchMode = () => {
        setIsSignUp(!isSignUp);
        handleShowPassword(false);
    };

    const handleChange = () => {};

    const googleSucces = (response) => {
        const token = response;
        try {
            dispatch({ type: 'AUTH', data: token });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: googleSucces,
        onError: console.log('Login Failed'),
    });

    return (
        <Container component="main" maxWidth="xs">
            <Paper
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 2,
                }}
                elevation={3}
            >
                <Avatar
                    sx={{
                        backgroundColor: '#1976d2',
                        margin: 1,
                    }}
                >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    {isSignUp ? 'Sign up' : 'Sign in'}
                </Typography>
                <form
                    style={{
                        width: '100%',
                        marginTop: '16px',
                    }}
                    onSubmit={handleSubmit}
                >
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input
                                    name="firstName"
                                    label="First Name"
                                    handleChange={handleChange}
                                    autoFocus
                                    half
                                />
                                <Input
                                    name="lastName"
                                    label="Last Name"
                                    handleChange={handleChange}
                                    half
                                />
                            </>
                        )}
                        <Input
                            name="email"
                            label="Email Address"
                            handleChange={handleChange}
                            type="email"
                        />
                        <Input
                            name="password"
                            label="Password"
                            handleChange={handleChange}
                            type={showPassword ? 'text' : 'password'}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignUp && (
                            <Input
                                name="confirmPassword"
                                label="Repeat Password"
                                handleChange={handleChange}
                                type="password"
                            />
                        )}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{
                            marginTop: 3,
                            marginBottom: 2,
                            marginX: 0,
                        }}
                    >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Button
                        fullWidth
                        color="secondary"
                        sx={{
                            marginBottom: 2,
                        }}
                        onClick={handleGoogleLogin}
                        variant="contained"
                        startIcon={<GoogleLogo />}
                    >
                        Sign in with Google
                    </Button>
                    <Grid item>
                        <Button
                            sx={{
                                float: 'right',
                            }}
                            onClick={switchMode}
                        >
                            {isSignUp
                                ? 'Already have an account? Sign in'
                                : "Don't have an account? Sign up"}
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
