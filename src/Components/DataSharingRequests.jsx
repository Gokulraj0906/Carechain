import React, { useState, useEffect } from 'react';
import { db } from '../Firebase'; // Firebase configuration
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBTypography, MDBBtn, MDBBtnGroup } from 'mdb-react-ui-kit';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth

const RequestApprovalPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState('');

  // Get the current user's email from Firebase Authentication
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setCurrentUserEmail(user.email); // Set current user email
    } else {
      console.error("No user is logged in.");
    }
  }, []);

  // Fetch requests from Firestore
  useEffect(() => {
    const fetchRequests = async () => {
      if (!currentUserEmail) return; // Ensure user is set

      setLoading(true);
      setError('');

      try {
        const querySnapshot = await getDocs(collection(db, 'dataSharingRequests'));
        const requestsList = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(request => request.userEmail === currentUserEmail && request.status === 'Pending'); // Filter by current user's email and Pending status

        setRequests(requestsList);
        console.log("Fetched pending requests:", requestsList);
      } catch (e) {
        console.error('Error fetching requests: ', e);
        setError('Failed to fetch requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [currentUserEmail]); // Dependency array includes currentUserEmail

  // Handle approval or denial of requests
  const handleRequestAction = async (requestId, action) => {
    console.log(`Action triggered: ${action} for request ID: ${requestId}`);
    try {
      const requestRef = doc(db, 'dataSharingRequests', requestId);
      await updateDoc(requestRef, { status: action });
      console.log(`Request ${requestId} updated to status: ${action}`);

      // Update local state to reflect the change
      setRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === requestId ? { ...request, status: action } : request
        )
      );
    } catch (e) {
      console.error(`Error updating request to ${action}: `, e);
      setError(`Failed to ${action.toLowerCase()} request.`);
    }
  };

  return (
    <MDBContainer fluid className="p-4">
      <section className="text-center p-5 bg-primary text-white">
        <MDBTypography tag="h1" className="display-4">Request Approval</MDBTypography>
        <p className="lead">Approve or deny pending data access requests below.</p>
      </section>

      <MDBContainer className="my-5">
        <MDBRow className="justify-content-center">
          {loading ? (
            <div className="text-center">Loading requests...</div>
          ) : error ? (
            <div className="text-danger text-center">{error}</div>
          ) : (
            requests.length > 0 ? (
              requests.map((request) => (
                <MDBCol md="6" key={request.id}>
                  <MDBCard className="shadow-2-strong mb-4">
                    <MDBCardBody>
                      <h5>User Email: {request.userEmail}</h5>
                      <p><strong>Data Type:</strong> {request.dataType}</p>
                      <p><strong>Reason:</strong> {request.requestReason}</p>
                      <p><strong>Message:</strong> {request.message || 'No additional message.'}</p>
                      <p><strong>Status:</strong> {request.status}</p>

                      <MDBBtnGroup className="mt-3">
                        <MDBBtn color="success" onClick={() => handleRequestAction(request.id, 'Approved')} disabled={request.status !== 'Pending'}>
                          Approve
                        </MDBBtn>
                        <MDBBtn color="danger" onClick={() => handleRequestAction(request.id, 'Denied')} disabled={request.status !== 'Pending'}>
                          Deny
                        </MDBBtn>
                      </MDBBtnGroup>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))
            ) : (
              <div className="text-center">No pending requests for approval.</div>
            )
          )}
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default RequestApprovalPage;
