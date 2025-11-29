import React, { useEffect, useState } from 'react';

const ClicksSummary = ({ dataUrl, goHome }) => {
  const [summary, setSummary] = useState({ 
    withReferrer: 0, 
    withoutReferrer: 0, 
    total: 0 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(dataUrl)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          let withReferrerCount = 0;
          let withoutReferrerCount = 0;

          // Aggregation Logic
          data.data.forEach(item => {
            // Check if referrer exists and is not empty or "N/A"
            const referrer = String(item.referrer || '').trim();
            
            if (referrer && referrer.toUpperCase() !== 'N/A') {
              withReferrerCount++;
            } else {
              withoutReferrerCount++;
            }
          });

          setSummary({
            withReferrer: withReferrerCount,
            withoutReferrer: withoutReferrerCount,
            total: data.data.length,
          });
        } else {
          console.error('API responded with error or data is not array:', data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching summary:', error);
        setLoading(false);
      });
  }, [dataUrl]);

  return (
    <div className="summary-container">
      {/* Injecting CSS Styles for Cards and Responsiveness */}
      <style>{`
        .summary-container {
          padding: 2rem 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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

        /* Card Layout */
        .summary-cards {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 20px;
        }

        .summary-card {
          flex: 1; /* Equal width distribution */
          min-width: 250px; 
          background: white;
          padding: 30px 20px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: transform 0.2s;
        }

        .summary-card:hover {
          transform: translateY(-5px);
        }

        .card-title {
          font-size: 1rem;
          color: #555;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .card-count {
          font-size: 2.5rem;
          font-weight: 700;
        }
        
        .card-count.total { color: #1976d2; }
        .card-count.with { color: #2e7d32; }
        .card-count.without { color: #d32f2f; }


        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .summary-cards {
            flex-direction: column; /* Stacking on mobile */
          }
          .summary-card {
            min-width: 100%;
          }
        }
      `}</style>

      <div className="header-row">
        <h2 style={{ margin: 0 }}>📈 Clicks Summary</h2>
        <button onClick={goHome} className="home-btn">🏠 Home</button>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading summary data...</p>
      ) : (
        <div className="summary-cards">
          {/* Card 1: Clicks with Referrer */}
          <div className="summary-card">
            <div className="card-title">Clicks with Referrer</div>
            <div className="card-count with">
              {summary.withReferrer.toLocaleString()}
            </div>
          </div>

          {/* Card 2: Clicks without Referrer */}
          <div className="summary-card">
            <div className="card-title">Clicks without Referrer</div>
            <div className="card-count without">
              {summary.withoutReferrer.toLocaleString()}
            </div>
          </div>

          {/* Card 3: Total Clicks */}
          <div className="summary-card">
            <div className="card-title">Total Clicks</div>
            <div className="card-count total">
              {summary.total.toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClicksSummary;