import React, { useState } from 'react';
import { MDBContainer, MDBInput, MDBBtn, MDBIcon, MDBTypography } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [seconds, setSeconds] = useState(10);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (message) {
      const timer = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            navigate('/'); // Redirect to the home page after 10 seconds
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [message, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }

    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('A password reset link has been sent to your email address.');
      setError('');
    } catch (err) {
      setError('An error occurred while sending the reset link. Please try again.');
      setMessage('');
    }
  };

  return (
    <MDBContainer className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="forgot-password-container">
        <h2 className="mb-4 text-center">Reset Your Password</h2>
        <form onSubmit={handleSubmit}>
          <MDBInput
            label="Email Address"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-4"
            icon="envelope"
          />
          <MDBBtn type="submit" color="primary" className="w-100 mb-2">
            <MDBIcon fas icon="envelope" className="me-2" /> Send Reset Link
          </MDBBtn>
        </form>

        {message && (
          <MDBTypography note noteColor="success" className="mt-4">
            {message} <br />
            You will be redirected to the home page in {seconds} seconds... 
            if not <a href="/">click here</a> to redirect
          </MDBTypography>
        )}

        {error && (
          <MDBTypography note noteColor="danger" className="mt-4">
            {error}
          </MDBTypography>
        )}
      </div>
    </MDBContainer>
  );
}

export default ForgetPassword;
