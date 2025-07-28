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

  if (loading) return <p>Loading payloads...</p>;

  if (!payloads.length) return <p>No payloads found.</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>📦 Payloads Table</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
              <td style={tdStyle}><pre>{JSON.stringify(item.payload, null, 2)}</pre></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  background: '#f0f0f0',
  fontWeight: 'bold',
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  verticalAlign: 'top',
};

export default PayloadTable;
