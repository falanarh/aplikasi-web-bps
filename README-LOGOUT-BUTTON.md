# LogoutButton Component

## Overview
Komponen `LogoutButton` adalah komponen yang dapat digunakan kembali untuk tombol logout dengan styling dan behavior yang konsisten.

## Lokasi
`src/components/LogoutButton.jsx`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `itemId` | string | - | ID unik untuk button (required) |
| `onClick` | function | - | Function yang dipanggil saat button diklik (required) |
| `disabled` | boolean | - | Status disabled button (required) |
| `loadingText` | string | 'Logging out...' | Text yang ditampilkan saat loading |
| `label` | string | 'Logout' | Text yang ditampilkan saat tidak loading |
| `className` | string | '' | Class tambahan untuk styling |

## Penggunaan

### Basic Usage
```jsx
import LogoutButton from './components/LogoutButton';

<LogoutButton
  itemId="logout"
  onClick={handleLogout}
  disabled={loading}
/>
```

### Dengan Custom Text
```jsx
<LogoutButton
  itemId="logout"
  onClick={handleLogout}
  disabled={loading}
  loadingText="Sedang keluar..."
  label="Keluar"
/>
```

### Dengan Custom Styling
```jsx
<LogoutButton
  itemId="logout"
  onClick={handleLogout}
  disabled={loading}
  className="custom-class"
/>
```

## Implementasi di Navbar

```jsx
if (item.id === "logout") {
  return (
    <LogoutButton
      itemId={item.id}
      onClick={handleLogout}
      disabled={loading}
      loadingText="Logging out..."
      label={item.label}
    />
  );
}
```

## Styling

Komponen ini menggunakan Tailwind CSS dengan styling yang sama persis dengan implementasi sebelumnya:

### Normal State
- `px-3 py-2 rounded-md text-sm font-semibold`
- `transition-all duration-300 border border-transparent`
- `text-sky-100 hover:bg-sky-700 hover:text-white cursor-pointer`

### Disabled State
- `bg-gray-400 cursor-not-allowed opacity-60`

## Keuntungan

1. **Reusable**: Dapat digunakan di berbagai tempat
2. **Consistent**: Styling dan behavior yang konsisten
3. **Flexible**: Props yang dapat dikustomisasi
4. **Maintainable**: Mudah untuk diubah dan diperbaiki
5. **Clean Code**: Memisahkan logika logout dari komponen parent

## Contoh Penggunaan Lain

### Di Sidebar
```jsx
<LogoutButton
  itemId="sidebar-logout"
  onClick={handleLogout}
  disabled={loading}
  loadingText="Keluar..."
  label="Logout"
  className="w-full"
/>
```

### Di Dropdown Menu
```jsx
<LogoutButton
  itemId="dropdown-logout"
  onClick={handleLogout}
  disabled={loading}
  loadingText="Processing..."
  label="Sign Out"
  className="text-left w-full"
/>
``` 