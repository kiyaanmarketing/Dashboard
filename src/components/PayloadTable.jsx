import React, { useEffect, useState } from 'react';

const PayloadTable = ({ dataUrl, goHome }) => {
  const [payloads, setPayloads] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedPayload, setSelectedPayload] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleViewPayload = (payload) => {
    setSelectedPayload(payload);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPayload(null);
  };

  return (
    <div className="table-container">
      <style>{`
        .table-container {
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          /* Important: Allows horizontal scroll for the whole container */
          overflow-x: auto; 
        }
        
        .header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .home-btn {
          background-color: #1976d2;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }
        .home-btn:hover { background-color: #115293; }
        
        /* Table Styles */
        .responsive-table {
          width: 100%;
          /* ✅ MAIN FIX: Force table to be wide enough so columns don't squash */
          min-width: 1200px; 
          border-collapse: collapse;
          background: white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          table-layout: fixed; 
        }
        
        /* Fixed Column Widths (Adjusted for better fit) */
        .responsive-table th:nth-child(1) { width: 140px; } /* Timestamp */
        .responsive-table th:nth-child(2) { width: 180px; } /* Origin (Increased) */
        .responsive-table th:nth-child(3) { width: 220px; } /* Unique ID */
        .responsive-table th:nth-child(4) { width: 300px; } /* URL (Widest) */
        .responsive-table th:nth-child(5) { width: 200px; } /* Referrer */
        .responsive-table th:nth-child(6) { width: 120px; } /* Data Button */

        .responsive-table th, .responsive-table td {
          padding: 12px 15px;
          border-bottom: 1px solid #ddd;
          text-align: left;
          font-size: 14px;
          vertical-align: middle;
          /* ✅ FIX: Ensures cell content doesn't bleed out */
          overflow: hidden; 
        }

        .responsive-table th {
          background-color: #f8f9fa;
          font-weight: 600;
          color: #333;
        }

        /* Scrollable Text Logic */
        .scrollable-text {
          width: 100%;
          overflow-x: auto;
          white-space: nowrap;
          display: block;
          padding-bottom: 4px;
        }
        
        /* Styling scrollbar to be subtle */
        .scrollable-text::-webkit-scrollbar { height: 4px; }
        .scrollable-text::-webkit-scrollbar-track { background: transparent; }
        .scrollable-text::-webkit-scrollbar-thumb { background: #d1d1d1; border-radius: 2px; }
        .scrollable-text::-webkit-scrollbar-thumb:hover { background: #888; }

        .view-btn {
          background-color: #2e7d32;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          white-space: nowrap;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 90%;
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
          position: relative;
        }
        .close-btn {
          position: absolute;
          top: 10px;
          right: 15px;
          background: transparent;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #666;
        }
        .json-pre {
          background: #f4f4f4;
          padding: 15px;
          border-radius: 5px;
          overflow-x: auto;
          font-size: 13px;
          color: #333;
        }

        /* MOBILE RESPONSIVE CSS */
        @media screen and (max-width: 768px) {
          .table-container { overflow-x: hidden; } /* Disable container scroll on mobile cards */
          .responsive-table { min-width: 100%; } /* Reset min-width for cards */
          
          .responsive-table thead { display: none; }
          .responsive-table, .responsive-table tbody, .responsive-table tr, .responsive-table td {
            display: block;
            width: 100%;
          }
          .responsive-table tr {
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background: #fff;
            padding: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          }
          .responsive-table td {
            text-align: right;
            padding-left: 50%;
            position: relative;
            border-bottom: 1px solid #eee;
          }
          .responsive-table td::before {
            content: attr(data-label);
            position: absolute;
            left: 10px;
            width: 40%;
            text-align: left;
            font-weight: bold;
            color: #555;
          }
          
          .scrollable-text {
            white-space: normal;
            word-break: break-all;
            overflow-x: visible;
          }
        }
      `}</style>

      <div className="header-row">
        <h2 style={{ margin: 0 }}>📦 Payloads</h2>
        <button onClick={goHome} className="home-btn">🏠 Home</button>
      </div>

      {loading ? (
        <p>Loading payloads...</p>
      ) : payloads.length === 0 ? (
        <p>No payloads found.</p>
      ) : (
        /* ✅ Container itself handles the main scroll now */
        <div style={{ overflowX: 'auto', border: '1px solid #eee', borderRadius: '4px' }}>
          <table className="responsive-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Origin</th>
                <th>Unique ID</th>
                <th>URL</th>
                <th>Referrer</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {payloads.map((item, index) => (
                <tr key={index}>
                  <td data-label="Timestamp">
                    {new Date(item.timestamp).toLocaleString()}
                  </td>
                  
                  {/* ✅ Fixed Origin: Added scrollable-text class */}
                  <td data-label="Origin">
                    <span className="scrollable-text" title={item.origin}>
                      {item.origin}
                    </span>
                  </td>

                  <td data-label="Unique ID">
                    <span className="scrollable-text" title={item.unique_id}>
                      {item.unique_id}
                    </span>
                  </td>

                  <td data-label="URL">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="scrollable-text" title={item.url}>
                      {item.url}
                    </a>
                  </td>

                  <td data-label="Referrer">
                    <span className="scrollable-text" title={item.referrer}>
                      {item.referrer || 'N/A'}
                    </span>
                  </td>

                  <td data-label="Data">
                    <button 
                      className="view-btn"
                      onClick={() => handleViewPayload(item.payload)}
                    >
                      👁 View JSON
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>&times;</button>
            <h3>Payload Details</h3>
            <pre className="json-pre">
              {JSON.stringify(selectedPayload, null, 2)}
            </pre>
            <button onClick={closeModal} className="home-btn" style={{marginTop: '10px', width: '100%'}}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayloadTable;