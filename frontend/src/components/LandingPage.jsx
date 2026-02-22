import Nav from './Nav';
import Footer from './Footer';
import Main from './Main';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/landingPage.css';
function LandingPage() {
    return (
        <>
            <Nav />
            <Main />
            <Footer />
        </>
    );
}

export default LandingPage;