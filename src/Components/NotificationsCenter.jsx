import React, { useState, useEffect } from 'react';
import { db } from '../Firebase'; // Firebase configuration
import { collection, onSnapshot,doc,updateDoc } from 'firebase/firestore';
import { MDBContainer, MDBCard, MDBCardBody, MDBTypography, MDBBadge, MDBBtn } from 'mdb-react-ui-kit';
import Navbar from './Navbar';
const NotificationsCenter = () => {
  const [notifications, setNotifications] = useState([]);
  
  // Real-time listener for notifications
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "notifications"), (querySnapshot) => {
      const notificationsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(notificationsData); // Update state with new notifications
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  // Mark notification as read
  const handleNotificationRead = async (id) => {
    // Update notification status to "read" in Firestore
    const notificationRef = doc(db, "notifications", id);
    await updateDoc(notificationRef, { read: true });
  };

  return (
    <MDBContainer fluid className="p-4">
      <Navbar/>
      <section className="text-center p-5 bg-primary text-white">
        <MDBTypography tag="h1" className="display-4">Notifications Center</MDBTypography>
        <p className="lead">Stay updated on your health data access requests, permission expirations, and activity logs.</p>
      </section>

      <MDBContainer className="my-5">
        <MDBTypography tag="h4" className="mb-4">Your Notifications</MDBTypography>

        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <MDBCard key={notification.id} className="mb-3">
              <MDBCardBody>
                <MDBTypography tag="h6">{notification.message}</MDBTypography>
                <p className="text-muted">Type: {notification.type}</p>
                <p className="text-muted">Date: {notification.date}</p>
                <MDBBadge color={notification.read ? 'success' : 'danger'} className="mr-2">
                  {notification.read ? 'Read' : 'Unread'}
                </MDBBadge>
                <MDBBtn color="info" onClick={() => handleNotificationRead(notification.id)}>
                  Mark as Read
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          ))
        ) : (
          <p>No notifications available.</p>
        )}
      </MDBContainer>
    </MDBContainer>
  );
};

export default NotificationsCenter;
