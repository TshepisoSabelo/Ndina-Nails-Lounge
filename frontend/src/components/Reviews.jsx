import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/landingPage.css';

function Reviews() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const reviews = [
        {
        id: 0,
        name: 'Sara Lekwane',
        rating: 4,
        comment: 'I loved the service. It was quick, professional, and my nails looked amazing.'
        },
        {
        id: 1,
        name: 'Thato Mokoena',
        rating: 4,
        comment: 'Very friendly staff and a relaxing environment. I will definitely come back.'
        },
        {
        id: 2,
        name: 'Lerato Khumalo',
        rating: 5,
        comment: 'My pedicure was neat and long-lasting. Great attention to detail.'
        }
    ];

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
        stars.push(
            <i
            key={i}
            className={`bx ${i <= rating ? 'bxs-star' : 'bx-star'}`}
            ></i>
        );
        }
        return stars;
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    return (
        <motion.section className="reviews"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            >
            <h2>Testimonials and Reviews</h2>

            <div className="slider-wrapper">

                <div className="container reviews-container">
                    {reviews.map((review) => (
                        <div key={review.id} className={`review ${review.id === currentSlide ? 'active' : ''}`}
                        style={{ display: review.id === currentSlide ? 'block' : 'none' }}
                        >
                            <h3>
                                <i className="bx bx-user"></i> {review.name}
                            </h3>
                            <div className="stars">{renderStars(review.rating)}</div>
                            <p>{review.comment}</p>
                        </div>
                    ))}
                </div>

                <div className='btns-reviews'>
                    <button
                    type="button"
                    className="reviews-btn prev"
                    onClick={prevSlide}
                    aria-label="Previous reviews"
                    >
                    <i className="bx bx-chevron-left"> </i>
                    </button>

                    <button
                    type="button"
                    className="reviews-btn next"
                    onClick={nextSlide}
                    aria-label="Next reviews"
                    >
                    <i className="bx bx-chevron-right"> </i>
                    </button>

                </div>
                
            </div>
        </motion.section>
    );
}

export default Reviews;