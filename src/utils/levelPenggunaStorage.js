// lib/levelPenggunaStorage.js
import { dbLevelPengguna } from './dbLevelPengguna';

// Simpan data ke IndexedDB
export async function simpanLevelPengguna(dataArray) {
  await dbLevelPengguna.levelPengguna.clear(); // hapus lama
  await dbLevelPengguna.levelPengguna.bulkAdd(dataArray); // tambah baru
}

// Ambil data dari IndexedDB
export async function ambilLevelPengguna() {
  return await dbLevelPengguna.levelPengguna.toArray();
}
