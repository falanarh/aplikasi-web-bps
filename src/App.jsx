// src/App.jsx

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PublicationListPage from './components/PublicationListPage';
import AddPublicationPage from './components/AddPublicationPage';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import EditPublicationPage from './components/EditPublicationPage';

const initialPublications = [
  {
    id: 1,
    title: 'Statistik Air Bersih Provinsi Bengkulu 2023',
    releaseDate: '2023-05-01',
    description: 'Publikasi ini menyajikan data dan analisis mengenai akses rumah tangga terhadap sumber air minum layak...',
    coverUrl: 'https://i.postimg.cc/j5YB8T2Y/statistik-air-bersih-2023.webp',
  },
  {
    id: 2,
    title: 'Statistik Air Bersih Provinsi Bengkulu 2022',
    releaseDate: '2022-05-01',
    description: 'Publikasi ini menyajikan data dan analisis mengenai akses rumah tangga terhadap sumber air minum layak...',
    coverUrl: 'https://i.postimg.cc/90JSFqpc/statistik-air-bersih-2022.webp',
  },
  {
    id: 3,
    title: 'Statistik Air Bersih Provinsi Bengkulu 2021',
    releaseDate: '2021-05-01',
    description: 'Data dan analisis mengenai akses rumah tangga terhadap sumber air minum layak...',
    coverUrl: 'https://i.postimg.cc/sgB8sxZR/statistik-air-bersih-2021.webp',
  },
];

export default function App() {
  const [publications, setPublications] = useState(initialPublications);
  const [currentPage, setCurrentPage] = useState('publications');
  const [user, setUser] = useState(null);
  const [editingPublication, setEditingPublication] = useState(null);

  const handleAddPublication = newPub => {
    setPublications([newPub, ...publications]);
  };

  const handleEditPublication = pub => {
    setEditingPublication(pub);
    setCurrentPage('edit');
  };

  const handleSaveEdit = updatedPub => {
    setPublications(publications.map(pub => pub.id === updatedPub.id ? updatedPub : pub));
    setEditingPublication(null);
    setCurrentPage('publications');
  };

  const handleCancelEdit = () => {
    setEditingPublication(null);
    setCurrentPage('publications');
  };

  const handleLogin = (username) => {
    setUser(username);
    setCurrentPage('publications');
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  let pageContent;
  if (currentPage === 'add') {
    pageContent = <AddPublicationPage onAddPublication={handleAddPublication} setCurrentPage={setCurrentPage} />;
  } else if (currentPage === 'edit' && editingPublication) {
    pageContent = <EditPublicationPage publication={editingPublication} onSave={handleSaveEdit} onCancel={handleCancelEdit} />;
  } else {
    pageContent = <PublicationListPage publications={publications} onEditPublication={handleEditPublication} />;
  }

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="p-4 sm:p-6 lg:p-8">{pageContent}</main>
      <Footer />
    </div>
  );
}