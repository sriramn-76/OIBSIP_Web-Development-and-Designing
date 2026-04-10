import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Verify() {
  const { token } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`/api/auth/verify/${token}`)
      .then(() => { alert('Email verified'); navigate('/'); })
      .catch(() => { alert('Verification failed'); navigate('/'); });
  }, [token, navigate]);
  return <p>Verifying...</p>;
}