---

## 2. README untuk Frontend (React + Vite)

# Savings App - Frontend

Frontend untuk aplikasi **Savings App**. Aplikasi web ini dirancang untuk memungkinkan pengguna memantau progres tabungan mereka dengan tampilan yang modern dan interaktif.

## Fitur

- **Dashboard Interaktif**: Ringkasan statistik tabungan aktif, selesai, dan mendesak (urgent).
- **Responsive Tabs**: Navigasi antar status tabungan yang dioptimalkan untuk perangkat mobile.
- **Dynamic Progress Bar**: Visualisasi persentase tabungan menggunakan animasi Framer Motion.
- **Modal System**: Pengalaman pengisian data yang *seamless* untuk tambah target dan deposit tanpa berpindah halaman.
- **Real-time Validation**: Validasi form instan untuk memastikan data yang dikirim ke API sudah sesuai.

## Stack/Teknologi

- **Library Utama:** React.js (Vite)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **State Management:** React Hooks (useState, useEffect)



## Cara Menjalankan

1. **Clone & Install:**
   ```bash
   git clone [https://github.com/UsernameAnda/savings-app-frontend.git](https://github.com/UsernameAnda/savings-app-frontend.git)
   cd savings-app-frontend
   npm install

2. Konfigurasi API: Buka file SavingsPage.jsx (atau file konfigurasi Anda) dan pastikan baseUrl mengarah ke alamat backend Anda:
  ```
    const baseUrl = '[http://127.0.0.1:8000](http://127.0.0.1:8000)';
  ```

3. Jalankan Aplikasi:
    ```
    npm run dev
    
Aplikasi akan berjalan di: http://localhost:5173

## Optimasi Mobile

Aplikasi ini sudah dioptimalkan untuk layar kecil dengan fitur:

- Header yang ringkas dengan ikon navigasi.
- Tab bar yang otomatis mengecil (hide labels) pada layar ponsel.
- Grid sistem yang menyesuaikan dari 1 kolom (mobile) ke 3 kolom (desktop).

## Video Penjelasan 
Berikut adalah link video penjelasan kode, struktur database, dan demonstrasi penggunaan aplikasi:

**https://drive.google.com/drive/u/0/folders/1wRhFe-tW-F0LWSCmZgILfMp3njed78pO**
