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

const HelpCenter = () => {
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
        <MDBTypography tag="h1" className="display-4">Help Center / FAQ</MDBTypography>
        <p className="lead">Your guide to understanding the platform and managing your health data.</p>
      </section>

      {/* FAQ Section */}
      <MDBContainer className="my-5">
        <MDBTypography tag="h4" className="mb-4">Frequently Asked Questions</MDBTypography>
        
        <MDBCard className="mb-4">
          <MDBCardBody>
            <MDBTypography tag="h5">1. What is Blockchain Technology?</MDBTypography>
            <p>Blockchain technology is a decentralized and secure digital ledger that records transactions in a transparent and immutable way. It ensures that once data is added to the blockchain, it cannot be altered or deleted.</p>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="mb-4">
          <MDBCardBody>
            <MDBTypography tag="h5">2. How is my data shared with healthcare providers?</MDBTypography>
            <p>We allow patients to control and manage who can access their health data. You can set permissions for each healthcare provider, specifying access levels such as read-only or full access, and even set expiration dates for access.</p>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="mb-4">
          <MDBCardBody>
            <MDBTypography tag="h5">3. How do I know my data is secure?</MDBTypography>
            <p>Your data is stored securely using the latest encryption methods and is only accessible by authorized users. Additionally, the use of blockchain technology ensures a transparent and immutable record of all data access and sharing events.</p>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="mb-4">
          <MDBCardBody>
            <MDBTypography tag="h5">4. What are my rights regarding my health data?</MDBTypography>
            <p>You retain full ownership of your health data. You have the right to control who has access to it, the right to revoke permissions, and the right to export your data for personal or legal purposes.</p>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="mb-4">
          <MDBCardBody>
            <MDBTypography tag="h5">5. How can I verify the integrity of my data records?</MDBTypography>
            <p>Each record in the system is timestamped and hashed on the blockchain. You can verify the integrity of any data entry by checking its blockchain hash through the provided verification tools.</p>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>

      {/* Educational Resources Section */}
      <MDBContainer className="my-5">
        <MDBTypography tag="h4" className="mb-4">Educational Resources</MDBTypography>
        
        <MDBCard className="mb-4">
          <MDBCardBody>
            <MDBTypography tag="h5">Learn More About Blockchain Technology</MDBTypography>
            <p>Blockchain technology is revolutionizing how data is stored and managed. To learn more about how it works and its applications in healthcare, you can visit our educational blog or explore third-party resources:</p>
            <ul>
              <li><a href="https://www.ibm.com/topics/what-is-blockchain" target="_blank" rel="noopener noreferrer">What is Blockchain? - IBM</a></li>
              <li><a href="https://www.coindesk.com/learn/what-is-blockchain-technology" target="_blank" rel="noopener noreferrer">Blockchain 101 - CoinDesk</a></li>
            </ul>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>

      {/* Contact Support Section */}
      <MDBContainer className="my-5">
        <MDBTypography tag="h4" className="mb-4">Contact Support</MDBTypography>
        
        <MDBCard className="mb-4">
          <MDBCardBody>
            <MDBTypography tag="h5">Need Assistance?</MDBTypography>
            <p>If you have further questions or need support, please reach out to our customer support team. We're here to help!</p>
            <p>Email: <a href="mailto:gokulsenthil0906@gmail.com">gokulsenthil0906@gmail.com</a></p>
            <MDBBtn color="primary" href="https://chat.whatsapp.com/I9SCk42YS24LN9HKVeAaGF" target="_blank">
              Start a Live Chat
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </MDBContainer>
  );
};

export default HelpCenter;
