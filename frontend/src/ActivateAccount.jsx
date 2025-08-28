import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from './axiosInstance';

export default function ActivateAccount() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [activated, setActivated] = useState(false);

    const handleActivate = () => {
        setLoading(true);
        axiosInstance.post('/api/activate/', { token })
            .then(res => {
                setMessage('Account activated! Redirecting to login...');
                setActivated(true);
                setTimeout(() => navigate('/login'), 2000);
            })
            .catch(err => {
                setMessage(err.response?.data?.detail || 'Activation failed.');
            })
            .finally(() => setLoading(false));
    };

    return (
        <div>
            <h2>Account Activation</h2>
            <button onClick={handleActivate} disabled={loading || activated}>
                {loading ? 'Activating...' : activated ? 'Activated' : 'Activate Account'}
            </button>
            <div>{message}</div>
        </div>
    );
} 