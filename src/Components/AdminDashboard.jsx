import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBTypography,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBProgress,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from 'mdb-react-ui-kit';

const AdminDashboard = () => {
  const [showNav, setShowNav] = useState(false);
  // eslint-disable-next-line
  const [userStats, setUserStats] = useState({
    totalUsers: 1500,
    activeUsers: 1200,
    inactiveUsers: 300
  });
  // eslint-disable-next-line
  const [platformUsage, setPlatformUsage] = useState({
    totalAccessRequests: 2500,
    dataShared: 1800,
    permissionChanges: 500
  });
  // eslint-disable-next-line
  const [securityAlerts, setSecurityAlerts] = useState([
    { id: 1, alert: 'Unusual login attempt from IP 192.168.1.100', severity: 'High', date: '2024-11-06' },
    { id: 2, alert: 'Permission changes detected for user "Dr. Smith"', severity: 'Medium', date: '2024-11-04' },
    { id: 3, alert: 'Unusual data sharing activity from XYZ Research Org', severity: 'Low', date: '2024-11-02' }
  ]);

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
        <MDBTypography tag="h1" className="display-4">Admin Dashboard</MDBTypography>
        <p className="lead">Monitor platform activity, manage users, and ensure data integrity.</p>
      </section>

      {/* User Management Section */}
      <MDBContainer className="my-5">
        <MDBRow>
          <MDBCol md="4" className="mb-4">
            <MDBCard className="shadow-2-strong">
              <MDBCardBody>
                <MDBTypography tag="h5" className="mb-4">User Management</MDBTypography>
                <p>Total Users: {userStats.totalUsers}</p>
                <p>Active Users: {userStats.activeUsers}</p>
                <p>Inactive Users: {userStats.inactiveUsers}</p>
                <MDBBtn color="primary">Manage Users</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          {/* Platform Usage Section */}
          <MDBCol md="4" className="mb-4">
            <MDBCard className="shadow-2-strong">
              <MDBCardBody>
                <MDBTypography tag="h5" className="mb-4">Platform Usage</MDBTypography>
                <p>Total Access Requests: {platformUsage.totalAccessRequests}</p>
                <p>Data Shared: {platformUsage.dataShared}</p>
                <p>Permission Changes: {platformUsage.permissionChanges}</p>
                <MDBBtn color="primary">View Usage Analytics</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          {/* Security Monitoring Section */}
          <MDBCol md="4" className="mb-4">
            <MDBCard className="shadow-2-strong">
              <MDBCardBody>
                <MDBTypography tag="h5" className="mb-4">Security Monitoring</MDBTypography>
                <MDBTable bordered>
                  <MDBTableHead>
                    <tr>
                      <th>Alert</th>
                      <th>Severity</th>
                      <th>Date</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {securityAlerts.map((alert) => (
                      <tr key={alert.id}>
                        <td>{alert.alert}</td>
                        <td>
                          <span className={`badge ${alert.severity === 'High' ? 'bg-danger' : alert.severity === 'Medium' ? 'bg-warning' : 'bg-success'}`}>
                            {alert.severity}
                          </span>
                        </td>
                        <td>{alert.date}</td>
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
                <MDBBtn color="danger">View All Alerts</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {/* Platform Health Section */}
      <MDBContainer className="my-5">
        <MDBRow>
          <MDBCol md="6" className="mb-4">
            <MDBCard className="shadow-2-strong">
              <MDBCardBody>
                <MDBTypography tag="h5" className="mb-4">Platform Health</MDBTypography>
                <MDBTypography tag="h6">System Status</MDBTypography>
                <MDBProgress value={90} max={100} className="mb-3" />
                <p>Platform is running smoothly with 90% uptime in the past 24 hours.</p>
                <MDBBtn color="success">Check Health Logs</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="6" className="mb-4">
            <MDBCard className="shadow-2-strong">
              <MDBCardBody>
                <MDBTypography tag="h5" className="mb-4">User Activity Overview</MDBTypography>
                <MDBTypography tag="h6">Most Active Users</MDBTypography>
                {/* Add a bar chart or similar visualization */}
                <MDBBtn color="primary">View Detailed Analytics</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default AdminDashboard;