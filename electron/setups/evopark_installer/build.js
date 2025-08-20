const { exec } = require("child_process");
exec("makensis installer.nsi", (err, stdout, stderr) => {
  if (err) {
    console.error(`❌ NSIS Build Failed: ${stderr}`);
    process.exit(1);
  }
  console.log(`✅ NSIS Build Succeeded:\n${stdout}`);
});

    // "electron": "^37.1.0",
    // "electron-builder": "^26.0.12",