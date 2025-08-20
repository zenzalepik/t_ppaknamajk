// utils/dbGlobals.js
import Dexie from 'dexie';

export const dbGlobals = new Dexie('EvolusiParkDB');

dbGlobals.version(1).stores({
  config: 'key',
});

export async function savePengaturanGlobal(data) {
  await dbGlobals.config.put({ key: 'pengaturanGlobal', ...data });
}

export async function getPengaturanGlobal() {
  return await dbGlobals.config.get('pengaturanGlobal');
}

export async function clearPengaturanGlobal() {
  return await dbGlobals.config.delete('pengaturanGlobal');
}
