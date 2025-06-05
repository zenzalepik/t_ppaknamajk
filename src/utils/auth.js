// Cek apakah pengguna sudah login
export function isAuthenticated() {
    return !!localStorage.getItem('token'); // Mengembalikan true jika token ada
  }
  
  // Fungsi login: menyimpan token ke localStorage
  export function login(token) {
    localStorage.setItem('token', token); // Token bisa didapat dari server saat login berhasil
  }
  
  // Fungsi logout: menghapus token dari localStorage
  export function logout() {
    localStorage.removeItem('token'); // Token dihapus, pengguna dianggap logout
  }
  
  // Dapatkan token pengguna
  export function getToken() {
    return localStorage.getItem('token'); // Mengambil token dari localStorage
  }
  
  // Simpan informasi pengguna (opsional)
  export function saveUserInfo(user) {
    localStorage.setItem('user', JSON.stringify(user)); // Menyimpan informasi pengguna
  }
  
  // Ambil informasi pengguna (opsional)
  export function getUserInfo() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null; // Mengembalikan objek user jika ada, jika tidak null
  }