import '../styles/landingPage.css';

function Reviews() {
    const reviews = [
        {
        id: 1,
        name: 'Sara Lekwane',
        rating: 4,
        comment: 'I loved the service. It was quick, professional, and my nails looked amazing.'
        },
        {
        id: 2,
        name: 'Thato Mokoena',
        rating: 4,
        comment: 'Very friendly staff and a relaxing environment. I will definitely come back.'
        },
        {
        id: 3,
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

    const handleViewAll = () => {
        // Add navigation to full reviews page or show modal with all reviews
        console.log('View all reviews');
    };

    return (
        <section className="reviews">
        <h2>Testimonials and Reviews</h2>
        <p id="view-all" onClick={handleViewAll} style={{ cursor: 'pointer' }}>
            View All
        </p>
        <div className="container reviews-container">
            {reviews.map((review) => (
            <div key={review.id} className="review">
                <h3>
                <i className="bx bx-user"></i> {review.name}
                </h3>
                <div className="stars">{renderStars(review.rating)}</div>
                <p>{review.comment}</p>
            </div>
            ))}
        </div>
        </section>
    );
}

export default Reviews;