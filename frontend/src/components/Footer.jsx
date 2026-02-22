import '../styles/landingPage.css';

function Footer() {
    const socialLinks = [
        {
        id: 1,
        icon: 'bxl-facebook-square',
        name: 'Facebook',
        url: 'https://www.facebook.com'
        },
        {
        id: 2,
        icon: 'bxl-instagram',
        name: 'Instagram',
        url: 'https://www.instagram.com/kmart.zip/profilecard/?igsh=MWF6ZGJzczNwdWtyOA%3D%3D'
        },
        {
        id: 3,
        icon: 'bxl-linkedin',
        name: 'LinkedIn',
        url: 'https://www.linkedin.com'
        },
        {
        id: 4,
        icon: 'bxl-whatsapp',
        name: 'WhatsApp',
        url: 'https://www.whatsapp.com'
        }
    ];

    return (
        <section className="footer">
        <p>Designed and Developed by</p>
        <p>KMART GRAPHICS SOLUTIONS</p>
        <ul>
            {socialLinks.map((social) => (
            <li key={social.id}>
                <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
                >
                <i className={`bx ${social.icon}`}></i>
                </a>
            </li>
            ))}
        </ul>
        </section>
    );
}

export default Footer;