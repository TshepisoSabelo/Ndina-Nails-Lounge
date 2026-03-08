import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import RefinedLogo from '../assets/RefinedLogo.png';
import '../styles/landingPage.css';

function Nav() {
    return (
        <header>
            <nav className="nav-bar">
                <Link to="/">
                <img src={RefinedLogo} alt="Ndina Nails Lounge Logo" />
                </Link>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/PricesPage">Prices</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/book">Book Now</Link></li>
                </ul>
                <div className="btn btn-menu">
                <i className="bx bx-menu"></i>
                </div>
            </nav>
        </header>
    );
}

export default Nav;