import React, { useState, useEffect } from 'react';
import { db } from '../Firebase'; // Firebase configuration
import { collection, getDocs, query, where } from 'firebase/firestore';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBTypography, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBInput } from 'mdb-react-ui-kit';
import Navbar from './Navbar';
// Function to generate a random blockchain hash (for display purposes)
const generateRandomHash = () => {
  return '0x' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const RequestHistoryPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchKeyword, setSearchKeyword] = useState('');
  // eslint-disable-next-line
  const [currentUserEmail, setCurrentUserEmail] = useState('gk862004@gmail.com'); // Example user email

  // Fetch requests from Firestore
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const requestRef = collection(db, 'dataSharingRequests');
        const q = query(
          requestRef,
          where('userEmail', '==', currentUserEmail) // Filter by current user's email
        );
        const querySnapshot = await getDocs(q);
        const requestsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequests(requestsList);
      } catch (e) {
        console.error('Error fetching requests: ', e);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [currentUserEmail]);

  // Handle filter change
  const handleFilterChange = (status) => {
    setSelectedFilter(status);
  };

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  // Filter requests based on status and search keyword
  const filteredRequests = requests.filter(request => {
    return (
      (selectedFilter === 'All' || request.status === selectedFilter) &&
      (request.dataType.toLowerCase().includes(searchKeyword.toLowerCase()) || request.userEmail.toLowerCase().includes(searchKeyword.toLowerCase()))
    );
  });

  return (
    <MDBContainer fluid className="p-4">
      <Navbar/>
      <section className="text-center p-5 bg-primary text-white">
        <MDBTypography tag="h1" className="display-4">Request History</MDBTypography>
        <p className="lead">View the history of data sharing requests, their statuses, and blockchain verification details.</p>
      </section>

      {/* Filter and Search Section */}
      <MDBContainer className="my-5">
        <MDBRow>
          <MDBCol md="4" className="mb-4">
            <MDBDropdown>
              <MDBDropdownToggle caret>{selectedFilter}</MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem onClick={() => handleFilterChange('All')}>All</MDBDropdownItem>
                <MDBDropdownItem onClick={() => handleFilterChange('Approved')}>Approved</MDBDropdownItem>
                <MDBDropdownItem onClick={() => handleFilterChange('Denied')}>Denied</MDBDropdownItem>
                <MDBDropdownItem onClick={() => handleFilterChange('Pending')}>Pending</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBCol>
          <MDBCol md="4" className="mb-4">
            <MDBInput
              label="Search by Keyword"
              type="text"
              value={searchKeyword}
              onChange={handleSearchChange}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {/* Display Requests Section */}
      <MDBContainer className="my-5">
        <MDBTypography tag="h2" className="text-center mb-4">Request History</MDBTypography>
        {loading ? (
          <div className="text-center">Loading requests...</div>
        ) : (
          filteredRequests.length > 0 ? (
            <MDBRow className="justify-content-center">
              {filteredRequests.map((request) => (
                <MDBCol md="6" key={request.id} className="mb-4">
                  <MDBCard className="shadow-2-strong">
                    <MDBCardBody>
                      <h5>User Email: {request.userEmail}</h5>
                      <p><strong>Data Type:</strong> {request.dataType}</p>
                      <p><strong>Message:</strong> {request.message || 'No additional message.'}</p>
                      <p><strong>Request Date:</strong> {request.timestamp.toDate().toLocaleString()}</p>
                      <p><strong>Status:</strong> 
                        <span className={`badge ${request.status === 'Approved' ? 'bg-success' : request.status === 'Denied' ? 'bg-danger' : 'bg-warning'}`}>
                          {request.status}
                        </span>
                      </p>
                      <p><strong>Blockchain Hash:</strong> {generateRandomHash()}</p>

                      {/* Button to verify blockchain integrity */}
                      <MDBBtn color="info" onClick={() => alert('Verifying blockchain integrity')}>
                        Verify Blockchain Integrity
                      </MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))}
            </MDBRow>
          ) : (
            <p className="text-center">No requests found.</p>
          )
        )}
      </MDBContainer>
    </MDBContainer>
  );
};

export default RequestHistoryPage;
