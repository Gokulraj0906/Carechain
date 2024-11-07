import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase'; 
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase';

const Navbar = () => {
  const [user, setUser] = useState({ email: '', username: '' }); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUser({
            email: data.Emailid || '',
            username: data.UserName || ''
          });
        }
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      navigate('/login'); 
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/home">CareChain</a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon">+</span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/dataaccesspermissions">Data Access</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/datasharingrequests">Data Request</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/activitylogpage">Activity Log</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/healthinsurance">Health Insurance Data</a>
            </li>
            
            {user && (
              <li className="nav-item dropdown">
                <button 
                  className="nav-link dropdown-toggle btn btn-link" 
                  id="navbarDropdown" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  {user.username || 'User'}
                </button>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="/profilesettings">{user.email}</a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
