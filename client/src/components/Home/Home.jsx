import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';

import { getPosts } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Grow in>
            <Container maxWidth="lg">
                <Grid
                    display="flex"
                    justifyContent="space-between"
                    sx={{
                        flexDirection: {
                            lg: 'row',
                            sm: 'column-reverse',
                            xs: 'column-reverse',
                        },
                        alignItems: { lg: 'stretch', sm: 'center' },
                    }}
                    container
                    spacing={3}
                >
                    <Grid item xs={12} md={12} sm={12} lg={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} lg={4}>
                        <Form
                            currentId={currentId}
                            setCurrentId={setCurrentId}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;
