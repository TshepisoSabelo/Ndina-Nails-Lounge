import '../styles/landingPage.css';
import { motion } from 'framer-motion';
import aboutImage from '../assets/about-image.JPG';
function About() {
    return(
        <motion.section className="container about-section"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            >
            <div className='about-Info'>
                <h3>Meet your Technician</h3>
                <p>Welcome to Ndina Nails Lounge, where beauty meets relaxation. We are passionate about providing top-notch nail care services in a serene and welcoming environment. Our team of skilled nail technicians is dedicated to making you feel pampered and confident with every visit.</p>
                <p>At Ndina Nails Lounge, we believe that self-care is essential, and our mission is to help you look and feel your best. Whether you're looking for a classic manicure, a trendy gel design, or a luxurious pedicure, we have something for everyone. We use high-quality products and the latest techniques to ensure that you leave our salon with nails that are not only beautiful but also healthy.</p>
                <p>Our commitment to customer satisfaction is at the heart of everything we do. We strive to create a personalized experience for each client, ensuring that your unique style and preferences are reflected in your nail care. Thank you for choosing Ndina Nails Lounge – we look forward to pampering you soon!</p>
            </div>
            <img src={aboutImage} alt="About Us" className="about-image" />
        </motion.section>
    )
}

export default About;