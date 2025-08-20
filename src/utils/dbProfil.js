// lib/dbProfil.js
import Dexie from 'dexie';

export const dbProfil = new Dexie('ProfilDB');

dbProfil.version(1).stores({
  profil: 'id', // kamu bisa pakai id dari server
});
