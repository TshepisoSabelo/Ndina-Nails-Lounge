import { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/landingPage.css';

function Booking() {
    const [formData, setFormData] = useState({
        name: '',
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
        date: "2026-04-03",
        times: ["09:00", "10:30", "12:00", "14:00", "16:00"]
    },
    {
        id: 1,
        date: "2026-04-04",
        times: ["08:30", "10:00", "11:30", "13:30", "15:30"]
    },
    {
        id: 2,
        date: "2026-04-05",
        times: ["09:00", "11:00", "12:30", "14:30", "17:00"]
    },
    {
        id: 3,
        date: "2026-04-06",
        times: ["08:00", "09:30", "11:00", "13:00", "15:00"]
    },
    {
        id: 4,
        date: "2026-04-07",
        times: ["09:00", "10:30", "12:00", "14:00", "16:30"]
    },
    {
        id: 5,
        date: "2026-04-08",
        times: ["08:30", "10:00", "11:30", "13:30", "15:30"]
    },
    {
        id: 6,
        date: "2026-04-09",
        times: ["09:00", "11:00", "12:30", "14:30", "17:00"]
    },
    {
        id: 7,
        date: "2026-04-10",
        times: ["08:00", "09:30", "11:00", "13:00", "15:00"]
    },
    {
        id: 8,
        date: "2026-04-11",
        times: ["09:00", "10:30", "12:00", "14:00", "16:30"]
    },
    {
        id: 9,
        date: "2026-04-12",
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate that all fields are filled
        if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.date || !formData.time) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/Add_booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    service: formData.service,
                    booking_date: formData.date,
                    booking_time: formData.time,
                }),
            });
              if (!response.ok) {
                console.error("Server error:", data);
                throw new Error(JSON.stringify(data));
            }

            if (response.ok) {
                const data = await response.json();
                console.log("Booking created successfully:", data);
                alert("Booking confirmed! Check your email for details.");
                
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    service: '',
                    date: '',
                    time: ''
                });
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.detail || "Failed to create booking"}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error submitting booking. Please try again.");
        }
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
                <option value="manicure">MANICURE</option>
                <option value="pedicure">PEDICURE</option>
                <option value="buff-shine">BUFF&SHINE</option>
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
                {selectedAvailability && selectedAvailability.times.length > 0 ? (
                    selectedAvailability.times.map((time, index) => {
                        const isBooked = bookedAppointments.some(
                            (booking) =>
                                booking.date === formData.date &&
                                booking.time === time
                        );
                        return (
                            <option key={index} value={time} disabled={isBooked}>
                                {time} {isBooked ? "(Booked)" : ""}
                            </option>
                        );
                    })
                ) : null}

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