import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import './App.css';

const App = () => {
    return (
        <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_KEY}`}>
            <BrowserRouter>
                <Container maxWidth="xl" disableGutters>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/auth" element={<Auth />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
};

export default App;
