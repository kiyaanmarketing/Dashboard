import React, { useEffect, useState } from 'react';

const PayloadTable = ({ dataUrl, goHome }) => {
  const [payloads, setPayloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(dataUrl)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPayloads(data.data);
        } else {
          console.error('API responded with error:', data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching payloads:', error);
        setLoading(false);
      });
  }, [dataUrl]);

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>📦 Payloads Table</h2>
      <button onClick={goHome} style={homeButtonStyle}>🏠 Home</button>

      {loading ? (
        <p style={messageStyle}>Loading payloads...</p>
      ) : payloads.length === 0 ? (
        <p style={messageStyle}>No payloads found.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Timestamp</th>
                <th style={thStyle}>Origin</th>
                <th style={thStyle}>Unique ID</th>
                <th style={thStyle}>URL</th>
                <th style={thStyle}>Referrer</th>
                <th style={thStyle}>Payload</th>
              </tr>
            </thead>
            <tbody>
              {payloads.map((item, index) => (
                <tr key={index}>
                  <td style={tdStyle}>{new Date(item.timestamp).toLocaleString()}</td>
                  <td style={tdStyle}>{item.origin}</td>
                  <td style={tdStyle}>{item.unique_id}</td>
                  <td style={tdStyle}>{item.url}</td>
                  <td style={tdStyle}>{item.referrer}</td>
                  <td style={tdStyle}>
                    <pre style={preStyle}>{JSON.stringify(item.payload, null, 2)}</pre>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ----------------------
// ✅ CSS Styles (Inline)
// ----------------------

const containerStyle = {
  padding: '2rem',
  fontFamily: 'Arial, sans-serif',
  textAlign: 'left',
};

const headingStyle = {
  fontSize: '1.8rem',
  marginBottom: '1rem',
};

const homeButtonStyle = {
  backgroundColor: '#1976d2',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  fontSize: '1rem',
  borderRadius: '5px',
  cursor: 'pointer',
  marginBottom: '20px',
};

const messageStyle = {
  fontSize: '1.1rem',
  color: '#555',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '10px',
};

const thStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  backgroundColor: '#f5f5f5',
  fontWeight: 'bold',
  textAlign: 'left',
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  verticalAlign: 'top',
  textAlign: 'left',
};

const preStyle = {
  margin: 0,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
};

export default PayloadTable;
