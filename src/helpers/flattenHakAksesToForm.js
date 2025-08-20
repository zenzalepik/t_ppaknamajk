const flattenHakAksesToForm = (dataHakAkses) => {
  const flat = {};

  dataHakAkses.forEach((menu) => {
    if (!menu.nama_sub_menu) {
      if (menu.aksi) {
        Object.entries(menu.aksi).forEach(([aksi, val]) => {
          flat[`${menu.nama_menu}-${aksi}`] = val;
        });
      }
    } else {
      menu.nama_sub_menu.forEach((submenu) => {
        if (submenu.aksi) {
          Object.entries(submenu.aksi).forEach(([aksi, val]) => {
            flat[`${submenu.nama}-${aksi}`] = val;
          });
        }
      });
    }
  });

  return flat;
};

export default flattenHakAksesToForm;
