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
-- Name: enum_data_vouchers_model_bayar; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_data_vouchers_model_bayar AS ENUM (
    'Check In',
    'Check Out'
);


ALTER TYPE public.enum_data_vouchers_model_bayar OWNER TO postgres;

--
-- Name: enum_data_vouchers_verifikasi; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_data_vouchers_verifikasi AS ENUM (
    'Tiket',
    'Nopol'
);


ALTER TYPE public.enum_data_vouchers_verifikasi OWNER TO postgres;

--
-- Name: enum_kendaraans_tipe_kendaraan; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_kendaraans_tipe_kendaraan AS ENUM (
    'Mobil',
    'Motor',
    'All'
);


ALTER TYPE public.enum_kendaraans_tipe_kendaraan OWNER TO postgres;

--
-- Name: enum_permasalahan_atau_perbaikans_kategori_permasalahan; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_permasalahan_atau_perbaikans_kategori_permasalahan AS ENUM (
    'Hardware/Alat',
    'Sistem',
    'SDM',
    'Operasional',
    'Lain-lain'
);


ALTER TYPE public.enum_permasalahan_atau_perbaikans_kategori_permasalahan OWNER TO postgres;

--
-- Name: enum_permasalahan_atau_perbaikans_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_permasalahan_atau_perbaikans_status AS ENUM (
    'Pending',
    'On Progress',
    'Done'
);


ALTER TYPE public.enum_permasalahan_atau_perbaikans_status OWNER TO postgres;

--
-- Name: enum_permasalahan_atau_perbaikans_status_perbaikan; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_permasalahan_atau_perbaikans_status_perbaikan AS ENUM (
    'Pending',
    'On Progress',
    'Done'
);


ALTER TYPE public.enum_permasalahan_atau_perbaikans_status_perbaikan OWNER TO postgres;

--
-- Name: enum_permasalahan_atau_perbaikans_status_permasalahan; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_permasalahan_atau_perbaikans_status_permasalahan AS ENUM (
    'Pending',
    'On Progress',
    'Done'
);


ALTER TYPE public.enum_permasalahan_atau_perbaikans_status_permasalahan OWNER TO postgres;

--
-- Name: enum_perusahaans_jenis_perusahaan; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_perusahaans_jenis_perusahaan AS ENUM (
    'Pemilik Gedung',
    'Tenant',
    'Developer'
);


ALTER TYPE public.enum_perusahaans_jenis_perusahaan OWNER TO postgres;

--
-- Name: enum_pos_nama_interface; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_pos_nama_interface AS ENUM (
    'BGI',
    'TWS',
    'PAWL',
    'SMART PARKING',
    'SER TELINKS',
    'USB TELINKS'
);


ALTER TYPE public.enum_pos_nama_interface OWNER TO postgres;

--
-- Name: enum_pos_nama_printer; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_pos_nama_printer AS ENUM (
    'Epson TM-T81 Receipt',
    'Epson TM-T82 Receipt',
    'Epson TM-U220 Receipt',
    ''
);


ALTER TYPE public.enum_pos_nama_printer OWNER TO postgres;

--
-- Name: enum_pos_tipe_kendaraan; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_pos_tipe_kendaraan AS ENUM (
    'Mobil',
    'Motor',
    'All'
);


ALTER TYPE public.enum_pos_tipe_kendaraan OWNER TO postgres;

--
-- Name: enum_pos_tipe_manless; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_pos_tipe_manless AS ENUM (
    'Loop 1 with Button',
    'Loop 1 with Button and Feedback',
    'Feedback with Button',
    'Button Only'
);


ALTER TYPE public.enum_pos_tipe_manless OWNER TO postgres;

--
-- Name: enum_pos_tipe_pos; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_pos_tipe_pos AS ENUM (
    'In',
    'Out'
);


ALTER TYPE public.enum_pos_tipe_pos OWNER TO postgres;

--
-- Name: enum_produk_members_periode_unit; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_produk_members_periode_unit AS ENUM (
    'Hari',
    'Bulan',
    'Tahun'
);


ALTER TYPE public.enum_produk_members_periode_unit OWNER TO postgres;

--
-- Name: enum_produk_vouchers_metode_verifikasi; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_produk_vouchers_metode_verifikasi AS ENUM (
    'Tiket',
    'Nopol'
);


ALTER TYPE public.enum_produk_vouchers_metode_verifikasi OWNER TO postgres;

--
-- Name: enum_produk_vouchers_model_pembayaran; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_produk_vouchers_model_pembayaran AS ENUM (
    'Check In',
    'Check Out'
);


ALTER TYPE public.enum_produk_vouchers_model_pembayaran OWNER TO postgres;

--
-- Name: enum_produk_vouchers_periode_unit; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_produk_vouchers_periode_unit AS ENUM (
    'Keluar',
    'Hari',
    'Bulan'
);


ALTER TYPE public.enum_produk_vouchers_periode_unit OWNER TO postgres;

--
-- Name: enum_users_jenis_kelamin; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_users_jenis_kelamin AS ENUM (
    'Laki-laki',
    'Perempuan'
);


ALTER TYPE public.enum_users_jenis_kelamin OWNER TO postgres;

--
-- Name: enum_users_level; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_users_level AS ENUM (
    'Administrator',
    'Operator',
    'Reporting',
    'No Akses',
    'Kepala Lokasi',
    'Front Office'
);


