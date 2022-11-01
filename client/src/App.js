import React, { useState, useEffect } from 'react';
import { AppBar, Container, Typography, Grow, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './actions/posts';
import FoodLogo from './images/foods.jpg';

const App = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Container maxWidth="lg">
            <AppBar
                position="static"
                color="error"
                sx={{
                    borderRadius: '15px',
                    margin: '30px 0',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant="h2"
                    align="center"
                    sx={{
                        color: 'rgba(0, 183, 255, 1)',
                        fontSize: { xs: '40px' },
                    }}
                >
                    Want Eat
                </Typography>
                <img
                    src={FoodLogo}
                    alt="food-logo"
                    height="80"
                    style={{
                        marginLeft: '10px',
                        borderRadius: '100%',
                    }}
                />
            </AppBar>

            <Grow in>
                <Container>
                    <Grid
                        sx={{
                            display: 'flex',
                            flexDirection: { lg: 'row', sm: 'column-reverse' },
                            justifyContent: 'space-between',
                            alignItems: { lg: 'stretch', sm: 'center' },
                        }}
                        container
                        spacing={3}
                    >
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form
                                currentId={currentId}
                                setCurrentId={setCurrentId}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
};

export default App;
