import Dexie from 'dexie';
import { encryptText, decryptText } from './encryption';

const db = new Dexie('authDB');
db.version(1).stores({
  auth: 'id, token, user_id',
});

// ✅ Simpan token terenkripsi
export async function setToken(token) {
  // console.log('Token terenkripsi:', token);
  const encryptedToken = await encryptText(token);
  await db.auth.put({ id: 1, token: encryptedToken }, 1);
}

// ✅ Ambil dan dekripsi token
export async function getToken() {
  const data = await db.auth.get(1);
  return data?.token ? await decryptText(data.token) : null;
}

// ✅ Hapus token saja
export async function removeToken() {
  await db.auth.update(1, { token: null });
}

// ✅ Simpan user_id terenkripsi
export async function setUserId(user_id) {
  // console.log('User ID terenkripsi:', user_id);
  const encryptedUserId = await encryptText(user_id.toString());
  await db.auth.update(1, { user_id: encryptedUserId });
}

// ✅ Ambil dan dekripsi user_id
export async function getUserId() {
  const data = await db.auth.get(1);
  return data?.user_id ? await decryptText(data.user_id) : null;
}

// ✅ Hapus user_id
export async function removeUserId() {
  await db.auth.update(1, { user_id: null });
}

// ✅ Hapus semua
export async function removeAuthData() {
  await db.auth.delete(1);
}

export { db };
