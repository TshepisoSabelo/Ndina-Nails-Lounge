import { useState } from 'react';
import { motion } from 'framer-motion';
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

    /* AVAILABLE TIME SLOTS */
const availableTimes = [
    {
        id: 0,
        date: "2026-02-26",
        times: ["09:00", "10:30", "12:00", "14:00", "16:00"]
    },
    {
        id: 1,
        date: "2026-02-27",
        times: ["08:30", "10:00", "11:30", "13:30", "15:30"]
    },
    {
        id: 2,
        date: "2026-02-28",
        times: ["09:00", "11:00", "12:30", "14:30", "17:00"]
    },
    {
        id: 3,
        date: "2026-02-29",
        times: ["08:00", "09:30", "11:00", "13:00", "15:00"]
    },
    {
        id: 4,
        date: "2026-02-30",
        times: ["09:00", "10:30", "12:00", "14:00", "16:30"]
    },
    {
        id: 5,
        date: "2026-03-01",
        times: ["08:30", "10:00", "11:30", "13:30", "15:30"]
    },
    {
        id: 6,
        date: "2026-03-02",
        times: ["09:00", "11:00", "12:30", "14:30", "17:00"]
    },
    {
        id: 7,
        date: "2026-03-03",
        times: ["08:00", "09:30", "11:00", "13:00", "15:00"]
    },
    {
        id: 8,
        date: "2026-03-04",
        times: ["09:00", "10:30", "12:00", "14:00", "16:30"]
    },
    {
        id: 9,
        date: "2026-03-05",
        times: ["08:30", "10:00", "11:30", "13:30", "15:30"]
    }
];

    /* SIMULATED BOOKED APPOINTMENTS */
    const bookedAppointments = [
        { date: "2026-02-24", time: "10:30" },
        { date: "2026-02-24", time: "14:00" },
        { date: "2026-02-25", time: "11:30" }
    ];

    /* HANDLE INPUT CHANGE */
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
        ...prev,
        [name]: value,
        ...(name === "date" && { time: "" }) // reset time when date changes
        }));
    };

    /* HANDLE SUBMIT */
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);

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

    /* FIND AVAILABLE TIMES FOR SELECTED DATE */
    const selectedAvailability = availableTimes.find(
        (availability) => availability.date === formData.date
    );

    return (
        <motion.section
        className="booking-section"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        >
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

            <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                disabled={!formData.date}
            >
                <option value="">Select time</option>

                {selectedAvailability?.times.map((time, index) => {
                const isBooked = bookedAppointments.some(
                    (booking) =>
                    booking.date === formData.date &&
                    booking.time === time
                );

                return (
                    <option
                    key={index}
                    value={time}
                    disabled={isBooked}
                    >
                    {time} {isBooked ? "(Booked)" : ""}
                    </option>
                );
                })}
            </select>
            </div>

            <button type="submit" className="btn btn-submit">
            Submit
            </button>
        </form>
        </motion.section>
    );
}

export default Booking;