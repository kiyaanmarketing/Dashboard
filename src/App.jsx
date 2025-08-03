import React, { useState } from 'react';
import PayloadTable from './components/PayloadTable';

function App() {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleBackToHome = () => {
    setSelectedComponent(null);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>TrackTraffics Payload Viewer</h1>

      {selectedComponent === null && (
        <>
          <button onClick={() => setSelectedComponent('mypayloads')}>
            View Payloads
          </button>
          <button onClick={() => setSelectedComponent('mytheviewpalm')} style={{ marginLeft: '10px' }}>
            View TheViewPalm
          </button>
        </>
      )}

      {selectedComponent === 'mypayloads' && (
        <PayloadTable
          dataUrl="https://tracktraffics.com/api/mypayloads"
          goHome={handleBackToHome}
        />
      )}

      {selectedComponent === 'mytheviewpalm' && (
        <PayloadTable
          dataUrl="https://tracktraffics.com/api/mytheviewpalm"
          goHome={handleBackToHome}
        />
      )}
    </div>
  );
}

export default App;
