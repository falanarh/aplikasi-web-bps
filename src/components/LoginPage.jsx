import React, { useState } from 'react';
import BpsLogo from '../assets/bps-logo.png';
import apiClient from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginAction } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validasi sederhana: username dan password tidak boleh kosong
    if (!email || !password) {
      alert('Email dan password harus diisi!');
      return;
    }
    try {
      // Langkah 1: Ambil CSRF cookie dari Sanctum
      await apiClient.get('/sanctum/csrf-cookie');
  
      // Langkah 2: Kirim request login dengan kredensial
      const response = await apiClient.post('/login', { email, password });
  
      if (response.data.token) {
        loginAction(response.data); // Simpan token dan data user ke Context & localStorage
        navigate('/publications'); // Arahkan ke halaman yang dilindungi
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <img src={BpsLogo} alt="BPS Logo" className="h-16 w-16 mb-2" />
          <h1 className="text-2xl font-bold text-gray-800 text-center">Login</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
              placeholder="Masukkan email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
              placeholder="Masukkan password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
} 