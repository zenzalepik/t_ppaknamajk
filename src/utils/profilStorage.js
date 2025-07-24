// lib/profilStorage.js
import { dbProfil } from './dbProfil';

export async function simpanDataProfil(data) {
  await dbProfil.profil.clear(); // hapus lama
  await dbProfil.profil.add({ ...data, id: 1 }); // ID tetap supaya 1 data saja
}

export async function ambilDataProfil() {
  return await dbProfil.profil.get(1); // Ambil ID 1
}
