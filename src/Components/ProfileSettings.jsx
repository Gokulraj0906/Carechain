import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBTypography,
  MDBInput,
  MDBCheckbox,
} from 'mdb-react-ui-kit';
import { getFirestore, doc, collection, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Navbar from './Navbar';

// Initialize Firestore
const db = getFirestore();

const ProfileSettings = () => {
  const [showNav, setShowNav] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [multiFactorEnabled, setMultiFactorEnabled] = useState(false);
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [accountVisibility, setAccountVisibility] = useState(false);
  const [insuranceData, setInsuranceData] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser; // Get the current user

  // Load user data from Firestore on component mount
  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setEmail(data.email || '');
          setContactNumber(data.contactNumber || '');
          setMultiFactorEnabled(data.multiFactorEnabled || false);
          setNotificationsEnabled(data.notificationsEnabled || false);
          setAccountVisibility(data.accountVisibility || false);
        }

        // Load insurance data
        const insuranceDataRef = collection(db, 'users', user.uid, 'insuranceData');
        const insuranceDataSnap = await getDocs(insuranceDataRef);
        const insuranceDataList = insuranceDataSnap.docs.map(doc => doc.data());
        setInsuranceData(insuranceDataList);
      }
    };

    loadUserData();
  }, [user]);
  // eslint-disable-next-line
  const handleNavbarToggle = () => {
    setShowNav(!showNav);
  };

  const handleSaveChanges = async () => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);

      // Update Firestore with the new user details
      await setDoc(userRef, {
        email,
        contactNumber,
        multiFactorEnabled,
        notificationsEnabled,
        accountVisibility,
      }, { merge: true });

      alert('Profile settings updated successfully!');
    } else {
      alert('No user is logged in');
    }
  };
// eslint-disable-next-line
  const handleExportData = () => {
    const csvData = insuranceData.map(item => ({
      ...item,
    }));
    
    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(',')),
    ].join('\n');

  
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'insuranceData.csv';
    a.click();
  };

  return (
    <MDBContainer fluid className="p-4">
      <Navbar/>

      {/* Header Section */}
      <section className="text-center p-5 bg-primary text-white">
        <MDBTypography tag="h1" className="display-4">Profile Settings</MDBTypography>
        <p className="lead">Update your personal information, security settings, and privacy preferences.</p>
      </section>

      {/* Profile Settings Form */}
      <MDBContainer className="my-5">
        <MDBRow className="justify-content-center">
          <MDBCol md="8">
            <MDBCard className="shadow-2-strong">
              <MDBCardBody>
                <MDBTypography tag="h4" className="mb-4">Personal Information</MDBTypography>
                <MDBInput
                  label="Email Address"
                  type="email"
                  value={user.email}
                  readOnly
                  className="mb-4"
                />
                <MDBInput
                  label="Contact Number"
                  type="text"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="mb-4"
                />

                <MDBTypography tag="h4" className="mt-5 mb-4">Security Settings</MDBTypography>
                <MDBInput
                  label="Current Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mb-4"
                />
                <MDBInput
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mb-4"
                />
                <MDBCheckbox
                  label="Enable Multi-Factor Authentication"
                  checked={multiFactorEnabled}
                  onChange={() => setMultiFactorEnabled(!multiFactorEnabled)}
                  className="mb-4"
                />

                <MDBTypography tag="h4" className="mt-5 mb-4">Privacy Settings</MDBTypography>
                <MDBCheckbox
                  label="Enable Notifications"
                  checked={notificationsEnabled}
                  onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                  className="mb-4"
                />
                <MDBCheckbox
                  label="Make Account Visible to Others"
                  checked={accountVisibility}
                  onChange={() => setAccountVisibility(!accountVisibility)}
                  className="mb-4"
                />

                <div className="text-center mt-4">
                  <MDBBtn color="primary" onClick={handleSaveChanges}>Save Changes</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default ProfileSettings;
