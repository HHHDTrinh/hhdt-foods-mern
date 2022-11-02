// import React, { useState, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@mui/material';

import FoodLogo from '../../images/foods.jpg';
import './Navbar.css';

const Navbar = () => {
    // const [user, setUser] = useState(
    //     JSON.parse(localStorage.getItem('profile')),
    // );

    // const logout = () => {};

    // useEffect(() => {
    //     const token = user?.token;

    //     setUser(JSON.parse(localStorage.getItem('profile')));
    // }, [location]);

    const user = null;

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
                            alt={user.result.name}
                            src={user.result.imageUrl}
                        >
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            variant="h6"
                        >
                            {user.result.name}
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
