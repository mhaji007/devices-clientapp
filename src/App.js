import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddDevice from './components/AddDevice';
import DeviceList from './components/DeviceList';
import EditDevice from './components/EditDevice';
import DeleteDevice from './components/DeleteDevice';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DeviceList />} />
        <Route path="/add" element={<AddDevice />} />
        <Route path="/edit/:id" element={<EditDevice />} />
        <Route path="/delete/:id" element={<DeleteDevice />} />
      </Routes>
    </Router>
  );
}

export default App;
