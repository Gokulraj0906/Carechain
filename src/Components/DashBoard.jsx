import React, { useEffect, useState } from 'react';
import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { db } from '../Firebase';
import { collection, getDocs } from 'firebase/firestore';

const Profile = () => {
  const [insuranceDataList, setInsuranceDataList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchInsuranceData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'insuranceData'));
        const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setInsuranceDataList(dataList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching insurance data: ", error);
        setLoading(false);
      }
    };

    fetchInsuranceData();
  }, []);

  // Export data as CSV
  const handleExportData = () => {
    if (insuranceDataList.length === 0) {
      alert("No insurance data available to export.");
      return;
    }

    const csvContent = [
      Object.keys(insuranceDataList[0]).join(','),  // Header row
      ...insuranceDataList.map(row => Object.values(row).join(',')),  // Data rows
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'insuranceData.csv';
    a.click();
  };

  return (
    <MDBContainer className="p-4">
      <h2 className="text-center mb-4">Profile Page - Insurance Data</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {insuranceDataList.length > 0 ? (
            <>
              <MDBTable responsive striped bordered>
                <MDBTableHead>
                  <tr>
                    <th>Provider</th>
                    <th>Policy Number</th>
                    <th>Coverage Start</th>
                    <th>Coverage End</th>
                    <th>Status</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {insuranceDataList.map((data, index) => (
                    <tr key={data.id}>
                      <td>{data.provider}</td>
                      <td>{data.policyNumber}</td>
                      <td>{data.coverageStart}</td>
                      <td>{data.coverageEnd}</td>
                      <td>{data.status}</td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
              <div className="text-center mt-4">
                <MDBBtn color="success" onClick={handleExportData}>Download CSV</MDBBtn>
              </div>
            </>
          ) : (
            <p>No insurance data available.</p>
          )}
        </>
      )}
    </MDBContainer>
  );
};

export default Profile;
