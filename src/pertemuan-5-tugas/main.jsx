import React from 'react';
import ReactDOM from 'react-dom/client';
import Sidebar from './layouts/Sidebar';
import Header from './layouts/Header';
import Dashboard from './pages/Dashboard';
import './assets/tailwind.css'; // Sesuaikan jika CSS ada di folder assets pertemuan-5

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 1. Struktur Dasar: Layout horizontal dengan background abu-abu muda */}
    <div id="app-container" className="bg-gray-100 min-h-screen flex">
      
      {/* 2. Wrapper Utama: Menyusun Sidebar dan Konten Utama secara berdampingan */}
      <div id="layout-wrapper" className="flex flex-row flex-1">
        
        {/* Komponen Sidebar di sisi kiri */}
        <Sidebar />

        {/* main-content: Area konten utama di sisi kanan sidebar */}
        <div id="main-content" className="flex-1 p-4">
          
          {/* Komponen Header (Search bar & Profile) */}
          <Header />

          {/* Halaman Dashboard (PageHeader & Stat Cards) */}
          <Dashboard />
          
        </div>
      </div>
    </div>
  </React.StrictMode>
);