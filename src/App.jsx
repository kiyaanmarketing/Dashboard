import React, { useState } from 'react';
import PayloadTable from './components/PayloadTable'; // Ensure path is correct based on your folder structure
import ClicksSummary from './components/ClicksSummary';

function App() {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleBackToHome = () => {
    setSelectedComponent(null);
  };

  return (
    <div className="app-container">
      {/* Internal CSS for Responsiveness & Styling */}
      <style>{`
        /* Reset & Base Styles */
        * { box-sizing: border-box; }
        
        body {
          margin: 0;
          background-color: #f4f6f8; /* Light grey background */
        }

        .app-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          min-height: 100vh;
          text-align: center;
        }

        .main-title {
          font-size: 2.5rem;
          color: #2c3e50;
          margin-bottom: 40px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        /* Button Grid Layout */
        .button-group {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap; /* Allows wrapping on smaller screens */
          margin-top: 20px;
        }

        /* Modern Button Styles */
        .nav-card-btn {
          background: white;
          border: 1px solid #e0e0e0;
          padding: 30px 40px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 250px;
          text-align: center;
        }

        .nav-card-btn:hover {
          transform: translateY(-5px); /* Lift effect */
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          border-color: #1976d2;
        }

        .btn-icon {
          font-size: 2rem;
          margin-bottom: 10px;
        }

        .btn-text {
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
        }

        .nav-card-btn:hover .btn-text {
          color: #1976d2;
        }

        /* Mobile Responsiveness */
        @media (max-width: 600px) {
          .main-title {
            font-size: 1.8rem;
            margin-bottom: 20px;
          }
          
          .button-group {
            flex-direction: column; /* Stack buttons vertically */
            align-items: center;
          }

          .nav-card-btn {
            width: 100%; /* Full width on mobile */
            padding: 20px;
            flex-direction: row; /* Icon left, text right on mobile */
            justify-content: center;
            gap: 15px;
          }

          .btn-icon {
            margin-bottom: 0;
            font-size: 1.5rem;
          }
        }
      `}</style>

      {selectedComponent === null ? (
        <div className="home-view">
          <h1 className="main-title">TrackTraffics Dashboard</h1>
          
          <div className="button-group">
            {/* Button 1 */}
            <button 
              className="nav-card-btn" 
              onClick={() => setSelectedComponent('mypayloads')}
            >
              <span className="btn-icon">📦</span>
              <span className="btn-text">View Payloads</span>
            </button>

            {/* Button 2 */}
            <button 
              className="nav-card-btn" 
              onClick={() => setSelectedComponent('mytheviewpalm')}
            >
              <span className="btn-icon">🌴</span>
              <span className="btn-text">View TheViewPalm</span>
            </button>
              {/* Button 3 */}
            <button 
              className="nav-card-btn" 
              onClick={() => setSelectedComponent('fareastflora')}
            >
              <span className="btn-icon">📦</span>
              <span className="btn-text">fareastflora</span>
            </button>
              {/* Button 4 */}
            <button 
              className="nav-card-btn" 
              onClick={() => setSelectedComponent('xcite')}
            >
              <span className="btn-icon">📦</span>
              <span className="btn-text">xcite</span>
            </button>
          </div>
        </div>
      ) : (
        /* The Table Components */
        <div className="component-view">
          {selectedComponent === 'mypayloads' && (
            <>
            <ClicksSummary 
            dataUrl="https://tracktraffics.com/api/get?collection=mypayloads"
              goHome={handleBackToHome}
            />
            <PayloadTable
              dataUrl="https://tracktraffics.com/api/get?collection=mypayloads"
              goHome={handleBackToHome}
            />
            </>
          )}

          {selectedComponent === 'mytheviewpalm' && (
            <>
             <ClicksSummary 
            dataUrl="https://tracktraffics.com/api/get?collection=mytheviewpalm"
              goHome={handleBackToHome}
            />
            <PayloadTable
              dataUrl="https://tracktraffics.com/api/get?collection=mytheviewpalm"
              goHome={handleBackToHome}
            />
            </>
          )}
            {selectedComponent === 'fareastflora' && (
            <>
             <ClicksSummary 
            dataUrl="https://tracktraffics.com/api/get?collection=fareastflora"
              goHome={handleBackToHome}
            />
            <PayloadTable
              dataUrl="https://tracktraffics.com/api/get?collection=fareastflora"
              goHome={handleBackToHome}
            />
            </>
          )}

            {selectedComponent === 'xcite' && (
            <>
             <ClicksSummary 
            dataUrl="https://api.dicountshop.com/api/get?collection=xcite"
              goHome={handleBackToHome}
            />
            <PayloadTable
              dataUrl="https://api.dicountshop.com/api/get?collection=xcite"
              goHome={handleBackToHome}
            />
            </>
          )}

        </div>
      )}
    </div>
  );
}

export default App;