// lib/dbLevelPengguna.js
import Dexie from 'dexie';

export const dbLevelPengguna = new Dexie('LevelPenggunaDB');

dbLevelPengguna.version(1).stores({
  levelPengguna: 'id,nama,perusahaan_id,hak_akses', // index id
});
