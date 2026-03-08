import { motion } from 'framer-motion';
export default function Policy(){
        return(
        <motion.div className="policy"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <h3 className="heading policy-heading">Policy</h3>
            <div className="policy-container">
                <ul className="policy-list">
                <li>
                    <strong>Appointments & Cancellations:</strong>All services are by appointment only. Kindly provide at least 24 hours' notice for cancellations or rescheduling.
                </li>
                <li>
                    <strong>Deposits:</strong>A deposit is required to secure your booking. The deposit amount will be deducted from the total service cost.
                </li>
                <li>
                    <strong>House Calls / Mobile Services:</strong>We offer house calls for your convenience. An additional fee of R100 applies for travel and setup. Deposits are required for all house call bookings.
                </li>
                <li>
                    <strong>Punctuality:</strong>Please arrive on time to ensure your full appointment duration. Late arrivals may result in shortened services.
                </li>
                <li>
                    <strong>Hygiene & Safety:</strong>All tools are sanitized and disposable materials are used where applicable. Clients are encouraged to inform us of any allergies or medical conditions prior to service.
                </li>
                <li>
                    <strong>Payment:</strong>Full payment is required upon completion of service. We accept cash and selected digital payment methods.
                </li>
                </ul>
            </div>

        </motion.div>
    )
}
