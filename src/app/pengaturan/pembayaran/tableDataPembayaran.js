export const tableDataPembayaran = {
  columns: [
    { label: "No." },
    { label: "ID" },
    { label: "Jenis Payment" },
    { label: "Status" },
    { label: "Dibuat Pada" },
    { label: "Diperbarui Pada" },
  ],
  rows: [
    {
      no: 1,
      id: "pmt001",
      jenis_payment: "Tunai",
      status: true, // true = aktif, false = nonaktif
      createdAt: "2025-01-01 08:00:00",
      updatedAt: "2025-01-02 09:30:00",
    },
    {
      no: 2,
      id: "pmt002",
      jenis_payment: "QRIS",
      status: false,
      createdAt: "2025-01-05 10:15:00",
      updatedAt: "2025-01-06 11:00:00",
    },
    {
      no: 3,
      id: "pmt003",
      jenis_payment: "Kartu Member",
      status: true,
      createdAt: "2025-02-01 14:00:00",
      updatedAt: "2025-02-01 16:30:00",
    },
    {
      no: 4,
      id: "pmt004",
      jenis_payment: "",
      status: false,
      createdAt: "",
      updatedAt: "",
    },
  ],
};
