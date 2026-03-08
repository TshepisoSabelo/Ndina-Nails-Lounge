import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/landingPage.css';
//import acrylicsIcon from 'src/assets/svg-mani01.svg';
//import gelIcon from 'src/assets/svg-mani02.svg';
//import softGelIcon from 'src/assets/svg-mani03.svg';
//import polygelIcon from 'src/assets/svg-mani04.svg';
//import buffShineIcon from 'src/assets/svg-mani02.svg';
//import pedicureIcon from 'src/assets/svg-pedi.svg';

function Services() {
    const services = [
        {
            id: 'acrilics',
            name: 'Acrilics',
            //icon: acrylicsIcon,
            description: 'Personalise your acrylic nails with our custom designs and icons.'
        },
        {
            id: 'gel',
            name: 'Gel',
            //icon: gelIcon,
            description: 'Experience the long-lasting shine and durability of our gel nail services.'
        },
        {
            id: 'soft-gel-tips',
            name: 'Soft Gel Tips',
            //icon: softGelIcon,
            description: 'Enhance your natural nails with our soft gel tips for a seamless look.'
        },
        {
            id: 'polygel',
            name: 'Polygel',
            //icon: polygelIcon,
            description: 'Experience the durability and customization of our polygel nail services.'
        },
        {
            id: 'buff&shine',
            name: 'Buff&Shine',
            //icon: buffShineIcon,
            description: 'Get your nails perfectly buffed and shiny with our professional service.'
        },
        {
            id: 'pedicure',
            name: 'Pedicure',
            //icon: pedicureIcon,
            description: 'Relax and rejuvenate your feet with our professional pedicure service.'
        },
    ];

    return (
        <motion.section className="container services"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            >
            <div className='heading'>
                <h2>Our Services</h2>
                <p>Experience the best nail care with our wide range of services.</p>
            </div>

            <div
                className="services-grid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1.5rem'
                }}
            >
                {services.map((service) => (
                    <div key={service.id} className="service" id={service.id}>
                        <div className="Info">
                            <img src={service.icon} alt={service.name} className="service-icon" />
                            <h3 className="service-name">{service.name}</h3>
                            <p className="service-description">{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}

export default Services;
