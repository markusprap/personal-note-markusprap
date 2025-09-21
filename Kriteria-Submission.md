# Submission Kelas Belajar Fundamental Aplikasi Web dengan React

**Proyek: Membangun SPA + API, Context, dan Hooks**

## A. Pengantar

Selamat! Anda berada di penghujung akhir kelas. Sejauh ini Anda telah:

- mengetahui cara menjalankan dan menangani proses asynchronous di komponen React,
- mengetahui fase mounting, updating, dan unmounting di komponen React,
- mengetahui cara bypass props drilling dalam mengirimkan state antar komponen dengan React Context, dan
- menuliskan kode React yang lebih baik dengan memanfaatkan fitur Hooks.

Untuk menguji pemahaman dan lulus dari kelas ini, Anda perlu menyelesaikan submission akhir. Submission akhir di kelas ini merupakan tugas lanjutan dari proyek yang sudah Anda kerjakan pada submission awal. Tentunya, dengan penambahan fitur yang akan kami jelaskan kriterianya.

## B. Kriteria

Kembangkan aplikasi catatan pribadi dengan kriteria berikut ini.

### ⭐ Kriteria Utama 1: Memanfaatkan RESTful API sebagai sumber data

Aplikasi harus memanfaatkan RESTful API sebagai sumber data dengan detail berikut:

- **RESTful API:** `https://notes-api.dicoding.dev/v1` (Dokumentasi API bisa diakses pada tautan tersebut)
- **Harus menggunakan RESTful API** untuk:
  - registrasi dan autentikasi
  - daftar catatan
  - daftar catatan terarsip (opsional)
  - detil catatan
  - arsip/batal arsip catatan (opsional)
  - hapus catatan
- **Catatan:** Fungsi untuk transaksi API sudah disediakan (lihat Referensi)

### ⭐ Kriteria Utama 2: Registrasi dan Autentikasi Pengguna

- **Halaman registrasi** dengan input:
  - nama
  - email
  - password
  - confirm password (opsional)
- **Halaman login** dengan input email dan password
- **Menyimpan access token** dari autentikasi di local storage
- **Simpan data pengguna** yang terautentikasi pada komponen state
- **Tombol logout** untuk menghapus autentikasi pengguna

### ⭐ Kriteria Utama 3: Memproteksi Fitur Catatan

- **Fitur catatan hanya dapat diakses** oleh pengguna yang telah terautentikasi
- **Bila belum login:** pengguna hanya dapat mengakses halaman login atau registrasi
- **Menampilkan resource catatan** yang hanya dimiliki oleh pengguna yang terautentikasi

### ⭐ Kriteria Utama 4: Ubah Tema

- **Tombol untuk mengubah tema** gelap/terang
- **Memanfaatkan React Context** dalam membangun fitur ubah tema
- **Menyimpan perubahan tema** ke local storage agar persisten

### ⭐ Kriteria Utama 5: Menggunakan Hooks

- **Menerapkan Hooks** dalam pengelolaan state setidaknya untuk fitur/kode pada halaman registrasi dan autentikasi pengguna

### ⭐ Kriteria Utama 6: Memenuhi seluruh kriteria utama submission sebelumnya

- Minimal terdapat 2 halaman yang berbeda
- Daftar catatan
- Detail catatan
- Menambahkan catatan baru
- Menghapus catatan

## 🌟 Kriteria Opsional

### 🌟 Kriteria Opsional 1: Menampilkan indikasi loading
- Aplikasi menampilkan indikasi loading ketika memuat data dari RESTful API

### 🌟 Kriteria Opsional 2: Fitur ubah bahasa
- Tombol untuk mengubah bahasa Indonesia ke Inggris, atau sebaliknya
- Memanfaatkan React Context dalam membangun fitur ubah bahasa
- Menyimpan perubahan bahasa ke local storage agar persisten

## C. Referensi

- **Contoh Aplikasi:** https://dicoding-react-notes-app-v2.netlify.app/
- **Network Functions:** [network-data.js](https://github.com/dicodingacademy/a433-react-expert-labs/blob/main/shared/network-data.js) - Simpan di `src/utils`

## D. Tips & Tricks

### Custom Hooks untuk Input
Ekstraksi duplikasi logika dengan custom hooks:

```javascript
import { useState } from 'react';

function useInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);

  const onValueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  return [value, onValueChangeHandler];
}

export default useInput;
```

### Penggunaan Custom Hooks
```javascript
function InputLogin() {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <div className="input-login">
      <label htmlFor="email">Email</label>
      <input type="email" id="email" value={email} onChange={onEmailChange} />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" value={password} onChange={onPasswordChange} />
    </div>
  );
}
```

## E. Penilaian

### Rating Submission:

- ⭐ **Bintang 1:** Semua wajib terpenuhi, tapi ada indikasi kecurangan
- ⭐⭐ **Bintang 2:** Semua wajib terpenuhi, tapi ada kekurangan penulisan kode
- ⭐⭐⭐ **Bintang 3:** Semua wajib terpenuhi, tidak ada improvisasi
- ⭐⭐⭐⭐ **Bintang 4:** Semua wajib terpenuhi + minimal 2 saran di atas
- ⭐⭐⭐⭐⭐ **Bintang 5:** Semua wajib terpenuhi + seluruh saran di atas

### Saran untuk Nilai Tinggi:
- Menerapkan kriteria opsional submission sebelumnya
- Menerapkan kriteria opsional 1: Loading indicator
- Menerapkan kriteria opsional 2: Fitur ubah bahasa
- Menuliskan kode dengan baik
- Mengekstraksi duplikasi logika dengan custom hooks
- Function component sebagai prioritas utama
- UI dipecah menjadi komponen sekecil mungkin
- Gaya penulisan kode konsisten

## F. Ketentuan

### Berkas Submission:
- Folder proyek Aplikasi Catatan Pribadi dalam bentuk ZIP
- Proyek React yang di-render menggunakan react-dom
- **Hapus folder node_modules** sebelum ZIP
- Boleh tambah aset seperti gambar

### Submission Ditolak Bila:
- Kriteria utama tidak terpenuhi
- Ketentuan berkas submission tidak terpenuhi
- Menggunakan framework/UI library selain React
- Mengirim kode JavaScript yang telah di-minify
- Melakukan kecurangan/plagiasi

### Proses Review:
- Review dalam waktu maksimal 3 hari kerja
- Tidak disarankan submit berkali-kali
- Notifikasi hasil review via email