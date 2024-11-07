import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  LandingPage,
  HomePage,
  SignUp,
  Login,
  Dashboard,
  PatientHealthData,
  DataAccessPermissions,
  DataSharingRequests,
  HealthInsurance,
  ActivityLogPage,
  ProfileSettings,
  HelpCenter,
  TutorialsPage,
  NotificationsCenter,
  AdminDashboard,
  ForgetPassword
} from './Components/Export';
import { AuthProvider, useAuth } from './Contexts/AuthContext';
import { auth } from './Firebase';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS (includes Popper.js)



function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/" />;
}

// Error Boundary Component to catch JavaScript errors anywhere in the child component tree
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [firebaseReady, setFirebaseReady] = useState(false);

  useEffect(() => {
    if (auth) {
      setFirebaseReady(true); // Firebase has been initialized
    }
  }, []);

  if (!firebaseReady) {
    return <div>Loading Firebase...</div>;
  }

  return (
    <AuthProvider>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
            {/* Protected Routes wrapped inside PrivateRoute */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path="/patienthealthdata" element={<PrivateRoute><PatientHealthData /></PrivateRoute>} />
            <Route path="/dataaccesspermissions" element={<PrivateRoute><DataAccessPermissions /></PrivateRoute>} />
            <Route path="/datasharingrequests" element={<PrivateRoute><DataSharingRequests /></PrivateRoute>} />
            <Route path="/activitylogpage" element={<PrivateRoute><ActivityLogPage /></PrivateRoute>} />
            <Route path="/profilesettings" element={<PrivateRoute><ProfileSettings /></PrivateRoute>} />
            <Route path="/helpcenter" element={<PrivateRoute><HelpCenter /></PrivateRoute>} />
            <Route path="/tutorialspage" element={<PrivateRoute><TutorialsPage /></PrivateRoute>} />
            <Route path="/notificationscenter" element={<PrivateRoute><NotificationsCenter /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
            <Route path="/healthinsurance" element={<PrivateRoute><HealthInsurance /></PrivateRoute>} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;
