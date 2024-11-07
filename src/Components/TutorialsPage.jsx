import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBTypography,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler
} from 'mdb-react-ui-kit';

const TutorialsPage = () => {
  const [showNav, setShowNav] = React.useState(false);

  const handleNavbarToggle = () => {
    setShowNav(!showNav);
  };

  return (
    <MDBContainer fluid className="p-4">
      {/* Navbar Section */}
      <MDBNavbar expand="lg" light style={{ backgroundColor: 'white', margin: '0', padding: '0' }}>
        <MDBContainer fluid>
          <MDBNavbarBrand tag={Link} to="/home" className="text-dark">
            Health Data Platform
          </MDBNavbarBrand>
          <MDBNavbarToggler
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={handleNavbarToggle}
          />
        </MDBContainer>
      </MDBNavbar>

      {/* Header Section */}
      <section className="text-center p-5 bg-primary text-white">
        <MDBTypography tag="h1" className="display-4">Educational Resources & Tutorials</MDBTypography>
        <p className="lead">Learn how to manage and protect your health data with our tutorials and resources.</p>
      </section>

      {/* Video Tutorials Section */}
      <MDBContainer className="my-5">
        <MDBTypography tag="h4" className="mb-4">Video Tutorials</MDBTypography>
        
        <MDBCard className="mb-4">
          <MDBCardBody>
            <MDBTypography tag="h5">1. Setting Permissions for Data Access</MDBTypography>
            <p>Learn how to control who can access your health data and set permission levels for healthcare providers.</p>
            <MDBBtn color="primary" href="https://www.example.com/tutorial1" target="_blank">
              Watch Tutorial
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="mb-4">
          <MDBCardBody>
            <MDBTypography tag="h5">2. Understanding Blockchain Technology</MDBTypography>
            <p>Get an overview of how blockchain technology is used to secure your health data and maintain transparency.</p>
            <MDBBtn color="primary" href="https://www.example.com/tutorial2" target="_blank">
              Watch Tutorial
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="mb-4">
          <MDBCardBody>
            <MDBTypography tag="h5">3. How to Verify Blockchain Integrity</MDBTypography>
            <p>Learn how to check the integrity of your health data entries and verify their authenticity on the blockchain.</p>
            <MDBBtn color="primary" href="https://www.example.com/tutorial3" target="_blank">
              Watch Tutorial
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>

      {/* Articles Section */}
      <MDBContainer className="my-5">
        <MDBTypography tag="h4" className="mb-4">Articles on Data Privacy</MDBTypography>
        
        <MDBCard className="mb-4">
          <MDBCardBody>
            <MDBTypography tag="h5">1. The Importance of Data Privacy in Healthcare</MDBTypography>
            <p>Understand the significance of keeping your health data private and the platform’s commitment to data security.</p>
            <MDBBtn color="secondary" href="https://www.example.com/article1" target="_blank">
              Read Article
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="mb-4">
          <MDBCardBody>
            <MDBTypography tag="h5">2. How We Protect Your Health Data</MDBTypography>
            <p>Learn about the methods and technologies we use to ensure your health data is securely managed and protected.</p>
            <MDBBtn color="secondary" href="https://www.example.com/article2" target="_blank">
              Read Article
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="mb-4">
          <MDBCardBody>
            <MDBTypography tag="h5">3. Patient Rights Regarding Data Privacy</MDBTypography>
            <p>Explore the rights you have over your health data and how you can exercise control over who accesses it.</p>
            <MDBBtn color="secondary" href="https://www.example.com/article3" target="_blank">
              Read Article
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>

      {/* External Resources Section */}
      <MDBContainer className="my-5">
        <MDBTypography tag="h4" className="mb-4">External Resources on Health Data Rights</MDBTypography>
        
        <MDBCard className="mb-4">
          <MDBCardBody>
            <MDBTypography tag="h5">1. Health Data Rights Overview</MDBTypography>
            <p>Learn about your rights regarding health data ownership, privacy, and sharing from leading advocacy organizations.</p>
            <ul>
              <li><a href="https://www.healthit.gov/topic/privacy-security-and-hipaa/health-it-privacy-and-security" target="_blank" rel="noopener noreferrer">Health IT Privacy & Security - HealthIT.gov</a></li>
              <li><a href="https://www.dataprivacy.org/health-data-rights" target="_blank" rel="noopener noreferrer">Health Data Rights - Data Privacy.org</a></li>
            </ul>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="mb-4">
          <MDBCardBody>
            <MDBTypography tag="h5">2. International Standards for Health Data Privacy</MDBTypography>
            <p>Discover global standards and regulations around health data privacy and security.</p>
            <ul>
              <li><a href="https://www.who.int/news-room/fact-sheets/detail/data-privacy-and-security-in-healthcare" target="_blank" rel="noopener noreferrer">WHO - Data Privacy and Security in Healthcare</a></li>
              <li><a href="https://www.oecd.org/health/data-privacy-and-security-in-healthcare.htm" target="_blank" rel="noopener noreferrer">OECD - Data Privacy and Security in Healthcare</a></li>
            </ul>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </MDBContainer>
  );
};

export default TutorialsPage;
