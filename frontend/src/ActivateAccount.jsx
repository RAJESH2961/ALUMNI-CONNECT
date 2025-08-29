import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance'; // make sure this has baseURL set

export default function ActivateAccount() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // start loading immediately
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    if (token) {
      axiosInstance
        .get(`/api/activate/${token}/`)
        .then((res) => {
          setMessage('✅ Account activated successfully! Redirecting to login...');
          setActivated(true);
          setTimeout(() => navigate('/login'), 2000); // 2 sec delay
        })
        .catch((err) => {
          const errorMsg =
            err.response?.data?.detail || '❌ Activation failed.';
          setMessage(errorMsg);
        })
        .finally(() => setLoading(false));
    } else {
      setMessage('❌ No activation token found in URL.');
      setLoading(false);
    }
  }, [token, navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Account Activation</h2>
      {!activated && (
        <button
          onClick={() => window.location.reload()} // retry by reloading page
          disabled={loading}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '20px',
          }}
        >
          {loading ? 'Activating...' : 'Retry Activation'}
        </button>
      )}
      {message && (
        <div
          style={{
            marginTop: '20px',
            color: activated ? 'green' : 'red',
            fontWeight: 'bold',
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