ALTER TYPE public.enum_users_level OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: data_members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.data_members (
    id integer NOT NULL,
    nama character varying(255),
    no_hp character varying(255),
    perusahaan_id integer,
    akses_tiket boolean,
    akses_kartu boolean,
    no_kartu character varying(255),
    tgl_input timestamp with time zone,
    produk_id integer,
    tarif integer NOT NULL,
    biaya_member integer NOT NULL,
    biaya_kartu integer NOT NULL,
    periode daterange,
    user_id integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.data_members OWNER TO postgres;

--
-- Name: data_members_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.data_members_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER SEQUENCE public.data_members_id_seq OWNER TO postgres;

--
-- Name: data_members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.data_members_id_seq OWNED BY public.data_members.id;


--
-- Name: data_nomor_polisis; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.data_nomor_polisis (
    id integer NOT NULL,
    data_member_id integer,
    kendaraan_id integer,
    nomor_polisi character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.data_nomor_polisis OWNER TO postgres;

--
-- Name: data_nomor_polisis_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.data_nomor_polisis_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER SEQUENCE public.data_nomor_polisis_id_seq OWNER TO postgres;

--
-- Name: data_nomor_polisis_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.data_nomor_polisis_id_seq OWNED BY public.data_nomor_polisis.id;


--
-- Name: data_vouchers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.data_vouchers (
    id integer NOT NULL,
    produk_voucher_id integer,
    periode_value integer,
    periode_unit character varying(255),
    periode daterange,
    tarif integer NOT NULL,
    model_bayar public.enum_data_vouchers_model_bayar,
    verifikasi public.enum_data_vouchers_verifikasi,
    no_tiket_atau_nopol character varying(255),
    kendaraan_id integer,
    keterangan character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.data_vouchers OWNER TO postgres;

--
-- Name: data_vouchers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.data_vouchers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER SEQUENCE public.data_vouchers_id_seq OWNER TO postgres;

--
-- Name: data_vouchers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.data_vouchers_id_seq OWNED BY public.data_vouchers.id;


--
-- Name: global_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.global_settings (
    id integer NOT NULL,
    nama_operator character varying(255),
    email_operator character varying(255),
    no_telp_operator character varying(255),
    no_fax_operator character varying(255),
    alamat_operator character varying(255),
    nama_lokasi character varying(255),
    email_lokasi character varying(255),
    no_telp_lokasi character varying(255),
    no_fax_lokasi character varying(255),
    alamat_lokasi character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.global_settings OWNER TO postgres;

--
-- Name: global_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.global_settings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER SEQUENCE public.global_settings_id_seq OWNER TO postgres;

--
-- Name: global_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.global_settings_id_seq OWNED BY public.global_settings.id;


--
-- Name: kendaraans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kendaraans (
    id integer NOT NULL,
    nama_kendaraan character varying(255),
    status boolean,
    user_id integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    tipe_kendaraan_id integer
);


ALTER TABLE public.kendaraans OWNER TO postgres;

--
-- Name: kendaraans_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.kendaraans_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER SEQUENCE public.kendaraans_id_seq OWNER TO postgres;

--
-- Name: kendaraans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.kendaraans_id_seq OWNED BY public.kendaraans.id;


--
-- Name: level_akses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.level_akses (
    id integer NOT NULL,
    nama character varying(255),
    akses_menu jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.level_akses OWNER TO postgres;

--
-- Name: level_akses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.level_akses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER SEQUENCE public.level_akses_id_seq OWNER TO postgres;

--
-- Name: level_akses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.level_akses_id_seq OWNED BY public.level_akses.id;


--
-- Name: parameters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parameters (
    id integer NOT NULL,
    nama character varying(255),
    nilai character varying(255),
    keterangan character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.parameters OWNER TO postgres;

--
-- Name: parameters_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.parameters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER SEQUENCE public.parameters_id_seq OWNER TO postgres;

--
-- Name: parameters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.parameters_id_seq OWNED BY public.parameters.id;


--
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    id integer NOT NULL,
    jenis_payment character varying(255),
    status boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER SEQUENCE public.payments_id_seq OWNER TO postgres;

--
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- Name: permasalahan_atau_perbaikans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permasalahan_atau_perbaikans (
    id integer NOT NULL,
    judul_permasalahan character varying(255),
    tanggal_permasalahan character varying(255),
    kategori_permasalahan public.enum_permasalahan_atau_perbaikans_kategori_permasalahan,
    pos_id integer,
    hardware_atau_alat character varying(255),
    penyebab_permasalahan text,
    keterangan_permasalahan text,
    nama_pelapor character varying(255),
    status_permasalahan public.enum_permasalahan_atau_perbaikans_status_permasalahan,
    tanggal_perbaikan character varying(255),
    status_perbaikan public.enum_permasalahan_atau_perbaikans_status_perbaikan,
    penanganan text,
    keterangan_penanganan text,
    nama_yang_menangani character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    jenis_perbaikan character varying(255)
);


ALTER TABLE public.permasalahan_atau_perbaikans OWNER TO postgres;

--
-- Name: permasalahan_atau_perbaikans_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.permasalahan_atau_perbaikans_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER SEQUENCE public.permasalahan_atau_perbaikans_id_seq OWNER TO postgres;

--
-- Name: permasalahan_atau_perbaikans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permasalahan_atau_perbaikans_id_seq OWNED BY public.permasalahan_atau_perbaikans.id;


--
-- Name: perusahaans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.perusahaans (
    id integer NOT NULL,
    nama character varying(255),
    kontak character varying(255),
    status boolean,
    user_id integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    jenis_perusahaan public.enum_perusahaans_jenis_perusahaan
);


ALTER TABLE public.perusahaans OWNER TO postgres;

--
-- Name: perusahaans_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.perusahaans_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER SEQUENCE public.perusahaans_id_seq OWNER TO postgres;

--
-- Name: perusahaans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.perusahaans_id_seq OWNED BY public.perusahaans.id;


--
-- Name: pos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pos (
    id integer NOT NULL,
    kode character varying(255),
    keterangan character varying(255),
    tipe_pos public.enum_pos_tipe_pos,
    tipe_manless public.enum_pos_tipe_manless,
    tipe_kendaraan public.enum_pos_tipe_kendaraan,
    kamera_1 boolean,
    kamera_2 boolean,
    nama_printer public.enum_pos_nama_printer,
    nama_interface public.enum_pos_nama_interface,
    com_port character varying(255),
    synchronize character varying(255),
    user_id integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    otorisasi boolean
);


ALTER TABLE public.pos OWNER TO postgres;

--
-- Name: pos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER SEQUENCE public.pos_id_seq OWNER TO postgres;

--
-- Name: pos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pos_id_seq OWNED BY public.pos.id;


--
-- Name: produk_members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produk_members (
    id integer NOT NULL,
    nama character varying(255),
    list_id_kendaraan character varying(255)[],
    max_kendaraan integer,
    tarif integer NOT NULL,
    biaya_kartu integer NOT NULL,
    biaya_ganti_nopol integer NOT NULL,
    status boolean,
    user_id integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    periode daterange
);


ALTER TABLE public.produk_members OWNER TO postgres;

--
-- Name: produk_members_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.produk_members_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER SEQUENCE public.produk_members_id_seq OWNER TO postgres;

--
-- Name: produk_members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.produk_members_id_seq OWNED BY public.produk_members.id;


--
-- Name: produk_vouchers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produk_vouchers (
    id integer NOT NULL,
    nama character varying(255),
    periode_value integer,
    periode_unit public.enum_produk_vouchers_periode_unit,
    list_id_kendaraan character varying(255)[],
    tarif integer NOT NULL,
    model_pembayaran public.enum_produk_vouchers_model_pembayaran,
    metode_verifikasi public.enum_produk_vouchers_metode_verifikasi,
    status boolean,
    user_id integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.produk_vouchers OWNER TO postgres;

--
-- Name: produk_vouchers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.produk_vouchers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER SEQUENCE public.produk_vouchers_id_seq OWNER TO postgres;

--
-- Name: produk_vouchers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.produk_vouchers_id_seq OWNED BY public.produk_vouchers.id;


--
-- Name: riwayat_transaksi_ganti_nopols; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.riwayat_transaksi_ganti_nopols (
    id integer NOT NULL,
    tgl_transaksi timestamp with time zone,
    nomor_polisi_lama character varying(255),
    nomor_polisi_baru character varying(255),
    tarif integer NOT NULL,
    keterangan character varying(255),
    user_id integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.riwayat_transaksi_ganti_nopols OWNER TO postgres;

--
-- Name: riwayat_transaksi_ganti_nopols_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.riwayat_transaksi_ganti_nopols_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER SEQUENCE public.riwayat_transaksi_ganti_nopols_id_seq OWNER TO postgres;

--
-- Name: riwayat_transaksi_ganti_nopols_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.riwayat_transaksi_ganti_nopols_id_seq OWNED BY public.riwayat_transaksi_ganti_nopols.id;


--
-- Name: riwayat_transaksi_kartu_members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.riwayat_transaksi_kartu_members (
    id integer NOT NULL,
    tgl_transaksi timestamp with time zone,
    no_kartu character varying(255),
    tarif integer NOT NULL,
    keterangan character varying(255),
    user_id integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.riwayat_transaksi_kartu_members OWNER TO postgres;

--
-- Name: riwayat_transaksi_kartu_members_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.riwayat_transaksi_kartu_members_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER SEQUENCE public.riwayat_transaksi_kartu_members_id_seq OWNER TO postgres;

--
-- Name: riwayat_transaksi_kartu_members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.riwayat_transaksi_kartu_members_id_seq OWNED BY public.riwayat_transaksi_kartu_members.id;


--
-- Name: riwayat_transaksi_members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.riwayat_transaksi_members (
    id integer NOT NULL,
    tgl_transaksi timestamp with time zone,
    produk_id integer,
    tarif integer NOT NULL,
    masa_aktif character varying(255)[],
    user_id integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.riwayat_transaksi_members OWNER TO postgres;

--
-- Name: riwayat_transaksi_members_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.riwayat_transaksi_members_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER SEQUENCE public.riwayat_transaksi_members_id_seq OWNER TO postgres;

--
-- Name: riwayat_transaksi_members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.riwayat_transaksi_members_id_seq OWNED BY public.riwayat_transaksi_members.id;


--
-- Name: shifts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shifts (
    id integer NOT NULL,
    nama_shift character varying(255),
    awal_shift time without time zone,
    akhir_shift time without time zone,
    status boolean,
    user_id integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.shifts OWNER TO postgres;

--
-- Name: shifts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shifts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER SEQUENCE public.shifts_id_seq OWNER TO postgres;

--
-- Name: shifts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shifts_id_seq OWNED BY public.shifts.id;


--
-- Name: tarif_dendas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tarif_dendas (
    id integer NOT NULL,
    kendaraan_id integer NOT NULL,
    denda_tiket integer NOT NULL,
    denda_stnk integer NOT NULL,
    denda_member boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    status boolean
);


ALTER TABLE public.tarif_dendas OWNER TO postgres;

--
-- Name: tarif_dendas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tarif_dendas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER SEQUENCE public.tarif_dendas_id_seq OWNER TO postgres;

--
-- Name: tarif_dendas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tarif_dendas_id_seq OWNED BY public.tarif_dendas.id;


--
-- Name: tarif_parkirs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tarif_parkirs (
    id integer NOT NULL,
    kendaraan_id integer,
    grace_period integer,
    tarif_grace_period integer,
    rotasi_pertama integer,
    tarif_rotasi_pertama integer,
    rotasi_kedua integer,
    tarif_rotasi_kedua integer,
    rotasi_ketiga integer,
    tarif_rotasi_ketiga integer,
    tarif_maksimal integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.tarif_parkirs OWNER TO postgres;

--
-- Name: tarif_parkirs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tarif_parkirs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER SEQUENCE public.tarif_parkirs_id_seq OWNER TO postgres;

--
-- Name: tarif_parkirs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tarif_parkirs_id_seq OWNED BY public.tarif_parkirs.id;


--
-- Name: tipe_kendaraans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipe_kendaraans (
    id integer NOT NULL,
    tipe_kendaraan character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.tipe_kendaraans OWNER TO postgres;

--
-- Name: tipe_kendaraans_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipe_kendaraans_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipe_kendaraans_id_seq OWNER TO postgres;

--
-- Name: tipe_kendaraans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipe_kendaraans_id_seq OWNED BY public.tipe_kendaraans.id;


--
-- Name: transaksi_manual_mixes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaksi_manual_mixes (
    id integer NOT NULL,
    is_manual boolean,
    tanggal_masuk timestamp with time zone,
    pintu_masuk_id integer,
    no_tiket_atau_tiket_manual character varying(255),
    kendaraan_id integer,
    nomor_polisi character varying(255),
    pintu_keluar_id integer,
    tanggal_keluar timestamp with time zone,
    petugas_id integer,
    shift_id integer,
    denda boolean,
    is_active boolean,
    parkir character varying(255),
    jumlah_denda_stnk integer NOT NULL,
    jumlah_denda_tiket integer NOT NULL,
    "interval" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.transaksi_manual_mixes OWNER TO postgres;

--
-- Name: transaksi_manual_mixes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transaksi_manual_mixes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER SEQUENCE public.transaksi_manual_mixes_id_seq OWNER TO postgres;

--
-- Name: transaksi_manual_mixes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transaksi_manual_mixes_id_seq OWNED BY public.transaksi_manual_mixes.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    nama character varying(255),
    jenis_kelamin public.enum_users_jenis_kelamin,
    no_hp character varying(255),
    alamat_lengkap character varying(255),
    username character varying(255),
    password character varying(255),
    level_akses_id integer,
    status boolean,
    added_by integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    perusahaan_id integer
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: data_members id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_members ALTER COLUMN id SET DEFAULT nextval('public.data_members_id_seq'::regclass);


--
-- Name: data_nomor_polisis id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_nomor_polisis ALTER COLUMN id SET DEFAULT nextval('public.data_nomor_polisis_id_seq'::regclass);


--
-- Name: data_vouchers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_vouchers ALTER COLUMN id SET DEFAULT nextval('public.data_vouchers_id_seq'::regclass);


--
-- Name: global_settings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.global_settings ALTER COLUMN id SET DEFAULT nextval('public.global_settings_id_seq'::regclass);


--
-- Name: kendaraans id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kendaraans ALTER COLUMN id SET DEFAULT nextval('public.kendaraans_id_seq'::regclass);


--
-- Name: level_akses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.level_akses ALTER COLUMN id SET DEFAULT nextval('public.level_akses_id_seq'::regclass);


--
-- Name: parameters id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parameters ALTER COLUMN id SET DEFAULT nextval('public.parameters_id_seq'::regclass);


--
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- Name: permasalahan_atau_perbaikans id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permasalahan_atau_perbaikans ALTER COLUMN id SET DEFAULT nextval('public.permasalahan_atau_perbaikans_id_seq'::regclass);


--
-- Name: perusahaans id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perusahaans ALTER COLUMN id SET DEFAULT nextval('public.perusahaans_id_seq'::regclass);


--
-- Name: pos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pos ALTER COLUMN id SET DEFAULT nextval('public.pos_id_seq'::regclass);


--
-- Name: produk_members id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produk_members ALTER COLUMN id SET DEFAULT nextval('public.produk_members_id_seq'::regclass);


--
-- Name: produk_vouchers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produk_vouchers ALTER COLUMN id SET DEFAULT nextval('public.produk_vouchers_id_seq'::regclass);


--
-- Name: riwayat_transaksi_ganti_nopols id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_transaksi_ganti_nopols ALTER COLUMN id SET DEFAULT nextval('public.riwayat_transaksi_ganti_nopols_id_seq'::regclass);


--
-- Name: riwayat_transaksi_kartu_members id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_transaksi_kartu_members ALTER COLUMN id SET DEFAULT nextval('public.riwayat_transaksi_kartu_members_id_seq'::regclass);


--
-- Name: riwayat_transaksi_members id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_transaksi_members ALTER COLUMN id SET DEFAULT nextval('public.riwayat_transaksi_members_id_seq'::regclass);


--
-- Name: shifts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shifts ALTER COLUMN id SET DEFAULT nextval('public.shifts_id_seq'::regclass);


--
-- Name: tarif_dendas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tarif_dendas ALTER COLUMN id SET DEFAULT nextval('public.tarif_dendas_id_seq'::regclass);


--
-- Name: tarif_parkirs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tarif_parkirs ALTER COLUMN id SET DEFAULT nextval('public.tarif_parkirs_id_seq'::regclass);


--
-- Name: tipe_kendaraans id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipe_kendaraans ALTER COLUMN id SET DEFAULT nextval('public.tipe_kendaraans_id_seq'::regclass);


--
-- Name: transaksi_manual_mixes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaksi_manual_mixes ALTER COLUMN id SET DEFAULT nextval('public.transaksi_manual_mixes_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: data_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.data_members (id, nama, no_hp, perusahaan_id, akses_tiket, akses_kartu, no_kartu, tgl_input, produk_id, tarif, biaya_member, biaya_kartu, periode, user_id, "createdAt", "updatedAt") FROM stdin;
6	Ahmad Surya	081234567890	1	t	f	1234567890	2025-06-02 07:00:00+07	2	50000	150000	20000	[2025-06-01,2025-12-01)	2	2025-06-02 20:48:16.123+07	2025-06-02 20:48:16.123+07
7	Ahmad Surya	081234567890	1	t	f	1234567890	2025-06-02 07:00:00+07	2	50000	150000	20000	[2025-06-01,2025-12-01)	2	2025-06-02 20:48:16.951+07	2025-06-02 20:48:16.951+07
8	Ahmad Surya	081234567890	1	t	f	1234567890	2025-06-02 07:00:00+07	2	50000	150000	20000	[2025-06-01,2025-12-01)	2	2025-06-02 20:48:18.477+07	2025-06-02 20:48:18.477+07
9	Ahmad Surya	081234567890	1	t	f	1234567890	2025-06-02 07:00:00+07	2	50000	150000	20000	[2025-06-01,2025-12-01)	2	2025-06-02 20:48:19.173+07	2025-06-02 20:48:19.173+07
11	Ahmad Surya	081234567890	1	t	f	1234567890	2025-06-02 07:00:00+07	2	50000	150000	20000	[2025-06-01,2025-12-01)	2	2025-06-03 06:41:22.845+07	2025-06-03 06:41:22.845+07
12	Ahmad Surya	081234567890	1	t	f	1234567890	2025-06-02 07:00:00+07	2	50000	150000	20000	[2025-06-01,2025-12-01)	2	2025-06-03 06:42:27.059+07	2025-06-03 06:42:27.059+07
13	Ahmad Surya	081234567890	1	t	f	1234567890	2025-06-02 07:00:00+07	2	50000	150000	20000	[2025-06-01,2025-12-01)	2	2025-06-03 06:42:34.251+07	2025-06-03 06:42:34.251+07
\.


--
-- Data for Name: data_nomor_polisis; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.data_nomor_polisis (id, data_member_id, kendaraan_id, nomor_polisi, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: data_vouchers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.data_vouchers (id, produk_voucher_id, periode_value, periode_unit, periode, tarif, model_bayar, verifikasi, no_tiket_atau_nopol, kendaraan_id, keterangan, "createdAt", "updatedAt") FROM stdin;
42	1	30	Hari	[2025-06-01,2025-06-30)	15000	Check In	Nopol	B1234XYZ	2	Voucher 	2025-06-03 11:14:20.99+07	2025-06-03 11:14:20.99+07
43	1	30	Hari	[2025-06-01,2025-06-30)	15000	Check In	Nopol	B1234XYZ	2	Voucher 	2025-06-03 11:14:23.085+07	2025-06-03 11:14:23.085+07
44	1	30	Hari	[2025-06-01,2025-06-30)	15000	Check In	Nopol	B1234XYZ	2	Voucher 	2025-06-03 11:14:24.8+07	2025-06-03 11:14:24.8+07
45	1	30	Hari	[2025-06-01,2025-06-30)	15000	Check In	Nopol	B1234XYZ	2	Voucher 	2025-06-03 11:14:26.685+07	2025-06-03 11:14:26.685+07
46	1	30	Hari	[2025-06-01,2025-06-30)	15000	Check In	Nopol	B1234XYZ	2	Voucher 	2025-06-03 11:14:28.388+07	2025-06-03 11:14:28.388+07
47	1	30	Hari	[2025-06-01,2025-06-30)	15000	Check In	Nopol	B1234XYZ	2	Voucher 	2025-06-03 11:14:30.043+07	2025-06-03 11:14:30.043+07
48	1	30	Hari	[2025-06-01,2025-06-30)	15000	Check In	Nopol	B1234XYZ	2	Voucher 	2025-06-03 11:14:31.897+07	2025-06-03 11:14:31.897+07
\.


--
-- Data for Name: global_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.global_settings (id, nama_operator, email_operator, no_telp_operator, no_fax_operator, alamat_operator, nama_lokasi, email_lokasi, no_telp_lokasi, no_fax_lokasi, alamat_lokasi, "createdAt", "updatedAt") FROM stdin;
1	ABC PARKING	abc@gmail.com	08121324343	08342342423	Pekuncen, Banyumas	Pasar Megah Jaya	pasarmegahjaya@gmail.com	098768900232	08754345678	Pekuncen, Banyumas	2025-05-16 09:35:31.325+07	2025-05-16 09:35:31.325+07
\.


--
-- Data for Name: kendaraans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kendaraans (id, nama_kendaraan, status, user_id, "createdAt", "updatedAt", tipe_kendaraan_id) FROM stdin;
1	Avanza	t	1	2025-05-16 09:33:14.07+07	2025-05-16 09:33:14.07+07	\N
2	Xenia	t	1	2025-05-16 10:20:45.304+07	2025-05-16 10:20:45.304+07	\N
3	Truk	t	2	2025-06-03 10:02:23.203+07	2025-06-03 10:02:23.203+07	\N
16	ii	f	2	2025-06-03 14:26:27.212+07	2025-06-03 14:26:27.212+07	\N
17	OP	f	2	2025-06-03 14:26:41.488+07	2025-06-03 14:26:41.488+07	\N
18	UI	f	2	2025-06-03 14:32:30.783+07	2025-06-03 14:32:30.783+07	\N
\.


--
-- Data for Name: level_akses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.level_akses (id, nama, akses_menu, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: parameters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.parameters (id, nama, nilai, keterangan, "createdAt", "updatedAt") FROM stdin;
1	Bayar Member Secara Berjenjang	false	Pembayaran member secara berjenjang ketika keluar	2025-05-16 09:35:20.05+07	2025-05-16 09:35:20.05+07
2	Jam Operasional	08:00 - 20:00	Waktu operasional harian	2025-06-03 20:42:52.272+07	2025-06-03 20:42:52.272+07
3	Biaya Parkir Motor	2000	Tarif parkir untuk kendaraan roda dua	2025-06-03 20:43:26.594+07	2025-06-03 20:43:26.594+07
4	Biaya Parkir Mobil	5000	Tarif parkir untuk kendaraan roda empat	2025-06-03 20:43:37.987+07	2025-06-03 20:43:37.987+07
5	Batas Durasi Gratis	15	Menit gratis sebelum mulai dihitung tarif	2025-06-03 20:43:48.53+07	2025-06-03 20:43:48.53+07
6	Mode Aplikasi	Produksi	Mode saat ini: Produksi atau Pengujian	2025-06-03 20:44:02.003+07	2025-06-03 20:44:02.003+07
7	Biaya Kehilangan Tiket	10000	Denda untuk kehilangan tiket parkir	2025-06-03 20:44:11.573+07	2025-06-03 20:44:11.573+07
8	Versi Sistem	1.0.3	Versi terbaru sistem parkir	2025-06-03 20:44:20.731+07	2025-06-03 20:44:20.731+07
9	Max Kendaraan Member	3	Jumlah maksimal kendaraan per member	2025-06-03 20:44:40.744+07	2025-06-03 20:44:40.744+07
10	Biaya Denda STNK	25000	Denda jika STNK tidak ditunjukkan	2025-06-03 20:44:52.788+07	2025-06-03 20:44:52.788+07
11	Biaya Denda STNK	25000	Denda jika STNK tidak ditunjukkan	2025-06-03 20:50:07.889+07	2025-06-03 20:50:07.889+07
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (id, jenis_payment, status, "createdAt", "updatedAt") FROM stdin;
1	Member	t	2025-05-16 09:35:51.936+07	2025-05-16 09:35:51.936+07
\.


--
-- Data for Name: permasalahan_atau_perbaikans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permasalahan_atau_perbaikans (id, judul_permasalahan, tanggal_permasalahan, kategori_permasalahan, pos_id, hardware_atau_alat, penyebab_permasalahan, keterangan_permasalahan, nama_pelapor, status_permasalahan, tanggal_perbaikan, status_perbaikan, penanganan, keterangan_penanganan, nama_yang_menangani, "createdAt", "updatedAt", jenis_perbaikan) FROM stdin;
1	Error Barrier Gate	05-31-2021	Sistem	1	Hardware	Ada short dalam kelistrikan	Segera melakukan perbaikan	Fahmi	Pending	31-05-2004	Pending				2025-05-16 09:38:02.569+07	2025-05-16 09:38:59.467+07	\N
2	Printer Tiket Tidak Berfungsi	2025-06-04	Hardware/Alat	1	Printer Tiket	Kabel daya longgar	Tidak bisa mencetak tiket saat kendaraan masuk	Andi	Pending		Pending				2025-06-04 09:10:27.758+07	2025-06-04 09:10:27.758+07	
4	Operator Tidak Paham Prosedur	2025-06-01	SDM	1	-	Kurangnya pelatihan	Operator tidak tahu cara input kendaraan keluar	Sari	Done	2025-06-02	Done	Dilakukan pelatihan tambahan	Sudah selesai	Supervisor	2025-06-04 09:11:19.076+07	2025-06-04 09:11:19.076+07	Pelatihan Ulang
9	Printer Tiket Tidak Berfungsi	2025-06-04	Hardware/Alat	1	Printer Tiket	Kabel daya longgar	Tidak bisa mencetak tiket saat kendaraan masuk	Andi	Pending		Pending				2025-06-04 09:12:16.653+07	2025-06-04 09:12:16.653+07	
11	Printer Tiket Tidak Berfungsi	2025-06-04	Hardware/Alat	1	Printer Tiket	Kabel daya longgar	Tidak bisa mencetak tiket saat kendaraan masuk	Andi	Pending		Pending				2025-06-04 09:13:06.983+07	2025-06-04 09:13:06.983+07	
12	Printer Tiket Tidak Berfungsi	2025-06-04	Hardware/Alat	1	Printer Tiket	Kabel daya longgar	Tidak bisa mencetak tiket saat kendaraan masuk	Andi	Pending		Pending				2025-06-04 09:13:08.709+07	2025-06-04 09:13:08.709+07	
13	Printer Tiket Tidak Berfungsi	2025-06-04	Hardware/Alat	1	Printer Tiket	Kabel daya longgar	Tidak bisa mencetak tiket saat kendaraan masuk	Andi	Pending		Pending				2025-06-04 09:13:10.357+07	2025-06-04 09:13:10.357+07	
14	Printer Tiket Tidak Berfungsi	2025-06-04	Hardware/Alat	1	Printer Tiket	Kabel daya longgar	Tidak bisa mencetak tiket saat kendaraan masuk	Andi	Pending		Pending				2025-06-04 09:13:12.227+07	2025-06-04 09:13:12.227+07	
15	Printer Tiket Tidak Berfungsi	2025-06-04	Hardware/Alat	1	Printer Tiket	Kabel daya longgar	Tidak bisa mencetak tiket saat kendaraan masuk	Andi	Pending		Pending				2025-06-04 09:13:13.997+07	2025-06-04 09:13:13.997+07	
16	Printer Tiket Tidak Berfungsi	2025-06-04	Hardware/Alat	1	Printer Tiket	Kabel daya longgar	Tidak bisa mencetak tiket saat kendaraan masuk	Andi	Pending		Pending				2025-06-04 09:13:15.627+07	2025-06-04 09:13:15.627+07	
17	Printer Tiket Tidak Berfungsi	2025-06-04	Hardware/Alat	1	Printer Tiket	Kabel daya longgar	Tidak bisa mencetak tiket saat kendaraan masuk	Andi	Pending		Pending				2025-06-04 09:13:17.178+07	2025-06-04 09:13:17.178+07	
18	Printer Tiket Tidak Berfungsi	2025-06-04	Hardware/Alat	1	Printer Tiket	Kabel daya longgar	Tidak bisa mencetak tiket saat kendaraan masuk	Andi	Pending		Pending				2025-06-04 09:13:18.698+07	2025-06-04 09:13:18.698+07	
19	Printer Tiket Tidak Berfungsi	2025-06-04	Hardware/Alat	1	Printer Tiket	Kabel daya longgar	Tidak bisa mencetak tiket saat kendaraan masuk	Andi	Pending		Pending				2025-06-04 09:13:20.441+07	2025-06-04 09:13:20.441+07	
20	Printer Tiket Tidak Berfungsi	2025-06-04	Hardware/Alat	1	Printer Tiket	Kabel daya longgar	Tidak bisa mencetak tiket saat kendaraan masuk	Andi	Pending		Pending				2025-06-04 09:13:21.944+07	2025-06-04 09:13:21.944+07	
22	Printer Tiket Tidak Berfungsi	2025-06-04	Hardware/Alat	1	Printer Tiket	Kabel daya longgar	Tidak bisa mencetak tiket saat kendaraan masuk	Andi	Pending		Pending				2025-06-04 09:13:25.425+07	2025-06-04 09:13:25.425+07	
23	Printer Tiket Tidak Berfungsi	2025-06-04	Hardware/Alat	1	Printer Tiket	Kabel daya longgar	Tidak bisa mencetak tiket saat kendaraan masuk	Andi	Pending		Pending				2025-06-04 09:13:27.207+07	2025-06-04 09:13:27.207+07	
24	Printer Tiket Tidak Berfungsi	2025-06-04	Hardware/Alat	1	Printer Tiket	Kabel daya longgar	Tidak bisa mencetak tiket saat kendaraan masuk	Andi	Pending		Pending				2025-06-04 09:13:28.937+07	2025-06-04 09:13:28.937+07	
25	Printer Tiket Tidak Berfungsi	2025-06-04	Hardware/Alat	1	Printer Tiket	Kabel daya longgar	Tidak bisa mencetak tiket saat kendaraan masuk	Andi	Pending		Pending				2025-06-04 09:13:30.593+07	2025-06-04 09:13:30.593+07	
\.


--
-- Data for Name: perusahaans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.perusahaans (id, nama, kontak, status, user_id, "createdAt", "updatedAt", jenis_perusahaan) FROM stdin;
1	Evolusi Sistem Digital	08235345345	t	1	2025-05-16 09:33:40.296+07	2025-05-16 09:33:40.296+07	\N
3	Graha Sejahtera	081234567890	t	1	2025-05-29 06:25:49.384+07	2025-05-29 06:25:49.384+07	Pemilik Gedung
4	Smart Office Solutions	085678901234	t	2	2025-05-29 06:26:39.662+07	2025-05-29 06:26:39.662+07	Tenant
7	Smart Office Solutions	085678901234	t	2	2025-05-29 06:27:06.656+07	2025-05-29 06:27:06.656+07	Tenant
8	Mega Proyek Indonesia	082345678901	f	2	2025-05-29 06:27:30.867+07	2025-05-29 06:27:30.867+07	Developer
10	Sentral Properti Mandiri	087654321098	t	2	2025-05-29 06:27:53.019+07	2025-05-29 06:27:53.019+07	Pemilik Gedung
11	Alpha Space Rent	081223344556	t	2	2025-05-29 06:28:15.963+07	2025-05-29 06:28:15.963+07	Tenant
12	Innovative Construction	082198765432	f	2	2025-05-29 06:28:28.947+07	2025-05-29 06:28:28.947+07	Developer
13	Menara Prima	083345678912	t	2	2025-05-29 06:28:49.034+07	2025-05-29 06:28:49.034+07	Pemilik Gedung
14	Sentral Medika	081234567892	t	2	2025-05-29 06:29:09.986+07	2025-05-29 06:29:09.986+07	Pemilik Gedung
15	Sehat Bersama Clinic	081234567893	t	2	2025-05-29 06:29:24.402+07	2025-05-29 06:29:24.402+07	Tenant
16	Warung Nusantara	081234567894	f	2	2025-05-29 06:29:39.855+07	2025-05-29 06:29:39.855+07	Developer
17	MAll Nusantara	081234567894	f	2	2025-05-29 09:06:48.028+07	2025-05-29 09:06:48.028+07	Pemilik Gedung
18	MAll Nusantara 2	081234567894	f	2	2025-05-29 09:06:59.756+07	2025-05-29 09:06:59.756+07	Pemilik Gedung
19	MAll Nusantara 3	081234567894	f	2	2025-05-29 09:07:04.381+07	2025-05-29 09:07:04.381+07	Pemilik Gedung
20	MAll Nusantara 4	081234567894	f	2	2025-05-29 09:07:09.813+07	2025-05-29 09:07:09.813+07	Pemilik Gedung
21	MAll Nusantara 5	081234567894	f	2	2025-05-29 09:07:14.58+07	2025-05-29 09:07:14.58+07	Pemilik Gedung
22	MAll Nusantara 6	081234567894	f	2	2025-05-29 09:07:19.743+07	2025-05-29 09:07:19.743+07	Pemilik Gedung
23	MAll Nusantara 7	081234567894	f	2	2025-05-29 09:07:26.646+07	2025-05-29 09:07:26.646+07	Pemilik Gedung
24	MAll Nusantara 8	081234567894	f	2	2025-05-29 09:07:32.485+07	2025-05-29 09:07:32.485+07	Pemilik Gedung
25	MAll Nusantara 9	081234567894	f	2	2025-05-29 09:07:37.213+07	2025-05-29 09:07:37.213+07	Pemilik Gedung
26	MAll Nusantara 10	081234567894	f	2	2025-05-29 09:07:42.483+07	2025-05-29 09:07:42.483+07	Pemilik Gedung
27	MAll Nusantara 11	081234567894	f	2	2025-05-29 09:07:50.077+07	2025-05-29 09:07:50.077+07	Pemilik Gedung
28	MAll Nusantara 12	081234567894	f	2	2025-05-29 09:08:01.781+07	2025-05-29 09:08:01.781+07	Pemilik Gedung
29	MAll Nusantara 13	081234567894	f	2	2025-05-29 09:08:06.293+07	2025-05-29 09:08:06.293+07	Pemilik Gedung
30	MAll Nusantara 14	081234567894	f	2	2025-05-29 09:27:14.812+07	2025-05-29 09:27:14.812+07	Pemilik Gedung
31	MAll Nusantara 15	081234567894	f	2	2025-05-29 09:27:18.807+07	2025-05-29 09:27:18.807+07	Pemilik Gedung
32	MAll Nusantara 16	081234567894	f	2	2025-05-29 09:27:22.847+07	2025-05-29 09:27:22.847+07	Pemilik Gedung
33	MAll Nusantara 17	081234567894	f	2	2025-05-29 09:27:27.116+07	2025-05-29 09:27:27.116+07	Pemilik Gedung
34	MAll Nusantara 18	081234567894	f	2	2025-05-29 09:27:31.825+07	2025-05-29 09:27:31.825+07	Pemilik Gedung
35	MAll Nusantara 19	081234567894	f	2	2025-05-29 09:27:49.455+07	2025-05-29 09:27:49.455+07	Pemilik Gedung
36	MAll Nusantara 20	081234567894	f	2	2025-05-29 09:27:53.87+07	2025-05-29 09:27:53.87+07	Pemilik Gedung
37	MAll Nusantara 21	081234567894	f	2	2025-05-29 09:27:58.718+07	2025-05-29 09:27:58.718+07	Pemilik Gedung
39	MAll Nusantara 23	081234567894	f	2	2025-05-29 09:29:19.973+07	2025-05-29 09:29:19.973+07	Pemilik Gedung
47	SMKN 3 Jombang	\N	\N	\N	2025-05-29 10:16:55.842+07	2025-05-29 10:16:55.842+07	\N
48	ZaMarket	\N	\N	\N	2025-05-29 10:17:48.055+07	2025-05-29 10:17:48.055+07	\N
56	PAsar Legi	081234567890	t	1	2025-05-29 12:33:39.089+07	2025-05-29 12:33:39.089+07	Pemilik Gedung
57	Pasar Pon	01189	f	2	2025-05-29 19:26:54.948+07	2025-05-29 19:26:54.948+07	Pemilik Gedung
58	RS Adil	099009	f	2	2025-05-29 19:27:46.939+07	2025-05-29 19:27:46.939+07	Pemilik Gedung
59	IO	009	f	2	2025-06-03 11:18:18.178+07	2025-06-03 11:18:18.178+07	Developer
\.


--
-- Data for Name: pos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pos (id, kode, keterangan, tipe_pos, tipe_manless, tipe_kendaraan, kamera_1, kamera_2, nama_printer, nama_interface, com_port, synchronize, user_id, "createdAt", "updatedAt", otorisasi) FROM stdin;
1	P1	Pos 1	In	Loop 1 with Button	All	t	t	Epson TM-T81 Receipt	BGI	1	1	1	2025-05-16 09:33:10.774+07	2025-05-16 09:33:10.774+07	\N
18	jllk	tuyy	Out	Loop 1 with Button and Feedback	Mobil	\N	\N	Epson TM-U220 Receipt	\N	9090	78	2	2025-05-30 06:47:22.142+07	2025-05-30 06:47:22.142+07	t
21	jllk	tuyy	Out	Loop 1 with Button and Feedback	Mobil	f	t	Epson TM-U220 Receipt	SMART PARKING	9090	78	2	2025-05-30 06:49:16.755+07	2025-05-30 06:49:16.755+07	f
22	jllk	tuyy	Out	Loop 1 with Button and Feedback	Mobil	t	f	Epson TM-U220 Receipt	SMART PARKING	9090	78	2	2025-05-30 06:49:34.093+07	2025-05-30 06:49:34.093+07	f
23	jllk	tuyy	Out	Loop 1 with Button and Feedback	Mobil	\N	\N	Epson TM-U220 Receipt	\N	9090	78	2	2025-05-30 06:57:27.624+07	2025-05-30 06:57:27.624+07	t
24	jllk	tuyy	Out	Loop 1 with Button and Feedback	Mobil	\N	\N	Epson TM-U220 Receipt	\N	9090	78	2	2025-05-30 07:03:29.532+07	2025-05-30 07:03:29.532+07	t
25	jllk	tuyy	Out	Loop 1 with Button and Feedback	Mobil	\N	\N	Epson TM-U220 Receipt	SMART PARKING	9090	78	2	2025-05-30 07:04:20.532+07	2025-05-30 07:04:20.532+07	t
26	jllk	tuyy	Out	Loop 1 with Button and Feedback	Mobil	\N	\N	Epson TM-U220 Receipt	SMART PARKING	90yy90	78	2	2025-05-30 07:04:51.045+07	2025-05-30 07:04:51.045+07	t
27	jllk	tuyy	Out	Loop 1 with Button and Feedback	Mobil	\N	\N	Epson TM-U220 Receipt	\N	9090	78	2	2025-05-30 07:07:35.735+07	2025-05-30 07:07:35.735+07	t
28	jllk	tuyy	Out	Loop 1 with Button and Feedback	Mobil	\N	\N	Epson TM-U220 Receipt	SMART PARKING	9090	78	2	2025-05-30 07:08:03.057+07	2025-05-30 07:08:03.057+07	t
29	jllk	tuyy	Out	Loop 1 with Button and Feedback	Mobil	\N	\N	Epson TM-U220 Receipt	SMART PARKING	9090	78	2	2025-05-30 07:08:25.722+07	2025-05-30 07:08:25.722+07	t
30	jllk	tuyy	Out	Loop 1 with Button and Feedback	Mobil	\N	\N	Epson TM-U220 Receipt	SMART PARKING	9090	78	2	2025-05-30 07:08:55.7+07	2025-05-30 07:08:55.7+07	t
31	jllk	tuyy	Out	Loop 1 with Button and Feedback	Mobil	\N	\N	Epson TM-U220 Receipt	SMART PARKING	9090	78	2	2025-05-30 07:09:04.77+07	2025-05-30 07:09:04.77+07	t
32	jllk	tuyy	Out	Loop 1 with Button and Feedback	Mobil	\N	\N	Epson TM-U220 Receipt	SMART PARKING	9090	78	2	2025-05-30 07:09:10.445+07	2025-05-30 07:09:10.445+07	t
33	jllk	tuyy	Out	Loop 1 with Button and Feedback	Mobil	\N	\N	Epson TM-U220 Receipt	SMART PARKING	9090	78	2	2025-05-30 07:09:28.267+07	2025-05-30 07:09:28.267+07	t
34	jllk	tuyy	Out	Loop 1 with Button and Feedback	Mobil	\N	\N	Epson TM-U220 Receipt	SMART PARKING	9090	78	2	2025-05-30 07:09:50.379+07	2025-05-30 07:09:50.379+07	t
35	jllk	tuyy	Out	Loop 1 with Button and Feedback	Mobil	\N	\N	Epson TM-U220 Receipt	SMART PARKING	9090	78	2	2025-05-30 07:10:39.424+07	2025-05-30 07:10:39.424+07	t
36	llkkl	k	In	Feedback with Button	Motor	t	f	Epson TM-U220 Receipt	SER TELINKS	klkl	8090	2	2025-05-30 07:11:01.392+07	2025-05-30 07:11:01.392+07	t
37	jllk	tuyy	Out	Loop 1 with Button and Feedback	Mobil	\N	\N	Epson TM-T81 Receipt	SMART PARKING	9090	78	2	2025-05-30 07:12:01.306+07	2025-05-30 07:12:01.306+07	t
38	jllk	tuyy	Out	Loop 1 with Button and Feedback	Mobil	\N	\N	Epson TM-T82 Receipt	SMART PARKING	9090	78	2	2025-05-30 07:12:22.889+07	2025-05-30 07:12:22.889+07	t
39	jllk	tuyy	Out	Loop 1 with Button and Feedback	Mobil	\N	\N	Epson TM-U220 Receipt	SMART PARKING	9090	78	2	2025-05-30 07:12:36.973+07	2025-05-30 07:12:36.973+07	t
40	jllk	tuyy	Out	Loop 1 with Button and Feedback	Mobil	\N	\N	Epson TM-T81 Receipt	SMART PARKING	9090	78	2	2025-05-30 07:14:24.109+07	2025-05-30 07:14:24.109+07	t
42	llkkl	k	In	Feedback with Button	Motor	t	f	Epson TM-U220 Receipt	SER TELINKS	klkl	8090	2	2025-05-30 07:17:12.293+07	2025-05-30 07:17:12.293+07	t
43	oioioi	yuiyuy	In	Loop 1 with Button and Feedback	All	t	t	Epson TM-U220 Receipt	PAWL	9090	98	2	2025-05-30 07:28:10.603+07	2025-05-30 07:28:10.603+07	t
44	jllk	tuyy	Out	Loop 1 with Button and Feedback	Mobil	\N	\N	Epson TM-T81 Receipt	USB TELINKS	9090	78	2	2025-05-30 07:28:58.288+07	2025-05-30 07:28:58.288+07	t
45	jllk	tuyy	Out	Loop 1 with Button and Feedback	Mobil	\N	\N	Epson TM-T81 Receipt	USB TELINKS	9090	98	2	2025-05-30 07:29:27.26+07	2025-05-30 07:29:27.26+07	t
46	opopaop	90	Out	Loop 1 with Button	Mobil	f	t	Epson TM-U220 Receipt	PAWL	990	89	2	2025-06-03 11:19:29.711+07	2025-06-03 11:19:29.711+07	t
47	W	oaoao	In	Loop 1 with Button and Feedback	Motor	t	t	Epson TM-T82 Receipt	TWS	099009	8989	2	2025-06-05 06:46:01.336+07	2025-06-05 06:46:01.336+07	t
\.


--
-- Data for Name: produk_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.produk_members (id, nama, list_id_kendaraan, max_kendaraan, tarif, biaya_kartu, biaya_ganti_nopol, status, user_id, "createdAt", "updatedAt", periode) FROM stdin;
1	Kartu Member 2	{1,1}	1	50000	50000	50000	t	1	2025-05-16 09:33:29.873+07	2025-05-16 09:33:29.873+07	\N
2	Member Silver	{AB123CD,XY567FG}	2	500000	25000	50000	t	1	2025-05-31 12:09:15.157+07	2025-05-31 12:09:15.157+07	\N
3	Member Silver	{"Avanza (Mobil)",XY567FG}	2	500000	25000	50000	t	1	2025-05-31 18:18:54.181+07	2025-05-31 18:18:54.181+07	\N
4	Member Silver	{"Avanza (Mobil)",XY567FG}	2	500000	25000	50000	t	1	2025-06-02 19:38:25.406+07	2025-06-02 19:38:25.406+07	\N
5	Member Silver	{1,2}	2	500000	25000	50000	t	1	2025-06-02 19:38:44.679+07	2025-06-02 19:38:44.679+07	\N
6	Member Silver	{1,2}	2	500000	25000	50000	t	1	2025-06-02 19:38:48.718+07	2025-06-02 19:38:48.718+07	\N
7	Member Silver	{1,2}	2	500000	25000	50000	t	1	2025-06-02 19:38:50.791+07	2025-06-02 19:38:50.791+07	\N
8	Member Silver	{1,2}	2	500000	25000	50000	t	1	2025-06-02 19:38:52.197+07	2025-06-02 19:38:52.197+07	\N
9	Member Silver	{1,2}	2	500000	25000	50000	t	1	2025-06-02 19:38:54.34+07	2025-06-02 19:38:54.34+07	\N
10	Member Silver	{1,2}	2	500000	25000	50000	t	1	2025-06-02 19:38:56.11+07	2025-06-02 19:38:56.11+07	\N
11	Member Silver	{1,2}	2	500000	25000	50000	t	1	2025-06-05 06:56:50.984+07	2025-06-05 06:56:50.984+07	\N
\.


--
-- Data for Name: produk_vouchers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.produk_vouchers (id, nama, periode_value, periode_unit, list_id_kendaraan, tarif, model_pembayaran, metode_verifikasi, status, user_id, "createdAt", "updatedAt") FROM stdin;
1	Tamu	1	Hari	{1,1}	50000	Check In	Tiket	t	1	2025-05-16 09:33:35.069+07	2025-05-16 09:33:35.069+07
6	Voucher Langganan	7	Hari	{B1234XYZ,D5678ABC}	100000	Check Out	Tiket	t	2	2025-06-03 06:21:04.981+07	2025-06-03 06:21:04.981+07
7	Voucher Langganan	7	Hari	{B1234XYZ,D5678ABC}	100000	Check Out	Tiket	t	2	2025-06-03 06:21:06.576+07	2025-06-03 06:21:06.576+07
8	Voucher Langganan	7	Hari	{B1234XYZ,D5678ABC}	100000	Check Out	Tiket	t	2	2025-06-03 06:21:07.839+07	2025-06-03 06:21:07.839+07
9	Voucher Langganan	7	Hari	{B1234XYZ,D5678ABC}	100000	Check Out	Tiket	t	2	2025-06-03 06:21:08.926+07	2025-06-03 06:21:08.926+07
10	Voucher Langganan	7	Hari	{B1234XYZ,D5678ABC}	100000	Check Out	Tiket	t	2	2025-06-03 06:21:10.17+07	2025-06-03 06:21:10.17+07
11	Voucher Langganan	7	Hari	{B1234XYZ,D5678ABC}	100000	Check Out	Tiket	t	2	2025-06-03 06:21:11.245+07	2025-06-03 06:21:11.245+07
13	Voucher Langganan	7	Hari	{B1234XYZ,D5678ABC}	100000	Check Out	Tiket	t	2	2025-06-03 06:21:13.297+07	2025-06-03 06:21:13.297+07
15	Voucher Langganan	7	Hari	{B1234XYZ,D5678ABC}	100000	Check Out	Tiket	t	2	2025-06-03 06:21:16.715+07	2025-06-03 06:21:16.715+07
\.


--
-- Data for Name: riwayat_transaksi_ganti_nopols; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.riwayat_transaksi_ganti_nopols (id, tgl_transaksi, nomor_polisi_lama, nomor_polisi_baru, tarif, keterangan, user_id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: riwayat_transaksi_kartu_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.riwayat_transaksi_kartu_members (id, tgl_transaksi, no_kartu, tarif, keterangan, user_id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: riwayat_transaksi_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.riwayat_transaksi_members (id, tgl_transaksi, produk_id, tarif, masa_aktif, user_id, "createdAt", "updatedAt") FROM stdin;
1	2025-05-16 10:29:58.363+07	1	5000	{2025-06-01,2025-06-05}	\N	2025-05-16 10:29:58.363+07	2025-05-16 10:29:58.363+07
2	2025-05-16 10:30:26.69+07	1	5000	{2025-06-01,2025-06-10}	\N	2025-05-16 10:30:26.691+07	2025-05-16 10:30:26.691+07
\.


--
-- Data for Name: shifts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shifts (id, nama_shift, awal_shift, akhir_shift, status, user_id, "createdAt", "updatedAt") FROM stdin;
1	Shift 1	08:00:00	16:00:00	t	1	2025-05-16 09:33:18.819+07	2025-05-16 09:33:18.819+07
6	Shift Pagi	07:00:00	15:00:00	t	1	2025-06-03 09:42:05.379+07	2025-06-03 09:42:05.379+07
7	Shift Pagi	07:00:00	15:00:00	t	1	2025-06-03 09:42:06.911+07	2025-06-03 09:42:06.911+07
8	Shift Pagi	07:00:00	15:00:00	t	1	2025-06-03 09:46:18.877+07	2025-06-03 09:46:18.877+07
9	Shift Pagi	07:00:00	15:00:00	t	1	2025-06-03 11:15:08.457+07	2025-06-03 11:15:08.457+07
10	Shift Pagi	07:00:00	15:00:00	t	1	2025-06-03 11:15:19.715+07	2025-06-03 11:15:19.715+07
\.


--
-- Data for Name: tarif_dendas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tarif_dendas (id, kendaraan_id, denda_tiket, denda_stnk, denda_member, "createdAt", "updatedAt", status) FROM stdin;
1	1	10000	20000	t	2025-05-16 09:35:13.101+07	2025-05-16 09:35:13.101+07	\N
2	2	5000	5000	t	2025-05-16 10:43:43.882+07	2025-05-16 10:43:43.882+07	\N
3	1	50000	75000	t	2025-06-03 17:18:17.688+07	2025-06-03 17:18:17.688+07	t
4	1	50000	75000	t	2025-06-03 17:18:27.099+07	2025-06-03 17:18:27.099+07	t
5	1	50000	75000	t	2025-06-03 17:18:28.729+07	2025-06-03 17:18:28.729+07	t
6	1	50000	75000	t	2025-06-03 17:18:30.316+07	2025-06-03 17:18:30.316+07	t
7	1	50000	75000	t	2025-06-03 17:18:32.204+07	2025-06-03 17:18:32.204+07	t
8	1	50000	95000	t	2025-06-03 17:18:37.045+07	2025-06-03 17:18:37.045+07	t
\.


--
-- Data for Name: tarif_parkirs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tarif_parkirs (id, kendaraan_id, grace_period, tarif_grace_period, rotasi_pertama, tarif_rotasi_pertama, rotasi_kedua, tarif_rotasi_kedua, rotasi_ketiga, tarif_rotasi_ketiga, tarif_maksimal, "createdAt", "updatedAt") FROM stdin;
1	1	10	1000	1	5000	1	4000	1	4000	0	2025-05-16 09:35:03.087+07	2025-05-16 09:35:03.087+07
2	2	10	1000	2	5000	3	4000	3	4000	0	2025-05-16 10:40:24.976+07	2025-05-16 10:40:24.976+07
3	1	10	0	60	3000	120	5000	180	7000	20000	2025-06-03 14:47:43.429+07	2025-06-03 14:47:43.429+07
4	1	10	0	60	3000	120	5000	180	7000	20000	2025-06-03 16:41:46.216+07	2025-06-03 16:41:46.216+07
5	1	10	0	60	3000	120	5000	180	7000	20000	2025-06-03 16:41:48.167+07	2025-06-03 16:41:48.167+07
6	1	10	0	60	3000	120	5000	180	7000	20000	2025-06-03 16:41:50.275+07	2025-06-03 16:41:50.275+07
7	1	10	0	60	3000	120	5000	180	7000	25000	2025-06-03 16:41:58.94+07	2025-06-03 16:41:58.94+07
\.


--
-- Data for Name: tipe_kendaraans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipe_kendaraans (id, tipe_kendaraan, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: transaksi_manual_mixes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaksi_manual_mixes (id, is_manual, tanggal_masuk, pintu_masuk_id, no_tiket_atau_tiket_manual, kendaraan_id, nomor_polisi, pintu_keluar_id, tanggal_keluar, petugas_id, shift_id, denda, is_active, parkir, jumlah_denda_stnk, jumlah_denda_tiket, "interval", "createdAt", "updatedAt") FROM stdin;
1	t	2025-05-04 09:00:00+07	1	ABC/21/2005	1	R2020AJ	1	2025-05-04 14:00:00+07	1	1	t	t	21000	20000	10000	5	2025-05-16 09:36:28.97+07	2025-05-16 09:36:28.97+07
2	t	2025-05-04 09:00:00+07	1	ABC/21/2005	1	R2020AJ	1	2025-05-04 10:00:00+07	1	1	t	t	5000	20000	10000	1	2025-05-16 10:37:36.541+07	2025-05-16 10:37:36.541+07
3	t	2025-05-04 09:00:00+07	1	ABC/21/2005	1	R2020AJ	1	2025-05-04 11:00:00+07	1	1	t	t	9000	20000	10000	2	2025-05-16 10:37:52.911+07	2025-05-16 10:37:52.911+07
4	t	2025-05-04 09:00:00+07	1	ABC/21/2005	1	R2020AJ	1	2025-05-04 12:00:00+07	1	1	t	t	13000	20000	10000	3	2025-05-16 10:38:17.673+07	2025-05-16 10:38:17.673+07
5	t	2025-05-04 09:00:00+07	1	ABC/21/2005	1	R2020AJ	1	2025-05-04 13:00:00+07	1	1	t	t	17000	20000	10000	4	2025-05-16 10:38:30.857+07	2025-05-16 10:38:30.857+07
6	t	2025-05-04 09:00:00+07	1	ABC/21/2005	1	R2020AJ	1	2025-05-04 13:00:00+07	1	1	t	t	17000	20000	10000	4	2025-05-16 10:40:31.213+07	2025-05-16 10:40:31.213+07
7	t	2025-05-04 09:00:00+07	1	ABC/21/2005	2	R2020AJ	1	2025-05-04 11:00:00+07	1	1	t	t	9000	5000	5000	2	2025-05-16 10:44:00.644+07	2025-05-16 10:44:00.644+07
8	t	2025-05-04 09:00:00+07	1	ABC/21/2005	2	R2020AJ	1	2025-05-04 11:00:00+07	1	1	t	t	9000	0	5000	2	2025-05-16 10:44:11.041+07	2025-05-16 10:44:11.041+07
9	t	2025-05-04 09:00:00+07	1	ABC/21/2005	2	R2020AJ	1	2025-05-04 11:00:00+07	1	1	t	t	9000	0	0	2	2025-05-16 10:44:18.136+07	2025-05-16 10:44:18.136+07
10	t	2025-05-04 09:00:00+07	1	ABC/21/2005	2	R2020AJ	1	2025-05-04 11:00:00+07	1	1	f	t	9000	0	0	2	2025-05-16 10:44:34.275+07	2025-05-16 10:44:34.275+07
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, nama, jenis_kelamin, no_hp, alamat_lengkap, username, password, level_akses_id, status, added_by, "createdAt", "updatedAt", perusahaan_id) FROM stdin;
1	Itmamul Fahmi	Laki-laki	0823234234234	Jakarta	itmamulfahmi	$argon2id$v=19$m=65536,t=3,p=4$TBw6BFh6qUD/Vr0JC38cfg$RmGO+z3VQArqZ59lVTzoHGECgwHOJW21lqbmKR6b1/o	\N	\N	\N	2025-05-16 09:32:57.49+07	2025-05-16 09:32:57.49+07	\N
2	\N	\N	\N	\N	admin2	$argon2id$v=19$m=65536,t=3,p=4$7mdwPseSIYOgbSaT4Z/mYg$YUdftr5Caq6HsCaio4GXJAYlcMPk0TsS7M6E7BwfyDo	\N	\N	\N	2025-05-26 08:19:34.128+07	2025-05-26 08:19:34.128+07	\N
\.


--
-- Name: data_members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.data_members_id_seq', 14, true);


--
-- Name: data_nomor_polisis_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.data_nomor_polisis_id_seq', 3, true);


--
-- Name: data_vouchers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.data_vouchers_id_seq', 48, true);


--
-- Name: global_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.global_settings_id_seq', 1, true);


--
-- Name: kendaraans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kendaraans_id_seq', 18, true);


--
-- Name: level_akses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.level_akses_id_seq', 1, true);


--
-- Name: parameters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.parameters_id_seq', 11, true);


--
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payments_id_seq', 2, true);


--
-- Name: permasalahan_atau_perbaikans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.permasalahan_atau_perbaikans_id_seq', 25, true);


--
-- Name: perusahaans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.perusahaans_id_seq', 59, true);


--
-- Name: pos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pos_id_seq', 47, true);


--
-- Name: produk_members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.produk_members_id_seq', 12, true);


--
-- Name: produk_vouchers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.produk_vouchers_id_seq', 15, true);


--
-- Name: riwayat_transaksi_ganti_nopols_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.riwayat_transaksi_ganti_nopols_id_seq', 1, false);


--
-- Name: riwayat_transaksi_kartu_members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.riwayat_transaksi_kartu_members_id_seq', 1, false);


--
-- Name: riwayat_transaksi_members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.riwayat_transaksi_members_id_seq', 2, true);


--
-- Name: shifts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shifts_id_seq', 10, true);


--
-- Name: tarif_dendas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tarif_dendas_id_seq', 8, true);


--
-- Name: tarif_parkirs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tarif_parkirs_id_seq', 7, true);


--
-- Name: tipe_kendaraans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipe_kendaraans_id_seq', 1, false);


--
-- Name: transaksi_manual_mixes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaksi_manual_mixes_id_seq', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 65, true);


--
-- Name: data_members data_members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_members
    ADD CONSTRAINT data_members_pkey PRIMARY KEY (id);


--
-- Name: data_nomor_polisis data_nomor_polisis_nomor_polisi_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_nomor_polisis
    ADD CONSTRAINT data_nomor_polisis_nomor_polisi_key UNIQUE (nomor_polisi);


--
-- Name: data_nomor_polisis data_nomor_polisis_nomor_polisi_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_nomor_polisis
    ADD CONSTRAINT data_nomor_polisis_nomor_polisi_key1 UNIQUE (nomor_polisi);


--
-- Name: data_nomor_polisis data_nomor_polisis_nomor_polisi_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_nomor_polisis
    ADD CONSTRAINT data_nomor_polisis_nomor_polisi_key10 UNIQUE (nomor_polisi);


--
-- Name: data_nomor_polisis data_nomor_polisis_nomor_polisi_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_nomor_polisis
    ADD CONSTRAINT data_nomor_polisis_nomor_polisi_key11 UNIQUE (nomor_polisi);


--
-- Name: data_nomor_polisis data_nomor_polisis_nomor_polisi_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_nomor_polisis
    ADD CONSTRAINT data_nomor_polisis_nomor_polisi_key12 UNIQUE (nomor_polisi);


--
-- Name: data_nomor_polisis data_nomor_polisis_nomor_polisi_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_nomor_polisis
    ADD CONSTRAINT data_nomor_polisis_nomor_polisi_key13 UNIQUE (nomor_polisi);


--
-- Name: data_nomor_polisis data_nomor_polisis_nomor_polisi_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_nomor_polisis
    ADD CONSTRAINT data_nomor_polisis_nomor_polisi_key2 UNIQUE (nomor_polisi);


--
-- Name: data_nomor_polisis data_nomor_polisis_nomor_polisi_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_nomor_polisis
    ADD CONSTRAINT data_nomor_polisis_nomor_polisi_key3 UNIQUE (nomor_polisi);


--
-- Name: data_nomor_polisis data_nomor_polisis_nomor_polisi_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_nomor_polisis
    ADD CONSTRAINT data_nomor_polisis_nomor_polisi_key4 UNIQUE (nomor_polisi);


--
-- Name: data_nomor_polisis data_nomor_polisis_nomor_polisi_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_nomor_polisis
    ADD CONSTRAINT data_nomor_polisis_nomor_polisi_key5 UNIQUE (nomor_polisi);


--
-- Name: data_nomor_polisis data_nomor_polisis_nomor_polisi_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_nomor_polisis
    ADD CONSTRAINT data_nomor_polisis_nomor_polisi_key6 UNIQUE (nomor_polisi);


--
-- Name: data_nomor_polisis data_nomor_polisis_nomor_polisi_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_nomor_polisis
    ADD CONSTRAINT data_nomor_polisis_nomor_polisi_key7 UNIQUE (nomor_polisi);


--
-- Name: data_nomor_polisis data_nomor_polisis_nomor_polisi_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_nomor_polisis
    ADD CONSTRAINT data_nomor_polisis_nomor_polisi_key8 UNIQUE (nomor_polisi);


--
-- Name: data_nomor_polisis data_nomor_polisis_nomor_polisi_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_nomor_polisis
    ADD CONSTRAINT data_nomor_polisis_nomor_polisi_key9 UNIQUE (nomor_polisi);


--
-- Name: data_nomor_polisis data_nomor_polisis_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_nomor_polisis
    ADD CONSTRAINT data_nomor_polisis_pkey PRIMARY KEY (id);


--
-- Name: data_vouchers data_vouchers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_vouchers
    ADD CONSTRAINT data_vouchers_pkey PRIMARY KEY (id);


--
-- Name: global_settings global_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.global_settings
    ADD CONSTRAINT global_settings_pkey PRIMARY KEY (id);


--
-- Name: kendaraans kendaraans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kendaraans
    ADD CONSTRAINT kendaraans_pkey PRIMARY KEY (id);


--
-- Name: level_akses level_akses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.level_akses
    ADD CONSTRAINT level_akses_pkey PRIMARY KEY (id);


--
-- Name: parameters parameters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parameters
    ADD CONSTRAINT parameters_pkey PRIMARY KEY (id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: permasalahan_atau_perbaikans permasalahan_atau_perbaikans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permasalahan_atau_perbaikans
    ADD CONSTRAINT permasalahan_atau_perbaikans_pkey PRIMARY KEY (id);


--
-- Name: perusahaans perusahaans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perusahaans
    ADD CONSTRAINT perusahaans_pkey PRIMARY KEY (id);


--
-- Name: pos pos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pos
    ADD CONSTRAINT pos_pkey PRIMARY KEY (id);


--
-- Name: produk_members produk_members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produk_members
    ADD CONSTRAINT produk_members_pkey PRIMARY KEY (id);


--
-- Name: produk_vouchers produk_vouchers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produk_vouchers
    ADD CONSTRAINT produk_vouchers_pkey PRIMARY KEY (id);


--
-- Name: riwayat_transaksi_ganti_nopols riwayat_transaksi_ganti_nopols_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_transaksi_ganti_nopols
    ADD CONSTRAINT riwayat_transaksi_ganti_nopols_pkey PRIMARY KEY (id);


--
-- Name: riwayat_transaksi_kartu_members riwayat_transaksi_kartu_members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_transaksi_kartu_members
    ADD CONSTRAINT riwayat_transaksi_kartu_members_pkey PRIMARY KEY (id);


--
-- Name: riwayat_transaksi_members riwayat_transaksi_members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_transaksi_members
    ADD CONSTRAINT riwayat_transaksi_members_pkey PRIMARY KEY (id);


--
-- Name: shifts shifts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shifts
    ADD CONSTRAINT shifts_pkey PRIMARY KEY (id);


--
-- Name: tarif_dendas tarif_dendas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tarif_dendas
    ADD CONSTRAINT tarif_dendas_pkey PRIMARY KEY (id);


--
-- Name: tarif_parkirs tarif_parkirs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tarif_parkirs
    ADD CONSTRAINT tarif_parkirs_pkey PRIMARY KEY (id);


--
-- Name: tipe_kendaraans tipe_kendaraans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipe_kendaraans
    ADD CONSTRAINT tipe_kendaraans_pkey PRIMARY KEY (id);


--
-- Name: transaksi_manual_mixes transaksi_manual_mixes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaksi_manual_mixes
    ADD CONSTRAINT transaksi_manual_mixes_pkey PRIMARY KEY (id);


--
-- Name: users users_nama_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_nama_key UNIQUE (nama);


--
-- Name: users users_nama_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_nama_key1 UNIQUE (nama);


--
-- Name: users users_nama_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_nama_key10 UNIQUE (nama);


--
-- Name: users users_nama_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_nama_key11 UNIQUE (nama);


--
-- Name: users users_nama_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_nama_key12 UNIQUE (nama);


--
-- Name: users users_nama_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_nama_key13 UNIQUE (nama);


--
-- Name: users users_nama_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_nama_key2 UNIQUE (nama);


--
-- Name: users users_nama_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_nama_key3 UNIQUE (nama);


--
-- Name: users users_nama_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_nama_key4 UNIQUE (nama);


--
-- Name: users users_nama_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_nama_key5 UNIQUE (nama);


--
-- Name: users users_nama_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_nama_key6 UNIQUE (nama);


--
-- Name: users users_nama_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_nama_key7 UNIQUE (nama);


--
-- Name: users users_nama_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_nama_key8 UNIQUE (nama);


--
-- Name: users users_nama_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_nama_key9 UNIQUE (nama);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: users users_username_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key1 UNIQUE (username);


--
-- Name: users users_username_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key10 UNIQUE (username);


--
-- Name: users users_username_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key11 UNIQUE (username);


--
-- Name: users users_username_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key12 UNIQUE (username);


--
-- Name: users users_username_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key13 UNIQUE (username);


--
-- Name: users users_username_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key2 UNIQUE (username);


--
-- Name: users users_username_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key3 UNIQUE (username);


--
-- Name: users users_username_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key4 UNIQUE (username);


--
-- Name: users users_username_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key5 UNIQUE (username);


--
-- Name: users users_username_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key6 UNIQUE (username);


--
-- Name: users users_username_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key7 UNIQUE (username);


--
-- Name: users users_username_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key8 UNIQUE (username);


--
-- Name: users users_username_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key9 UNIQUE (username);


--
-- Name: data_members data_members_perusahaan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_members
    ADD CONSTRAINT data_members_perusahaan_id_fkey FOREIGN KEY (perusahaan_id) REFERENCES public.perusahaans(id) ON UPDATE CASCADE;


--
-- Name: data_members data_members_produk_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_members
    ADD CONSTRAINT data_members_produk_id_fkey FOREIGN KEY (produk_id) REFERENCES public.produk_members(id) ON UPDATE CASCADE;


--
-- Name: data_members data_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_members
    ADD CONSTRAINT data_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: data_nomor_polisis data_nomor_polisis_data_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_nomor_polisis
    ADD CONSTRAINT data_nomor_polisis_data_member_id_fkey FOREIGN KEY (data_member_id) REFERENCES public.data_members(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: data_nomor_polisis data_nomor_polisis_kendaraan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_nomor_polisis
    ADD CONSTRAINT data_nomor_polisis_kendaraan_id_fkey FOREIGN KEY (kendaraan_id) REFERENCES public.kendaraans(id) ON UPDATE CASCADE;


--
-- Name: data_vouchers data_vouchers_kendaraan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_vouchers
    ADD CONSTRAINT data_vouchers_kendaraan_id_fkey FOREIGN KEY (kendaraan_id) REFERENCES public.kendaraans(id) ON UPDATE CASCADE;


--
-- Name: data_vouchers data_vouchers_produk_voucher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_vouchers
    ADD CONSTRAINT data_vouchers_produk_voucher_id_fkey FOREIGN KEY (produk_voucher_id) REFERENCES public.produk_vouchers(id) ON UPDATE CASCADE;


--
-- Name: kendaraans kendaraans_tipe_kendaraan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kendaraans
    ADD CONSTRAINT kendaraans_tipe_kendaraan_id_fkey FOREIGN KEY (tipe_kendaraan_id) REFERENCES public.tipe_kendaraans(id) ON UPDATE CASCADE;


--
-- Name: kendaraans kendaraans_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kendaraans
    ADD CONSTRAINT kendaraans_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: permasalahan_atau_perbaikans permasalahan_atau_perbaikans_pos_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permasalahan_atau_perbaikans
    ADD CONSTRAINT permasalahan_atau_perbaikans_pos_id_fkey FOREIGN KEY (pos_id) REFERENCES public.pos(id) ON UPDATE CASCADE;


--
-- Name: perusahaans perusahaans_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perusahaans
    ADD CONSTRAINT perusahaans_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: pos pos_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pos
    ADD CONSTRAINT pos_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: produk_members produk_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produk_members
    ADD CONSTRAINT produk_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: produk_vouchers produk_vouchers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produk_vouchers
    ADD CONSTRAINT produk_vouchers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: riwayat_transaksi_ganti_nopols riwayat_transaksi_ganti_nopols_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_transaksi_ganti_nopols
    ADD CONSTRAINT riwayat_transaksi_ganti_nopols_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: riwayat_transaksi_kartu_members riwayat_transaksi_kartu_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_transaksi_kartu_members
    ADD CONSTRAINT riwayat_transaksi_kartu_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: riwayat_transaksi_members riwayat_transaksi_members_produk_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_transaksi_members
    ADD CONSTRAINT riwayat_transaksi_members_produk_id_fkey FOREIGN KEY (produk_id) REFERENCES public.produk_members(id) ON UPDATE CASCADE;


--
-- Name: riwayat_transaksi_members riwayat_transaksi_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_transaksi_members
    ADD CONSTRAINT riwayat_transaksi_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: shifts shifts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shifts
    ADD CONSTRAINT shifts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: tarif_dendas tarif_dendas_kendaraan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tarif_dendas
    ADD CONSTRAINT tarif_dendas_kendaraan_id_fkey FOREIGN KEY (kendaraan_id) REFERENCES public.kendaraans(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tarif_parkirs tarif_parkirs_kendaraan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tarif_parkirs
    ADD CONSTRAINT tarif_parkirs_kendaraan_id_fkey FOREIGN KEY (kendaraan_id) REFERENCES public.kendaraans(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: transaksi_manual_mixes transaksi_manual_mixes_kendaraan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaksi_manual_mixes
    ADD CONSTRAINT transaksi_manual_mixes_kendaraan_id_fkey FOREIGN KEY (kendaraan_id) REFERENCES public.kendaraans(id) ON UPDATE CASCADE;


--
-- Name: transaksi_manual_mixes transaksi_manual_mixes_petugas_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaksi_manual_mixes
    ADD CONSTRAINT transaksi_manual_mixes_petugas_id_fkey FOREIGN KEY (petugas_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: transaksi_manual_mixes transaksi_manual_mixes_pintu_keluar_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaksi_manual_mixes
    ADD CONSTRAINT transaksi_manual_mixes_pintu_keluar_id_fkey FOREIGN KEY (pintu_keluar_id) REFERENCES public.pos(id) ON UPDATE CASCADE;


--
-- Name: transaksi_manual_mixes transaksi_manual_mixes_pintu_masuk_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaksi_manual_mixes
    ADD CONSTRAINT transaksi_manual_mixes_pintu_masuk_id_fkey FOREIGN KEY (pintu_masuk_id) REFERENCES public.pos(id) ON UPDATE CASCADE;


--
-- Name: transaksi_manual_mixes transaksi_manual_mixes_shift_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaksi_manual_mixes
    ADD CONSTRAINT transaksi_manual_mixes_shift_id_fkey FOREIGN KEY (shift_id) REFERENCES public.shifts(id) ON UPDATE CASCADE;


--
-- Name: users users_added_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_added_by_fkey FOREIGN KEY (added_by) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: users users_level_akses_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_level_akses_id_fkey FOREIGN KEY (level_akses_id) REFERENCES public.level_akses(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users users_perusahaan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_perusahaan_id_fkey FOREIGN KEY (perusahaan_id) REFERENCES public.perusahaans(id) ON UPDATE CASCADE;


--
-- PostgreSQL database dump complete
--

