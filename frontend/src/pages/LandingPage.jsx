import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Main from '../components/Main';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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