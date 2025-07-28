// vercel/pushRootAndVercel.js

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('[STATUS] Masukkan pesan commit untuk root project: ', (commitMessage) => {
  try {
    if (!commitMessage.trim()) {
      throw new Error('[STATUS] Pesan commit tidak boleh kosong.');
    }

    console.log('\n[STATUS] Menambahkan semua perubahan...');
    execSync('git add .', { stdio: 'inherit' });

    console.log('\n[STATUS] Melakukan commit...');
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

    console.log('\n[STATUS] Push ke remote...');
    execSync('git push', { stdio: 'inherit' });

    console.log('\n[STATUS] Menjalankan deployVercel...');
    execSync('pnpm deployVercel', { stdio: 'inherit' });

    console.log('\n[STATUS] Push dan Deploy selesai!');
  } catch (err) {
    console.error('\n[STATUS] Terjadi kesalahan:', err.message);
  } finally {
    rl.close();
  }
});
