const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');
const archiver = require('archiver');

// Path file
const rootDir = path.resolve(__dirname, '../../../');
const pkgPath = path.join(rootDir, 'package.json');
const installerPkgPath = path.join(rootDir, 'package_installer.json');

// Baca versi lama dari package.json
const oldVersion = JSON.parse(fs.readFileSync(pkgPath, 'utf-8')).version;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

(async () => {
  // =========================
  // 0. Input versi baru
  const newVersion = await ask(
    `Masukkan versi baru (versi lama: ${oldVersion}): `
  );
  if (newVersion === oldVersion) {
    console.log('❌ Versi baru sama dengan versi lama. Update dibatalkan.');
    rl.close();
    process.exit(1);
  }
  if (!newVersion || newVersion.trim() === '') {
    console.log('❌ Versi tidak boleh kosong.');
    rl.close();
    process.exit(1);
  }
  const isValidSemver = /^\d+\.\d+\.\d+$/.test(newVersion);
  if (!isValidSemver) {
    console.log(
      '❌ Format versi tidak valid. Gunakan format semver seperti 1.2.3'
    );
    rl.close();
    process.exit(1);
  }

  // =========================
  // 1. Update baris versi di package.json
  const updateVersionInFile = (filePath, version) => {
    const content = fs
      .readFileSync(filePath, 'utf-8')
      .split('\n')
      .map((line) =>
        line.trim().startsWith('"version"')
          ? line.replace(/"version":\s*".*?"/, `"version": "${version}"`)
          : line
      )
      .join('\n');
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Versi diperbarui di: ${path.basename(filePath)}`);
  };

  updateVersionInFile(pkgPath, newVersion);
  if (fs.existsSync(installerPkgPath)) {
    updateVersionInFile(installerPkgPath, newVersion);
  }

  const nextDir = path.join(rootDir, '.next');
  const publicDir = path.join(rootDir, 'public');
  const nextCacheDir = path.join(nextDir, 'cache');

  const zipNextFileName = '.next.zip';
  const zipPublicFileName = 'public.zip';
  const zipNextTemp = path.join(rootDir, zipNextFileName);
  const zipPublicTemp = path.join(rootDir, zipPublicFileName);

  const rilisRepoDir = 'D:/Github/rilis_ep';
  const zipNextTarget = path.join(rilisRepoDir, zipNextFileName);
  const zipPublicTarget = path.join(rilisRepoDir, zipPublicFileName);
  const versionJsonLocal = path.resolve(__dirname, '../version.json');
  const versionJsonRemote = path.join(rilisRepoDir, 'version.json');

  const commitMessage = `feat: membuat rilis versi ${newVersion}`;

  // =========================
  // 2. Bersihkan cache .next
  if (fs.existsSync(nextCacheDir)) {
    console.log('🧹 Menghapus folder .next/cache...');
    fs.rmSync(nextCacheDir, { recursive: true, force: true });
  }

  // =========================
  // 3. Buat ZIP dari folder .next
  console.log('📦 Membuat .next.zip...');
  await new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipNextTemp);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(
        `✅ File .next.zip berhasil dibuat (${archive.pointer()} bytes)`
      );
      resolve();
    });

    archive.on('error', reject);
    archive.pipe(output);
    archive.glob('**/*', { cwd: nextDir, ignore: ['cache/**'] });
    archive.finalize();
  });

  // =========================
  // 4. Buat ZIP dari folder public
  console.log('📦 Membuat public.zip...');
  await new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipPublicTemp);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(
        `✅ File public.zip berhasil dibuat (${archive.pointer()} bytes)`
      );
      resolve();
    });

    archive.on('error', reject);
    archive.pipe(output);
    archive.glob('**/*', { cwd: publicDir });
    archive.finalize();
  });

  // =========================
  // 5. Pindahkan zip ke folder rilis_ep
  const moveZip = (src, dest) => {
    if (fs.existsSync(dest)) fs.unlinkSync(dest);
    fs.copyFileSync(src, dest);
    console.log(`✅ Dipindah ke: ${dest}`);
  };
  console.log('🚚 Memindahkan ZIP ke folder rilis_ep...');
  moveZip(zipNextTemp, zipNextTarget);
  moveZip(zipPublicTemp, zipPublicTarget);

  // =========================
  // 6. Buat file version.json
  const downloadUrl = await ask('Masukkan URL download update: ');
  const changelog = await ask('Masukkan catatan rilis: ');
  const data = {
    latestVersion: newVersion,
    downloadUrl,
    changelog,
  };
  fs.writeFileSync(versionJsonLocal, JSON.stringify(data, null, 2));
  console.log(`✅ File version.json disimpan di: ${versionJsonLocal}`);

  // =========================
  // 6.5. Salin file main.js ke folder rilis_ep
  const mainJsSrc = path.resolve(rootDir, 'electron/main.js');
  const mainJsDest = path.resolve(rilisRepoDir, 'main.js');

  if (fs.existsSync(mainJsDest)) {
    fs.unlinkSync(mainJsDest);
    console.log('🗑️ File main.js lama dihapus dari rilis_ep');
  }

  fs.copyFileSync(mainJsSrc, mainJsDest);
  console.log(`✅ File main.js disalin dari ${mainJsSrc} ke ${mainJsDest}`);

  // =========================
  // 7. Commit dan push repo utama
  try {
    execSync('git add .', { cwd: rootDir, stdio: 'inherit' });
    execSync(`git commit -m "${commitMessage}"`, {
      cwd: rootDir,
      stdio: 'inherit',
    });
    execSync('git push', { cwd: rootDir, stdio: 'inherit' });
    console.log('🚀 Push ke repo utama selesai');
  } catch {
    console.warn('⚠️  Gagal push repo utama (mungkin tidak ada perubahan)');
  }

  // =========================
  // 8. Salin version.json ke repo rilis_ep
  fs.writeFileSync(versionJsonRemote, JSON.stringify(data, null, 2));
  console.log(
    `✅ File version.json ditulis ke repo rilis_ep: ${versionJsonRemote}`
  );

  // =========================
  // 9. Commit & push repo rilis_ep
  try {
    execSync(
      `git add ${zipNextFileName} ${zipPublicFileName} version.json main.js`,
      {
        cwd: rilisRepoDir,
        stdio: 'inherit',
      }
    );
    execSync(`git commit -m "${commitMessage}"`, {
      cwd: rilisRepoDir,
      stdio: 'inherit',
    });
    execSync('git push', { cwd: rilisRepoDir, stdio: 'inherit' });
    console.log('🚀 Push ke repo rilis_ep selesai');
  } catch {
    console.warn('⚠️  Gagal push repo rilis_ep (mungkin tidak ada perubahan)');
  }

  // =========================
  // Hapus file ZIP lama
  const zipFilesToDelete = ['.next.zip', 'project.zip', 'public.zip'];
  zipFilesToDelete.forEach((file) => {
    const filePath = path.join(rootDir, file);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        console.log(`🗑️ Berhasil menghapus ${file}`);
      } catch (err) {
        console.warn(`⚠️ Gagal menghapus ${file}:`, err.message);
      }
    }
  });

  // =========================
  // Jalankan npm run stepPublish2CreateProjectZip sebelum langkah 10
  try {
    console.log('\n📦 Menjalankan npm run stepPublish2CreateProjectZip...\n');
    execSync('npm run stepPublish2CreateProjectZip', { stdio: 'inherit' });
  } catch (err) {
    console.error('❌ Gagal menjalankan stepPublish2CreateProjectZip');
    process.exit(1); // hentikan proses kalau gagal
  }

  // =========================
  // Hapus file ZIP lama
  // const zipFilesToDelete = ['.next.zip', 'project.zip', 'public.zip'];
  zipFilesToDelete.forEach((file) => {
    const filePath = path.join(rootDir, file);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        console.log(`🗑️ Berhasil menghapus ${file}`);
      } catch (err) {
        console.warn(`⚠️ Gagal menghapus ${file}:`, err.message);
      }
    }
  });

  // =========================
  // 10. Tampilkan versi lama & baru
  console.log('==============================');
  console.log(`📌 Versi lama : ${oldVersion}`);
  console.log(`📌 Versi baru : ${newVersion}`);
  console.log('==============================');

  rl.close();
})();
