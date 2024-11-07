import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { firestore, auth } from '../Firebase';
import { useNavigate, Link } from 'react-router-dom';

function App() {
  const [uname, setUname] = useState('');
  const [uemail, setEmail] = useState('');
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  // eslint-disable-next-line
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const box = document.getElementById('flexCheckDefault');
    if (!box.checked) {
      setError("Please agree to the terms and conditions");
      return;
    }
    if (pass1 !== pass2) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, uemail, pass1);
      const user = userCredential.user;

      if (user) {
        // Store user details in Firestore
        await setDoc(doc(firestore, "users", user.uid), {
          UserName: uname,
          Emailid: uemail,
        });

        // Send email verification
        await sendEmailVerification(user);
        setSuccessMessage("Signup successful! Please check your email for verification.");

        // Clear form inputs
        setIsSubmitted(true);
        setUname('');
        setEmail('');
        setPass1('');
        setPass2('');

        // Redirect to login page after some time
        setTimeout(() => {
          navigate('/login');
        }, 5000);
      }

    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "form1") {
      setUname(value);
    } else if (id === "form2") {
      setEmail(value);
    } else if (id === "form3") {
      setPass1(value);
    } else if (id === "form4") {
      setPass2(value);
    }
  };

  return (
    <>
      <title>Signup</title>
      <MDBContainer fluid className="d-flex justify-content-center align-items-center vh-100">
        <MDBCard className='text-black m-5' style={{ borderRadius: '25px', maxWidth: '1000px' }}>
          <form onSubmit={handleSubmit}>
            <MDBCardBody>
              <MDBRow className="d-flex justify-content-center align-items-center"> 
                <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                  {error && <p className="text-danger">{error}</p>}
                  {successMessage && <p className="text-success">{successMessage}</p>}

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="user me-3" size='lg' />
                    <MDBInput label='Your Name' id='form1' type='text' className='w-100' value={uname} onChange={handleChange} />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="envelope me-3" size='lg' />
                    <MDBInput label='Your Email' id='form2' type='email' value={uemail} onChange={handleChange} />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="lock me-3" size='lg' />
                    <MDBInput label='Password' id='form3' type='password' value={pass1} onChange={handleChange} />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="key me-3" size='lg' />
                    <MDBInput label='Repeat your password' id='form4' type='password' value={pass2} onChange={handleChange} />
                  </div>

                  <div className='mb-4'>
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='I agree to the terms and conditions' />
                  </div>

                  <MDBBtn className='mb-4' size='lg' type="submit">Register</MDBBtn>

                  <p>Already have an account? <Link to="/login">Login</Link></p>
                </MDBCol>

                <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                  <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </form>
        </MDBCard>
      </MDBContainer>
    </>
  );
}

export default App;
