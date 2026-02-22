import { useNavigate } from 'react-router-dom';
export default function Confirm() {
    const navigate = useNavigate();
    return (
        <div className="success-page">
            <h1>We are within!</h1>
            <p>Phakathi Phaakathi</p>
        </div>
    )
}