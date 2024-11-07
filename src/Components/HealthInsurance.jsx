import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import { db} from '../Firebase'; 
import {collection, addDoc } from 'firebase/firestore';
import Navbar from './Navbar';

const HealthInsurance = () => {
  const [insuranceData, setInsuranceData] = useState({
    provider: '',
    policyNumber: '',
    coverageStart: '',
    coverageEnd: '',
    status: '',
  });
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setInsuranceData({ ...insuranceData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (!insuranceData.provider.trim()) errors.provider = 'Provider is required';
    if (!insuranceData.policyNumber.trim()) errors.policyNumber = 'Policy number is required';
    if (!insuranceData.coverageStart.trim()) errors.coverageStart = 'Coverage start date is required';
    if (!insuranceData.coverageEnd.trim()) errors.coverageEnd = 'Coverage end date is required';
    if (!insuranceData.status.trim()) errors.status = 'Status is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await addDoc(collection(db, "insuranceData"), insuranceData);
        console.log('Insurance Data:', insuranceData);
        alert('Insurance details updated successfully!');
        setInsuranceData({
          provider: '',
          policyNumber: '',
          coverageStart: '',
          coverageEnd: '',
          status: '',
        }); 
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <Navbar/>
      <MDBContainer fluid className="p-4 d-flex justify-content-center align-items-center vh-100 bg-light">
        <MDBCard style={{ maxWidth: '600px', width: '100%' }}>
          <MDBCardBody>
            <MDBTypography tag="h2" className="text-center mb-4">Health Insurance Management</MDBTypography>
            <form onSubmit={handleSubmit}>
              <MDBRow className="mb-3">
                <MDBCol md="12">
                  <MDBInput
                    label="Insurance Provider"
                    type="text"
                    name="provider"
                    value={insuranceData.provider}
                    onChange={handleChange}
                    required
                  />
                  {errors.provider && <p className="text-danger small mt-1">{errors.provider}</p>}
                </MDBCol>
              </MDBRow>

              <MDBRow className="mb-3">
                <MDBCol md="12">
                  <MDBInput
                    label="Policy Number"
                    type="text"
                    name="policyNumber"
                    value={insuranceData.policyNumber}
                    onChange={handleChange}
                    required
                  />
                  {errors.policyNumber && <p className="text-danger small mt-1">{errors.policyNumber}</p>}
                </MDBCol>
              </MDBRow>

              <MDBRow className="mb-3">
                <MDBCol md="12">
                  <MDBInput
                    label="Coverage Start Date"
                    type="date"
                    name="coverageStart"
                    value={insuranceData.coverageStart}
                    onChange={handleChange}
                    required
                  />
                  {errors.coverageStart && <p className="text-danger small mt-1">{errors.coverageStart}</p>}
                </MDBCol>
              </MDBRow>

              <MDBRow className="mb-3">
                <MDBCol md="12">
                  <MDBInput
                    label="Coverage End Date"
                    type="date"
                    name="coverageEnd"
                    value={insuranceData.coverageEnd}
                    onChange={handleChange}
                    required
                  />
                  {errors.coverageEnd && <p className="text-danger small mt-1">{errors.coverageEnd}</p>}
                </MDBCol>
              </MDBRow>

              <MDBRow className="mb-3">
                <MDBCol md="12">
                  <MDBInput
                    label="Status"
                    type="text"
                    name="status"
                    value={insuranceData.status}
                    onChange={handleChange}
                    required
                  />
                  {errors.status && <p className="text-danger small mt-1">{errors.status}</p>}
                </MDBCol>
              </MDBRow>

              <div className="text-center">
                <MDBBtn color="primary" type="submit" className="mb-3" style={{ width: '100%' }}>
                  Update Insurance
                </MDBBtn>
              </div>
            </form>

            <div className="text-center">
              <MDBBtn color="info" onClick={toggleModal}>View Terms & Conditions</MDBBtn>
            </div>
          </MDBCardBody>
        </MDBCard>

        {/* Terms & Conditions Modal */}
        <MDBModal show={isModalOpen} setShow={setIsModalOpen}>
          <MDBModalHeader toggle={toggleModal}>Insurance Terms & Conditions</MDBModalHeader>
          <MDBModalBody>
            <h5>1. Policy Details</h5>
            <p>Your insurance policy covers specific medical treatments as outlined by your provider. Please review your policy for details.</p>
            
            <h5>2. Claims and Coverage</h5>
            <p>Claims are processed within 30 days of submission. Ensure all required documentation is provided to avoid delays.</p>

            <h5>3. Expiration and Renewal</h5>
            <p>Policies must be renewed before the expiration date to maintain continuous coverage. Contact your provider for renewal options.</p>

            <h5>4. Privacy and Data Security</h5>
            <p>Your personal information is securely stored. Only authorized parties have access to your insurance details based on permissions you provide.</p>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={toggleModal}>Close</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    </>
  );
};

export default HealthInsurance;
