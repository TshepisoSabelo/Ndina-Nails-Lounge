import Nav from '../components/Nav';
import Footer from '../components/Footer';
import HeroPrices from '../components/HeroPrices';
import Prices from '../components/Prices'
import Policy from '../components/Policy'
import { useNavigate } from 'react-router-dom';


function PricesPage() {
    return (
        <>
            <Nav />
            <HeroPrices />
            <div className = "btn-switcher">
                <p id = "switcher1">Price List</p>
                <p id = "switcher2">Policy</p>
            </div>
            <Prices />
            <Policy />
            <Footer />
        </>
    );
}

export default PricesPage;