import Dexie from 'dexie';
import { encryptText, decryptText } from './encryption';

// ✅ Inisialisasi database IndexedDB
const db = new Dexie('userRoleDB');
db.version(1).stores({
  roles: 'id, nama, hak_akses',
});

// ✅ Simpan level akses terenkripsi
export async function setUserRole(userRole) {
  const encryptedRole = await encryptText(JSON.stringify(userRole));
  await db.roles.put({ id: 1, nama: encryptedRole }, 1);
}

// ✅ Ambil dan dekripsi level akses pengguna
export async function getUserRole() {
  const data = await db.roles.get(1);
  return data?.nama ? JSON.parse(await decryptText(data.nama)) : null;
}

// ✅ Hapus level akses pengguna saja
export async function removeUserRole() {
  await db.roles.update(1, { nama: null });
}

// ✅ Hapus semua data
export async function removeRoleData() {
  await db.roles.delete(1);
}

export { db };
