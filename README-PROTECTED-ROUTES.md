# Protected Routes Implementation (Sangat Sederhana)

## Overview
Implementasi sangat sederhana protected routes. Hanya menggunakan `ProtectedRoute` untuk halaman yang memerlukan login.

## Mengapa Tidak Perlu PublicRoute?

### **Alasan:**
1. **LoginPage bisa diakses siapa saja** - tidak perlu wrapper khusus
2. **Logika sederhana** - hanya perlu melindungi halaman yang sensitif
3. **KISS Principle** - Keep It Simple, Stupid
4. **User yang sudah login di halaman login** - tidak masalah, bisa tetap di sana

### **Alternatif jika ingin redirect user yang sudah login:**
Bisa ditambahkan di dalam `LoginPage` sendiri dengan `useEffect`:

```jsx
useEffect(() => {
  if (user) {
    navigate('/publications');
  }
}, [user]);
```

Tapi untuk implementasi sederhana, ini tidak diperlukan.

## Komponen yang Dibuat

### ProtectedRoute
- **Lokasi**: `src/components/ProtectedRoute.jsx`
- **Fungsi**: Melindungi halaman yang hanya bisa diakses oleh user yang sudah login
- **Behavior**:
  - Jika user belum login → redirect ke `/login`
  - Jika user sudah login → tampilkan halaman yang dilindungi

## Implementasi di App.jsx

```jsx
<Routes>
  {/* Public Route - Tidak perlu wrapper */}
  <Route path="/login" element={<LoginPage />} />
  
  {/* Protected Routes */}
  <Route 
    path="/publications" 
    element={
      <ProtectedRoute>
        <PublicationListPage />
      </ProtectedRoute>
    } 
  />
  <Route 
    path="/publications/add" 
    element={
      <ProtectedRoute>
        <AddPublicationPage />
      </ProtectedRoute>
    } 
  />
  <Route
    path="/publications/edit/:id"
    element={
      <ProtectedRoute>
        <EditPublicationPage />
      </ProtectedRoute>
    }
  />
</Routes>
```

## Flow Autentikasi

### User Belum Login
1. User mencoba akses halaman protected (misal: `/publications`)
2. `ProtectedRoute` mendeteksi user belum login
3. Redirect ke `/login`
4. User login berhasil
5. Redirect ke `/publications`

### User Sudah Login
1. User bisa akses halaman login (tidak masalah)
2. Atau bisa ditambahkan redirect di LoginPage jika diinginkan

## Keuntungan Implementasi Ini

1. **Sangat Sederhana**: Hanya 1 komponen wrapper
2. **Minimal Code**: Tidak ada kompleksitas yang tidak perlu
3. **Mudah Dipahami**: Logika yang straightforward
4. **Flexible**: LoginPage bisa diakses siapa saja

## Kode Komponen

### ProtectedRoute.jsx
```jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
```

## Penggunaan

### Menambah Protected Route Baru
```jsx
<Route 
  path="/admin" 
  element={
    <ProtectedRoute>
      <AdminPage />
    </ProtectedRoute>
  } 
/>
```

### Menambah Public Route Baru
```jsx
<Route path="/about" element={<AboutPage />} />
<Route path="/contact" element={<ContactPage />} />
``` 