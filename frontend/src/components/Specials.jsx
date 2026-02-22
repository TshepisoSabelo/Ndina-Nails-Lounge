import { useState } from 'react';
import '../styles/landingPage.css';

function Specials() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
        id: 1,
        image: 'images/mani-discount.jpg',
        alt: 'Manicure Special',
        title: '50% Off Manicure',
        description: 'Get a perfect manicure at half price this week!'
        },
        {
        id: 2,
        image: 'images/pedi-special.jpg',
        alt: 'Pedicure Special',
        title: 'Free Pedicure Upgrade',
        description: 'Book a pedicure and enjoy a free nail art design.'
        },
        {
        id: 3,
        image: 'images/nail-art.jpg',
        alt: 'Nail Art Special',
        title: 'Buy 2 Get 1 Nail Art Free',
        description: 'Add flair to your nails with this limited-time offer!'
        }
    ];

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="specials-section">
        <div className="container">
            <h2>Specials & Discounts</h2>
            <div className="slider">
                <button className="slider-btn prev" onClick={prevSlide}>
                    &#10094;
                </button>
                <div className="slides">
                    {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                        style={{ display: index === currentSlide ? 'block' : 'none' }}
                    >
                        <img src={slide.image} alt={slide.alt} />
                        <div className="slide-info">
                        <h3>{slide.title}</h3>
                        <p>{slide.description}</p>
                        </div>
                    </div>
                    ))}
                </div>
                <button className="slider-btn next" onClick={nextSlide}>
                    &#10095;
                </button>
            </div>
        </div>
        </section>
    );
}

export default Specials;