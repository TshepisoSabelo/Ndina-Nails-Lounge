import { Link } from 'react-router-dom';
import '../styles/landingPage.css';

function Hero() {
  return (
    <section className = "hero main-hero" id="Home">
      <h1>
        Get that beauty<br />
        feeling
      </h1>
      <div className = "hero-btns">
        <button className = "btn btn_more-info" onClick={() => window.location.href = '/book'}>Book Now</button>
        <button className = "btn btn_get-prices" onClick={() => window.location.href = '/PricesPage'}>Get Prices</button>
      </div>
    </section>
  );
}

export default Hero;