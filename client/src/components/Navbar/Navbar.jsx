import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@mui/material';
import { useDispatch } from 'react-redux';

import FoodLogo from '../../images/foods.jpg';
import { LOGOUT } from '../../constants/actionTypes';
import './Navbar.css';

const Navbar = () => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('profile')),
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: LOGOUT });
        navigate('/');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar
            color="inherit"
            position="static"
            sx={{
                display: 'flex',
                marginBottom: '60px',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
            }}
        >
            <div className="nav__left-content">
                <Link
                    to="/"
                    style={{
                        textDecoration: 'none',
                    }}
                >
                    <Typography
                        variant="h2"
                        align="center"
                        sx={{
                            color: '#7c795d',
                            fontSize: { xs: '40px' },
                        }}
                    >
                        Foodstagram
                    </Typography>
                </Link>
                <img
                    src={FoodLogo}
                    alt="food-logo"
                    height="80"
                    style={{
                        marginLeft: '10px',
                        borderRadius: '100%',
                    }}
                />
            </div>
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '400px',
                }}
            >
                {user ? (
                    <div className="profile">
                        <Avatar
                            sx={{
                                color: '#fff',
                                backgroundColor: '#673AB7',
                            }}
                            alt={user.name}
                            src={
                                user.picture
                                    ? user.picture
                                    : 'https://via.placeholder.com/400'
                            }
                        >
                            {user.name.charAt(0)}
                        </Avatar>
                        <Typography
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mr: 10,
                            }}
                            variant="h6"
                        >
                            {user.name}
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Link
                        to="/auth"
                        style={{
                            textDecoration: 'none',
                        }}
                    >
                        <Button variant="contained" color="primary">
                            Sign in
                        </Button>
                    </Link>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
