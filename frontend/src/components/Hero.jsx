import { Link } from 'react-router-dom';
import '../styles/landingPage.css';

function Hero() {
  return (
    <section className="hero main-hero" id="Home">
      <h1>
        Get that beauty<br />
        feeling
      </h1>
      <div className="btn btn_more-info">
        <Link to="/book">Find Out More</Link>
      </div>
    </section>
  );
}

export default Hero;