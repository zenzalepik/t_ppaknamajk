--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: level_akses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.level_akses (id, nama, akses_menu, "createdAt", "updatedAt") FROM stdin;
1	Administrator	[{"no": 1, "nama": "Admin", "added": "31-10-2022 14:39", "updated": "31-10-2022 14:39", "hakAkses": [{"aksi": {"read": true, "create": true, "delete": true, "update": true}, "nama_menu": "Dashboard", "nama_sub_menu": null}, {"nama_menu": "Master", "nama_sub_menu": [{"aksi": {"read": true, "create": true, "delete": true, "update": true}, "nama": "User"}, {"aksi": {"read": true, "create": true, "delete": true, "update": true, "konfigurasi_menu": true}, "nama": "Level Akses"}, {"aksi": {"read": true, "create": true, "delete": true, "update": true}, "nama": "Produk Member"}, {"aksi": {"read": true, "create": true, "delete": true, "update": true}, "nama": "Produk Voucher"}, {"aksi": {"read": true, "create": true, "delete": true, "update": true, "perpanjang": true, "ganti_kartu": true, "ganti_nopol": true}, "nama": "Data Member"}, {"aksi": {"read": true, "create": true, "delete": true, "update": true}, "nama": "Data Voucher"}, {"aksi": {"read": true, "create": true, "delete": true, "update": true}, "nama": "POS"}, {"aksi": {"read": true, "create": true, "delete": true, "update": true}, "nama": "Kendaraan"}, {"aksi": {"create": true, "delete": true, "update": true}, "nama": "Shift"}, {"aksi": {"read": true, "create": true, "delete": true, "update": true}, "nama": "Perusahaan"}]}, {"nama_menu": "Setting", "nama_sub_menu": [{"aksi": {"read": true, "create": true, "delete": true, "update": true}, "nama": "Tarif Parkir"}, {"aksi": {"read": true, "create": true, "delete": true, "update": true}, "nama": "Tarif Denda"}, {"aksi": {"read": true, "update": true}, "nama": "Parameter"}, {"aksi": {"read": true, "update": true}, "nama": "Global"}, {"aksi": {"read": true, "update": true}, "nama": "Payment"}]}, {"nama_menu": "Transaksi", "nama_sub_menu": [{"aksi": null, "nama": "Manual mix"}, {"aksi": null, "nama": "Pembatalan Transaksi"}, {"aksi": {"read": true, "delete": true, "update": true, "create_perbaikan": true, "create_permasalahan": true}, "nama": "Permasalahan atau Perbaikan"}]}, {"nama_menu": "Report", "nama_sub_menu": [{"aksi": null, "nama": "Kendaraan"}, {"aksi": null, "nama": "Overnight"}, {"aksi": null, "nama": "Pendapatan Parkir"}, {"aksi": null, "nama": "Pendapatan Gabungan"}, {"aksi": null, "nama": "Pendapatan Member"}, {"aksi": null, "nama": "Pendapatan Voucher"}, {"aksi": null, "nama": "Pembatalan Transaksi"}, {"aksi": null, "nama": "Audit Transaksi"}, {"aksi": null, "nama": "Settlement Cashless"}]}], "perusahaan": "PT. KAS"}, {"no": 2, "nama": "Operator", "added": "31-10-2022 14:39", "updated": "31-10-2022 14:39", "hakAkses": [{"aksi": {"read": true, "create": false, "delete": false, "update": false}, "nama_menu": "Dashboard", "nama_sub_menu": null}], "perusahaan": "PT. KAS"}, {"no": 3, "nama": "Supervisor", "added": "06-05-2025 16:52", "updated": "06-05-2025 16:52", "hakAkses": [{"aksi": {"read": true, "create": true, "delete": false, "update": true}, "nama_menu": "Dashboard", "nama_sub_menu": null}, {"nama_menu": "Master", "nama_sub_menu": [{"aksi": {"read": true, "create": true, "delete": false, "update": true}, "nama": "User"}]}, {"nama_menu": "Transaksi", "nama_sub_menu": [{"aksi": {"read": true, "create": true, "delete": false, "update": false}, "nama": "Pembatalan Transaksi"}]}], "perusahaan": "PT. KAS"}, {"no": 4, "nama": "Finance", "added": "06-05-2025 16:52", "updated": "06-05-2025 16:52", "hakAkses": [{"nama_menu": "Report", "nama_sub_menu": [{"aksi": {"read": true}, "nama": "Pendapatan Parkir"}, {"aksi": {"read": true}, "nama": "Pendapatan Gabungan"}]}, {"nama_menu": "Setting", "nama_sub_menu": [{"aksi": {"read": true, "update": true}, "nama": "Payment"}]}], "perusahaan": "PT. KAS"}, {"no": 5, "nama": "IT Support", "added": "06-05-2025 16:52", "updated": "06-05-2025 16:52", "hakAkses": [{"aksi": {"read": true, "create": false, "delete": false, "update": false}, "nama_menu": "Dashboard", "nama_sub_menu": null}, {"nama_menu": "Setting", "nama_sub_menu": [{"aksi": {"read": true, "update": true}, "nama": "Parameter"}, {"aksi": {"read": true, "update": true}, "nama": "Global"}]}, {"nama_menu": "Transaksi", "nama_sub_menu": [{"aksi": {"read": true, "delete": true, "update": true, "create_perbaikan": true, "create_permasalahan": true}, "nama": "Permasalahan atau Perbaikan"}]}], "perusahaan": "PT. KAS"}]	2025-05-29 10:05:37.303+07	2025-05-29 10:05:37.303+07
\.


--
-- Name: level_akses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.level_akses_id_seq', 1, true);


--
-- PostgreSQL database dump complete
--

