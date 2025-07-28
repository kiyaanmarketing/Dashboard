import React, { useEffect, useState } from 'react';

const PayloadTable = () => {
  const [payloads, setPayloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://tracktraffics.com/api/mypayloads')
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
  }, []);

  if (loading) return <p style={loadingStyle}>⏳ Loading payloads...</p>;

  if (!payloads.length) return <p style={loadingStyle}>⚠️ No payloads found.</p>;

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>📦 Payloads Table</h2>
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
              <tr key={index} style={index % 2 === 0 ? rowStyleEven : rowStyleOdd}>
                <td style={tdStyle}>{new Date(item.timestamp).toLocaleString()}</td>
                <td style={tdStyle}>{item.origin}</td>
                <td style={tdStyle}>{item.unique_id}</td>
                <td style={tdStyle}>{item.url}</td>
                <td style={tdStyle}>{item.referrer}</td>
                <td style={tdStyle}>
                  <pre style={preStyle}>
                    {JSON.stringify(item.payload, null, 2)}
                  </pre>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  padding: '2rem',
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f9f9f9',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  margin: '2rem',
};

const headingStyle = {
  textAlign: 'center',
  marginBottom: '1.5rem',
  color: '#333',
  fontSize: '1.8rem',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  minWidth: '800px',
};

const thStyle = {
  border: '1px solid #ddd',
  padding: '12px',
  backgroundColor: '#007BFF',
  color: '#fff',
  textAlign: 'left',
  fontSize: '1rem',
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  fontSize: '0.95rem',
  color: '#333',
  verticalAlign: 'top',
};

const preStyle = {
  margin: 0,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  background: '#f5f5f5',
  padding: '10px',
  borderRadius: '6px',
  fontSize: '0.85rem',
  fontFamily: 'monospace',
};

const rowStyleEven = {
  backgroundColor: '#ffffff',
};

const rowStyleOdd = {
  backgroundColor: '#f2f2f2',
};

const loadingStyle = {
  textAlign: 'center',
  fontSize: '1.2rem',
  padding: '2rem',
  color: '#666',
};

export default PayloadTable;
