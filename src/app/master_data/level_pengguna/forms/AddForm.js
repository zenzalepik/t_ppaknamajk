import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoInCheckbox from '@/components/evosist_elements/EvoInCheckbox';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserId } from '@/utils/db';
import EvoNotifCard from '@/components/EvoNotifCard';
import dataCheckBoxLevelPengguna from '@/app/master_data/level_pengguna/data/dataCheckBoxLevelPengguna';
import EvoInDropdown from '@/components/evosist_elements/EvoInDropdown';
import { fetchApiMasterDataLevelPenggunaCreate } from '../api/fetchApiMasterDataLevelPenggunaCreate';
import { fetchApiMasterDataPerusahaan } from '../../perusahaan/api/fetchApiMasterDataPerusahaan';

const AddLevelPenggunaForm = ({ isOpen, onClose, onSubmit }) => {
  const [namaHakAkses, setNamaHakAkses] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errors, setErrors] = useState({});

  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const queryClient = useQueryClient();

  const [currentPagePerusahaan, setCurrentPage] = useState(1);

  const {
    data: masterDataPerusahaan,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['masterDataPerusahaan', currentPagePerusahaan],
    queryFn: () =>
      fetchApiMasterDataPerusahaan({
        limit: 5,
        page: currentPagePerusahaan,
        offset: (currentPagePerusahaan - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const [formData, setFormData] = useState({
    nama: '',
    // hak_akses: [],

    perusahaan_id: '',
    user_id: null,
  });

  const handleCloseModal = () => {
    setFormData((prev) => ({
      ...prev,
      nama: '',
      perusahaan_id: '',
      // user_id: null,
    }));

    setSelectedOptions({});
    setNamaHakAkses('');
    setErrors({});
    setNotifMessage('');
    setNotifType('success');
    onClose();
  };

  // Ambil user_id secara async
  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setFormData((prev) => ({ ...prev, user_id: id }));
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    console.log('Form Data Updated:', formData);
  }, [formData]);

  useEffect(() => {
    // Optional: Transform `selectedOptions` ke array format kalau diperlukan
    const hakAksesArray = Object.entries(selectedOptions).map(
      ([key, value]) => ({
        key, // formatnya: 'Menu-Aksi'
        allowed: value,
      })
    );

    setFormData((prev) => ({
      ...prev,
      hak_akses: hakAksesArray,
    }));

    console.log('Hak Akses Terpilih:', hakAksesArray);
  }, [selectedOptions]);

  const handleCheckboxChange = (e, answer, menuName) => {
    const { checked } = e.target;
    const key = `${menuName}-${answer.value}`;

    setSelectedOptions((prev) => {
      const newState = {
        ...prev,
        [key]: checked,
      };

      // Cetak perubahan
      console.log('Perubahan hak akses:', {
        key,
        checked,
        allSelected: newState,
      });

      return newState;
    });

    setErrors((prev) => ({
      ...prev,
      [answer.name]: '',
    }));
  };

  const buildFullHakAkses = () => {
    return dataCheckBoxLevelPengguna.map((menu) => {
      if (!menu.nama_sub_menu) {
        const aksiObj = {};

        if (menu.aksi) {
          for (const aksiKey of Object.keys(menu.aksi)) {
            const key = `${menu.nama_menu}-${aksiKey}`;
            aksiObj[aksiKey] = selectedOptions.hasOwnProperty(key)
              ? selectedOptions[key]
              : menu.aksi[aksiKey]; // fallback default
          }
        }

        return {
          nama_menu: menu.nama_menu,
          nama_sub_menu: null,
          aksi: menu.aksi ? aksiObj : null,
        };
      } else {
        const submenus = menu.nama_sub_menu.map((submenu) => {
          const aksiObj = {};

          if (submenu.aksi) {
            for (const aksiKey of Object.keys(submenu.aksi)) {
              const key = `${submenu.nama}-${aksiKey}`;
              aksiObj[aksiKey] = selectedOptions.hasOwnProperty(key)
                ? selectedOptions[key]
                : submenu.aksi[aksiKey];
            }
          }

          return {
            nama: submenu.nama,
            aksi: submenu.aksi ? aksiObj : null,
          };
        });

        return {
          nama_menu: menu.nama_menu,
          nama_sub_menu: submenus,
        };
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit?.({ namaHakAkses, selectedOptions });

    if (!formData.user_id) {
      setNotifMessage('User ID tidak ditemukan, coba ulangi.');
      setNotifType('error');
      return;
    }

    const newErrors = {
      nama:
        formData.nama.trim() === '' ? 'Nama level pengguna wajib diisi' : '',
      // hak_akses:
      //   formData.hak_akses.trim() === '' ? 'Keterangan wajib diisi' : '',

      perusahaan_id:
        formData.perusahaan_id === '' ? 'Level pengguna wajib dipilih' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    // ✅ Gabungkan `formData` dengan `selectedOptions`
    const finalData = {
      ...formData,
      // hak_akses:
      // ...flattenHakAksesToForm(buildFullHakAkses()),
      hak_akses: JSON.stringify(buildFullHakAkses()), // ⬅ stringified!
    };

    try {
      console.log(JSON.stringify(finalData));
      await fetchApiMasterDataLevelPenggunaCreate(finalData);

      queryClient.invalidateQueries(['masterDataLevelPengguna']); // Refresh tabel setelah tambah data

      setNotifMessage('Data level pengguna disimpan!');
      setNotifType('success');

      setTimeout(() => handleCloseModal(), 500);
    } catch (error) {
      setNotifMessage(error.message);
      setNotifType('error');
    }
  };

  // **Transform levelData ke format rows untuk EvoTable**
  const rows = dataCheckBoxLevelPengguna.flatMap((menu) => {
    const filteredAksi = menu.aksi
      ? Object.keys(menu.aksi).filter((key) => menu.aksi[key] !== null)
      : [];

    const parentRow = {
      menu: <b>{menu.nama_menu}</b>,
      actions: (
        <div className="inline-flex gap-4 justify-start items-start">
          {filteredAksi.length > 0
            ? filteredAksi.map((aksiKey) => (
                <EvoInCheckbox
                  key={`${menu.nama_menu}-${aksiKey}`}
                  horizontal={true}
                  type="hak akses"
                  name={menu.nama_menu}
                  answers={[
                    {
                      label: aksiKey,
                      value: aksiKey,
                      checked:
                        selectedOptions[`${menu.nama_menu}-${aksiKey}`] ??
                        menu.aksi[aksiKey],
                    },
                  ]}
                  onChange={(e, answer) =>
                    handleCheckboxChange(e, answer, menu.nama_menu)
                  }
                />
              ))
            : '—'}
        </div>
      ),
    };

    if (menu.nama_sub_menu) {
      const childRows = menu.nama_sub_menu.map((submenu) => {
        const filteredSubAksi = submenu.aksi
          ? Object.keys(submenu.aksi).filter(
              (key) => submenu.aksi[key] !== null
            )
          : [];

        return {
          menu: ' - ' + submenu.nama,
          actions: (
            <div className="inline-flex gap-4 justify-start items-start">
              {filteredSubAksi.length > 0
                ? filteredSubAksi.map((aksiKey) => (
                    <EvoInCheckbox
                      key={`${submenu.nama}-${aksiKey}`}
                      horizontal={true}
                      type="hak akses"
                      name={submenu.nama}
                      answers={[
                        {
                          label: aksiKey,
                          value: aksiKey,
                          checked:
                            selectedOptions[`${submenu.nama}-${aksiKey}`] ??
                            submenu.aksi[aksiKey],
                        },
                      ]}
                      onChange={(e, answer) =>
                        handleCheckboxChange(e, answer, submenu.nama)
                      }
                    />
                  ))
                : '—'}
            </div>
          ),
        };
      });

      return [parentRow, ...childRows];
    }

    return parentRow;
  });

  // const rows = dataCheckBoxLevelPengguna.flatMap((menu) => {
  //   const parentRow = {
  //     menu: <b>{menu.nama_menu}</b>, // Menu utama ditampilkan tebal
  //     actions: (
  //       <div className="inline-flex gap-4 justify-start items-start">
  //         {menu.aksi
  //           ? Object.keys(menu.aksi).map((aksiKey) => (
  //               <EvoInCheckbox
  //                 key={`${menu.nama_menu}-${aksiKey}`}
  //                 horizontal={true}
  //                 type="hak akses"
  //                 name={menu.nama_menu}
  //                 answers={[
  //                   {
  //                     label: aksiKey,
  //                     value: aksiKey,
  //                     checked:
  //                       selectedOptions[`${menu.nama_menu}-${aksiKey}`] ??
  //                       menu.aksi[aksiKey],
  //                   },
  //                 ]}
  //                 onChange={(e, answer) =>
  //                   handleCheckboxChange(e, answer, menu.nama_menu)
  //                 }
  //               />
  //             ))
  //           : '—'}
  //       </div>
  //     ),
  //   };

  //   if (menu.nama_sub_menu) {
  //     const childRows = menu.nama_sub_menu.map((submenu) => ({
  //       menu: ' - ' + submenu.nama, // Submenu tetap normal (tidak bold)
  //       actions: (
  //         <div className="inline-flex gap-4 justify-start items-start">
  //           {submenu.aksi
  //             ? Object.keys(submenu.aksi).map((aksiKey) => (
  //                 <EvoInCheckbox
  //                   horizontal={true}
  //                   type="hak akses"
  //                   key={`${submenu.nama}-${aksiKey}`}
  //                   name={submenu.nama}
  //                   answers={[
  //                     {
  //                       label: aksiKey,
  //                       value: aksiKey,
  //                       checked:
  //                         selectedOptions[`${submenu.nama}-${aksiKey}`] ??
  //                         submenu.aksi[aksiKey],
  //                     },
  //                   ]}
  //                   onChange={(e, answer) =>
  //                     handleCheckboxChange(e, answer, submenu.nama)
  //                   }
  //                 />
  //               ))
  //             : '—'}
  //         </div>
  //       ),
  //     }));

  //     return [parentRow, ...childRows]; // Gabungkan parent dengan child rows
  //   }

  //   return parentRow;
  // });

  // **Data untuk EvoTable**
  const tableData = {
    columns: [{ label: 'Menu' }, { label: 'Hak Akses' }],
    rows,
  };

  return (
    <>
      {notifMessage && (
        <EvoNotifCard
          message={notifMessage}
          onClose={() => setNotifMessage('')}
          type={notifType}
          autoClose={true}
        />
      )}
      <EvoModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title="Tambah Level Pengguna"
        maxWidthModal="max-w-[1040px]"
      >
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={handleCloseModal}
        >
          <EvoInText
            name="nama"
            label="Nama Hak Akses"
            placeholder="Masukkan nama hak akses"
            value={formData.nama}
            onChange={handleChange}
            error={errors.nama}
          />
          <EvoInDropdown
            name="perusahaan_id"
            label="Perusahaan"
            // options={[
            //   { label: 'Motor', value: 'Motor' },
            //   { label: 'Mobil', value: 'Mobil' },
            //   { label: 'All', value: 'All' },
            // ]}
            options={(masterDataPerusahaan?.data || []).map((item) => ({
              label: item.nama,
              value: item.id,
            }))}
            value={formData.perusahaan_id}
            // onChange={handleDropdownChange}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                perusahaan_id: value,
              }))
            }
            error={errors.perusahaan_id}
            placeholder="Pilih perusahaan"
          />

          {/* Gunakan EvoTable */}
          <label className="text-card mt-2">Pengaturan Hak Akses</label>
          <EvoTable
            id="tableToPrint"
            tableData={tableData}
            currentPage={1}
            totalPages={1}
            onPageChange={(page) => console.log('Page:', page)}
          />
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default AddLevelPenggunaForm;
