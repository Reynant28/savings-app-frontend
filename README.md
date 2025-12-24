
# Savings App Frontend

Frontend web untuk aplikasi **Savings App**, dirancang agar pengguna dapat **memantau, mengelola, dan mengevaluasi progres tabungan** dengan antarmuka modern dan interaktif.

Aplikasi ini terhubung langsung dengan Backend API berbasis Laravel.

> **Backend Repository:**  
> https://github.com/Reynant28/savings-app-backend

---

## Fitur Utama

- **Interactive Dashboard**  
  Menampilkan ringkasan:
  - tabungan aktif
  - tabungan selesai
  - tabungan mendesak (urgent)

- **Responsive Tabs**  
  Navigasi status tabungan yang dioptimalkan untuk mobile & desktop.

- **Dynamic Progress Bar**  
  Visualisasi progres tabungan menggunakan **Framer Motion animation**.

- **Modal System**  
  Tambah target dan deposit tanpa berpindah halaman.

- **Real-time Validation**  
  Validasi input form sebelum data dikirim ke API.

---

## Tech Stack

- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Hooks (`useState`, `useEffect`)

---

## Cara Menjalankan (Localhost)

### 1️. Clone & Install Dependency
```bash
git clone https://github.com/Reynant28/savings-app-frontend.git
cd savings-app-frontend
npm install
````

### 2️. Konfigurasi API

Pastikan `baseUrl` mengarah ke backend:

```js
const baseUrl = 'http://127.0.0.1:8000';
```

### 3️. Jalankan Aplikasi

```bash
npm run dev
```

Aplikasi akan berjalan di:

```
http://localhost:5173
```

---

## Optimasi Mobile

Aplikasi telah dioptimalkan untuk layar kecil dengan:

* Header ringkas berbasis ikon
* Tab bar adaptif (label otomatis disembunyikan)
* Grid responsif (1 kolom → 3 kolom)

---

## Video Demonstrasi

Video berisi:

* Penjelasan aplikasi
* Demonstrasi penggunaan aplikasi

Link:
[https://drive.google.com/drive/u/0/folders/1wRhFe-tW-F0LWSCmZgILfMp3njed78pO](https://drive.google.com/drive/u/0/folders/1wRhFe-tW-F0LWSCmZgILfMp3njed78pO)
