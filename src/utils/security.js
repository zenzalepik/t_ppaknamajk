import DOMPurify from 'dompurify';
import sanitizeHtml from 'sanitize-html';

// Parameter untuk mengaktifkan / menonaktifkan fitur disable right click
export const DISABLE_RIGHT_CLICK = true; // ubah ke false kalau mau diaktifkan lagi

export function sanitizeInput(input) {
  return sanitizeHtml(DOMPurify.sanitize(input));
}

// Fungsi untuk inisialisasi disable right click
// export function initRightClickBlocker() {
//   if (DISABLE_RIGHT_CLICK && typeof window !== 'undefined') {
//     window.addEventListener('contextmenu', (event) => event.preventDefault());
//   }
// }

export function initRightClickBlocker() {
  const DISABLE_RIGHT_CLICK = true;

  if (!DISABLE_RIGHT_CLICK || typeof window === "undefined") return;

  // Buat elemen menu konteks
  const menu = document.createElement("div");
  menu.style.position = "absolute";
  menu.style.background = "#fff";
  menu.style.border = "1px solid #ccc";
  menu.style.borderRadius = "6px";
  menu.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
  menu.style.minWidth = "120px";
  menu.style.zIndex = "9999";
  menu.style.display = "none";
  document.body.appendChild(menu);

  // Utility: Buat item menu
  function createItem(label, handler) {
    const item = document.createElement("div");
    item.textContent = label;
    item.style.padding = "8px 12px";
    item.style.cursor = "pointer";
    item.style.transition = "background 0.2s";
    item.addEventListener("mouseenter", () => {
      item.style.background = "#007BFF";
      item.style.color = "#fff";
    });
    item.addEventListener("mouseleave", () => {
      item.style.background = "#fff";
      item.style.color = "#000";
    });
    item.addEventListener("click", () => {
      handler();
      menu.style.display = "none";
    });
    return item;
  }

  // Copy teks yang diseleksi
  const copyItem = createItem("Copy", () => {
    const selectedText = window.getSelection().toString();
    if (!selectedText.trim()) {
      alert("Silakan blok teks yang ingin disalin.");
      return;
    }

    const temp = document.createElement("textarea");
    temp.value = selectedText;
    temp.style.position = "fixed";
    temp.style.opacity = "0";
    document.body.appendChild(temp);
    temp.select();

    try {
      const success = document.execCommand("copy");
      if (success) {
        console.log("Teks berhasil disalin:", selectedText);
      } else {
        console.warn("Gagal menyalin teks.");
      }
    } catch (err) {
      console.error("Kesalahan saat menyalin:", err);
      alert("Browser tidak mendukung penyalinan otomatis.");
    }

    document.body.removeChild(temp);
  });

  // Paste ke input aktif
  const pasteItem = createItem("Paste", () => {
    const active = document.activeElement;
    if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA")) {
      navigator.clipboard.readText().then((text) => {
        active.value += text;
        console.log("Teks ditempelkan:", text);
      }).catch((err) => {
        console.error("Gagal membaca clipboard:", err);
        alert("Browser tidak mengizinkan akses clipboard.");
      });
    } else {
      alert("Klik pada input atau textarea untuk menempelkan.");
    }
  });

  // Tambahkan item ke menu
  menu.appendChild(copyItem);
  menu.appendChild(pasteItem);

  // Tampilkan menu saat klik kanan
  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    menu.style.display = "block";
    menu.style.left = `${e.pageX}px`;
    menu.style.top = `${e.pageY}px`;
  });

  // Sembunyikan menu saat klik di luar
  window.addEventListener("click", () => {
    menu.style.display = "none";
  });
}
