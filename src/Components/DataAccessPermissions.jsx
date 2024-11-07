import React, { useState } from 'react';
import { db } from '../Firebase'; // Firebase configuration
import { collection, addDoc } from 'firebase/firestore';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import Navbar from './Navbar';
const DataSharingRequestPage = () => {
  // State to manage form fields
  const [userEmail, setUserEmail] = useState('');
  const [dataType, setDataType] = useState('');
  const [requestReason, setRequestReason] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Handle form field changes
  const handleEmailChange = (e) => setUserEmail(e.target.value);
  const handleDataTypeChange = (e) => setDataType(e.target.value);
  const handleRequestReasonChange = (e) => setRequestReason(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the inputs
    if (!userEmail || !dataType || !requestReason) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Add data-sharing request to Firestore with default status 'Pending'
      const docRef = await addDoc(collection(db, 'dataSharingRequests'), {
        userEmail,
        dataType,
        requestReason,
        message,
        status: 'Pending',
        timestamp: new Date(),
      });

      console.log('Document written with ID: ', docRef.id);
      setSuccess(true);  // Success message

      // Clear the form fields
      setUserEmail('');
      setDataType('');
      setRequestReason('');
      setMessage('');
    } catch (e) {
      console.error('Error adding document: ', e);
      setError('Failed to submit your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer fluid className="p-4">
      <Navbar/>
      <section className="text-center p-5 bg-primary text-white">
        <MDBTypography tag="h1" className="display-4">Data Sharing Request</MDBTypography>
        <p className="lead">Please fill out the form below to request access to the data.</p>
      </section>

      <MDBContainer className="my-5">
        <MDBRow className="justify-content-center">
          <MDBCol md="6">
            <MDBCard className="shadow-2-strong">
              <MDBCardBody>
                <form onSubmit={handleSubmit}>
                  <MDBInput
                    type="email"
                    label="Your Email Address"
                    value={userEmail}
                    onChange={handleEmailChange}
                    className="mb-3"
                    required
                  />
                  <MDBInput
                    type="text"
                    label="Type of Data Requested"
                    value={dataType}
                    onChange={handleDataTypeChange}
                    className="mb-3"
                    required
                  />
                  <MDBInput
                    type="text"
                    label="Reason for Request"
                    value={requestReason}
                    onChange={handleRequestReasonChange}
                    className="mb-3"
                    required
                  />
                  <MDBInput
                    type="textarea"
                    label="Additional Message (Optional)"
                    value={message}
                    onChange={handleMessageChange}
                    className="mb-3"
                  />

                  <MDBBtn color="primary" type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Request'}
                  </MDBBtn>
                </form>

                {/* Success message */}
                {success && <div className="text-success mt-3">Your data-sharing request has been submitted successfully!</div>}

                {/* Error message */}
                {error && <div className="text-danger mt-3">{error}</div>}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default DataSharingRequestPage;
