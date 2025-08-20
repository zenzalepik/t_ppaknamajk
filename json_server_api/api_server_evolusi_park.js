require('dotenv').config(); // Load dotenv untuk menggunakan SECRET_KEY dari .env
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = process.env.SECRET_KEY || 'default-secret-key';

// ✅ Endpoint Registrasi (Menyimpan user dengan password yang di-hash)
app.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  // Hash password sebelum disimpan
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await axios.post('http://localhost:5000/users', {
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Endpoint Login dengan JSON Server sebagai database
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await axios.get(
      `http://localhost:5000/users?email=${email}`
    );
    if (response.data.length === 0)
      return res.status(404).json({ error: 'User not found' });

    const user = response.data[0];

    // Gunakan bcrypt.compare async untuk keamanan dan performa lebih baik
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('Password cocok?', isValidPassword);

    if (!isValidPassword)
      return res.status(401).json({ error: 'Invalid credentials' });

    // ✅ Buat JWT Token dengan SECRET_KEY dari .env
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Middleware untuk validasi JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'Token required' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });

    req.user = decoded;
    next();
  });
};

// ✅ Contoh endpoint yang hanya bisa diakses dengan JWT
app.get('/profile', verifyToken, async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:5000/profile`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile data' });
  }
});

app.put('/profile', verifyToken, async (req, res) => {
  try {
    const {
      namaLengkap,
      nomorHandphone,
      jenisKelamin,
      alamatLengkap,
      asalPerusahaan,
      levelPengguna,
      fotoProfil,
    } = req.body;

    // Validasi input
    if (!namaLengkap || !nomorHandphone || !jenisKelamin || !alamatLengkap) {
      return res
        .status(400)
        .json({ error: 'Harap isi semua data profil dengan benar' });
    }

    // Ambil data lama dari database
    const response = await axios.get('http://localhost:5000/profile');
    const existingProfile = response.data;

    // Update data profil
    const updatedProfile = {
      ...existingProfile,
      namaLengkap,
      nomorHandphone,
      jenisKelamin,
      alamatLengkap,
      asalPerusahaan,
      levelPengguna,
      fotoProfil,
    };

    // Simpan perubahan ke database (JSON Server)
    await axios.put('http://localhost:5000/profile', updatedProfile);

    res.json({
      message: 'Profil berhasil diperbarui',
      profile: updatedProfile,
    });
  } catch (error) {
    console.error('Error updating profile:', error.message);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengupdate profil' });
  }
});

// ✅ Jalankan server
app.listen(4000, () => {
  console.log('✅ Express Server berjalan di http://localhost:4000');
});
