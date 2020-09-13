import React from 'react';
import { Routes } from './routes/app.routes'
import { Navbar } from './components/Navbar';
import { BottomNavigation } from './components/BottomNavigation';


function App() {
  return <div className="text-center bg-gray-300 min-h-screen">
    <Routes /> 
  </div>
}

export default App; 
