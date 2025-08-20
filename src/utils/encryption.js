// utils/encryption.js

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

// Konversi key dari hex ke ArrayBuffer
function hexToArrayBuffer(hex) {
  const bytes = new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  return bytes.buffer;
}

// Konversi string ke ArrayBuffer
function strToArrayBuffer(str) {
  return new TextEncoder().encode(str);
}

// Konversi ArrayBuffer ke string base64
function arrayBufferToBase64(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

// Konversi string base64 ke ArrayBuffer
function base64ToArrayBuffer(base64) {
  const binary = atob(base64);
  return new Uint8Array([...binary].map(char => char.charCodeAt(0))).buffer;
}

// Import key agar bisa dipakai di Web Crypto API
async function getCryptoKey() {
  return await crypto.subtle.importKey(
    'raw',
    hexToArrayBuffer(SECRET_KEY),
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );
}

// 🔐 Fungsi enkripsi
export async function encryptText(text) {
  const iv = crypto.getRandomValues(new Uint8Array(12)); // IV = Initialization Vector
  const key = await getCryptoKey();
  const encoded = strToArrayBuffer(text);
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded
  );

  return `${arrayBufferToBase64(iv)}:${arrayBufferToBase64(encrypted)}`;
}

// 🔓 Fungsi dekripsi
export async function decryptText(encryptedText) {
  const [ivBase64, dataBase64] = encryptedText.split(':');
  const iv = new Uint8Array(base64ToArrayBuffer(ivBase64));
  const data = base64ToArrayBuffer(dataBase64);
  const key = await getCryptoKey();

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );

  return new TextDecoder().decode(decrypted);
}
