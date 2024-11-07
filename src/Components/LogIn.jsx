import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBTypography
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [verificationMessage, setVerificationMessage] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        if (user.emailVerified) {
          // Redirect to home page if email is verified
          navigate('/home');
        } else {
          // Send verification link if email is not verified
          await sendEmailVerification(user);
          setVerificationMessage('Verification email sent. Please check your inbox.');
        }
      } catch (error) {
        setErrors({ general: error.message });
      }
    }
  };

  return (
    <MDBContainer fluid className="p-4 d-flex justify-content-center align-items-center vh-100 bg-light">
      <MDBCard style={{ maxWidth: '500px', width: '100%' }}>
        <MDBCardBody>
          <MDBTypography tag="h2" className="text-center mb-4">Log In</MDBTypography>
          <form onSubmit={handleSubmit}>
            <MDBRow className="mb-3">
              <MDBCol md="12">
                <MDBInput
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <p className="text-danger small mt-1">{errors.email}</p>}
              </MDBCol>
            </MDBRow>

            <MDBRow className="mb-3">
              <MDBCol md="12">
                <MDBInput
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && <p className="text-danger small mt-1">{errors.password}</p>}
              </MDBCol>
            </MDBRow>

            {errors.general && <p className="text-danger small mt-2">{errors.general}</p>}
            {verificationMessage && <p className="text-info small mt-2">{verificationMessage}</p>}

            <div className="text-center">
              <MDBBtn color="primary" type="submit" className="mb-3" style={{ width: '100%' }}>
                Log In
              </MDBBtn>
            </div>
          </form>

          <div className="text-center">
            <p>Don’t have an account? <a href="/signup" className="text-primary">Sign up</a></p>
            <p><a href="/forgot-password" className="text-primary">Forgot Password?</a></p>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Login;
