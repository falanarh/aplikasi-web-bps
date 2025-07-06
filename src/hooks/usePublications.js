// src/hooks/usePublications.js
import { useState } from 'react';

const initialPublications = [
  {
    id: 1,
    title: 'Statistik Air Bersih Provinsi Bengkulu 2023',
    releaseDate: '2023-05-01',
    description: 'Publikasi ini menyajikan data dan analisis mengenai akses rumah tangga terhadap sumber air minum layak...',
    coverUrl: 'https://res.cloudinary.com/djcm0swgo/image/upload/v1751734373/statistik-air-bersih-2023_1_beeat9.webp',
  },
  {
    id: 2,
    title: 'Statistik Air Bersih Provinsi Bengkulu 2022',
    releaseDate: '2022-05-01',
    description: 'Publikasi ini menyajikan data dan analisis mengenai akses rumah tangga terhadap sumber air minum layak...',
    coverUrl: 'https://res.cloudinary.com/djcm0swgo/image/upload/v1751734413/statistik-air-bersih-2022_1_monxa5.webp',
  },
  {
    id: 3,
    title: 'Statistik Air Bersih Provinsi Bengkulu 2021',
    releaseDate: '2021-05-01',
    description: 'Data dan analisis mengenai akses rumah tangga terhadap sumber air minum layak...',
    coverUrl: 'https://res.cloudinary.com/djcm0swgo/image/upload/v1751734440/statistik-air-bersih-2021_1_jo5pa3.webp',
  },
];

export function usePublications() {
  const [publications, setPublications] = useState(initialPublications);

  const addPublication = (newPub) => {
    setPublications([newPub, ...publications]);
  };

  const editPublication = (updatedPub) => {
    setPublications(publications.map(pub => pub.id === updatedPub.id ? updatedPub : pub));
  };

  const deletePublication = (id) => {
    setPublications(publications.filter(pub => pub.id !== id));
  };

  return {
    publications,
    addPublication,
    editPublication,
    deletePublication,
  };
} 