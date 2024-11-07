import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTypography,
} from 'mdb-react-ui-kit';
import MyNavbar from './Navbar';
const HomePage = () => {
  const [showNav, setShowNav] = React.useState(false);
// eslint-disable-next-line
  const handleNavbarToggle = () => {
    setShowNav(!showNav);
  };

  var date = new Date();

  return (
    <>
      <MyNavbar />  
      {/* Hero Section */}
      <section className="text-center p-5 bg-primary text-white">
        <MDBTypography tag="h1" className="display-4">Empower Your Health Data</MDBTypography>
        <p className="lead">Take control of your health information with secure access and ownership.</p>
        {/* <MDBBtn color="light" size="lg" href="/signup">
          Get Started
        </MDBBtn> */}
      </section>

      {/* Features Section */}
      <MDBContainer className="my-5">
        <MDBTypography tag="h2" className="text-center mb-4">Our Features</MDBTypography>
        <MDBRow className="text-center">
          <MDBCol md="4" className="mb-4">
            <MDBCard className="h-100">
              <MDBCardBody>
                <MDBIcon fas icon="lock" size="3x" className="text-primary mb-3" />
                <h5>Secure Data Storage</h5>
                <p>Your health data is encrypted and securely stored with access control.</p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="4" className="mb-4">
            <MDBCard className="h-100">
              <MDBCardBody>
                <MDBIcon fas icon="user-shield" size="3x" className="text-primary mb-3" />
                <h5>Ownership & Privacy</h5>
                <p>Retain ownership of your data and share it only with your consent.</p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="4" className="mb-4">
            <MDBCard className="h-100">
              <MDBCardBody>
                <MDBIcon fas icon="chart-line" size="3x" className="text-primary mb-3" />
                <h5>Comprehensive Control</h5>
                <p>Manage who can see your health records with full transparency.</p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {/* Testimonials Section */}
      <MDBContainer className="my-5">
        <MDBTypography tag="h2" className="text-center mb-4">What Our Users Say</MDBTypography>
        <MDBRow className="text-center">
          <MDBCol md="6" className="mb-4">
            <MDBCard className="h-100">
              <MDBCardBody>
                <p>“This platform gives me peace of mind knowing I’m in control of my health data.”</p>
                <strong>- Alex, Patient</strong>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="6" className="mb-4">
            <MDBCard className="h-100">
              <MDBCardBody>
                <p>“Finally, a system that respects patient privacy and ownership!”</p>
                <strong>- Jamie, Healthcare Provider</strong>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {/* Call to Action Section */}
      <section className="text-center p-5 bg-dark text-white">
        <MDBTypography tag="h2" className="mb-4">Contact Us</MDBTypography>
        <p>YoungDevs
            Chennai  
            600095</p>
        <p>© {date.getFullYear()} Copyright Reserved.</p>
        {/* <MDBBtn color="light" size="lg" href="/signup">
          Sign Up
        </MDBBtn> */}
      </section>
    </>
  );
};

export default HomePage;
