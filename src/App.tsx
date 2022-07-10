import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Create from './pages/Create';
import Home from './pages/Home';
import Details from './pages/Details';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="create" element={<Create />} />
        <Route path="details/:id" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
