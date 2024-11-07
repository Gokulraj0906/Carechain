import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
  MDBTypography,
  MDBInput,
} from 'mdb-react-ui-kit';
import Navbar from './Navbar';

const PatientHealthDataPage = () => {
  // State to manage uploaded files and categories
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState('');
  const [fileInput, setFileInput] = useState(null);
  const [showNav, setShowNav] = useState(false);

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      setFiles([...files, newFile]);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleUpload = () => {
    if (fileInput && category) {
      // Handle file upload here (e.g., send it to server)
      alert('File uploaded successfully!');
      setFileInput(null);
      setCategory('');
    } else {
      alert('Please select a file and category.');
    }
  };
// eslint-disable-next-line
  const handleNavbarToggle = () => {
    setShowNav(!showNav);
  };

  return (
    <MDBContainer fluid className="p-4">
      <Navbar/>

      {/* Header Section */}
      <section className="text-center p-5 bg-primary text-white">
        <MDBTypography tag="h1" className="display-4">Manage Your Health Data</MDBTypography>
        <p className="lead">Upload, view, and organize your medical records securely.</p>
      </section>

      {/* Upload Section */}
      <MDBContainer className="my-5">
        <MDBTypography tag="h2" className="text-center mb-4">Upload New Health Record</MDBTypography>
        <MDBRow className="justify-content-center">
          <MDBCol md="6">
            <MDBCard className="shadow-2-strong">
              <MDBCardBody>
                {/* File Upload Input */}
                <MDBInput
                  label="Choose File"
                  type="file"
                  onChange={handleFileChange}
                  accept="application/pdf,image/*"
                />
                
                {/* Category Selection Dropdown */}
                <div className="mb-4">
                  <label htmlFor="categorySelect" className="form-label">Select Category</label>
                  <select
                    id="categorySelect"
                    className="form-select"
                    value={category}
                    onChange={handleCategoryChange}
                  >
                    <option value="">Select Category</option>
                    <option value="Medical History">Medical History</option>
                    <option value="Prescriptions">Prescriptions</option>
                    <option value="Diagnostic Reports">Diagnostic Reports</option>
                  </select>
                </div>
                
                {/* Upload Button */}
                <MDBBtn color="primary" onClick={handleUpload}>
                  <MDBIcon icon="cloud-upload-alt" /> Upload
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {/* Patient Data List Section */}
      <MDBContainer className="my-5">
        <MDBTypography tag="h2" className="text-center mb-4">Your Health Data</MDBTypography>
        {files.length > 0 ? (
          <MDBRow className="justify-content-center">
            {files.map((file, index) => (
              <MDBCol md="4" className="mb-4" key={index}>
                <MDBCard className="shadow-2-strong">
                  <MDBCardBody>
                    <h5>File: {file.name}</h5>
                    <p>Category: {category}</p>
                    <p>Date: {new Date().toLocaleDateString()}</p>
                    <p>Size: {Math.round(file.size / 1024)} KB</p>
                    <MDBBtn color="secondary" size="sm" href="#" target="_blank">
                      View
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        ) : (
          <p className="text-center">No health data uploaded yet.</p>
        )}
      </MDBContainer>

      {/* Timeline Section */}
      <MDBContainer className="my-5">
        <MDBTypography tag="h2" className="text-center mb-4">Health Timeline</MDBTypography>
        <MDBRow>
          <MDBCol md="12">
            <MDBCard>
              <MDBCardBody>
                <h5>Recent Health Events</h5>
                <ul>
                  <li>March 2024 - Checkup - Blood Pressure Normal</li>
                  <li>January 2024 - Prescription - Blood Thinner</li>
                  <li>December 2023 - Diagnostic Test - Blood Sugar High</li>
                </ul>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default PatientHealthDataPage;
