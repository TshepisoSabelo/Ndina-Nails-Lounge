import { useState } from 'react';
import '../styles/landingPage.css';

function Booking() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add API call or form submission logic here
        // Reset form after submission
        setFormData({
        name: '',
        surname: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: ''
        });
    };

    return (
        <section className="booking-section">
        <h2>Book an Appointment</h2>

        <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="surname"
                placeholder="Surname"
                value={formData.surname}
                onChange={handleChange}
                required
            />
            </div>

            <div className="form-group">
            <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
            />
            </div>

            <div className="form-group">
            <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
            >
                <option value="">Select Service</option>
                <option value="manicure">Manicure</option>
                <option value="pedicure">Pedicure</option>
                <option value="buff-shine">Buff & Shine</option>
            </select>
            </div>

            <div className="form-group">
            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
            />
            <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
            />
            </div>

            <button type="submit" className="btn btn-submit">
            Submit
            </button>
        </form>
        </section>
    );
}

export default Booking;