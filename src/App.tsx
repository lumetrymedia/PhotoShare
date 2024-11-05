import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { EventDetails, LandingPage, AIBoothPage } from './pages';
import { Header } from './components/Header';

const App: React.FC = () => {
  return (
    <div>
      <Header />

      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/:uniqueId" element={<EventDetails />} />
        <Route path="/aibooth/:eventId/:galleryId" element={<AIBoothPage />} />
      </Routes>
    </div>
  );
};

export default App;
