import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const MedicalRecord = React.lazy(() =>
  import("./views/medical_record/medical_record")
);
const DetailPasien = React.lazy(() =>
  import("./views/medical_record/detail_pasien")
);
const UserPatient = React.lazy(() => import("./views/users/user_patient"));
const UserMember = React.lazy(() => import("./views/users/user_member"));
const Cppt = React.lazy(() => import("./views/medical_record/cppt"));
const CpptData = React.lazy(() => import("./views/medical_record/cppt_data"));
const Epidemologi = React.lazy(() =>
  import("./views/medical_record/epidemologi")
);
const Educativ = React.lazy(() => import("./views/educativ/educativ"));
const TambahArtikel = React.lazy(() =>
  import("./views/educativ/tambah_artikel")
);
const TanyaAktiv = React.lazy(() => import("./views/tanya_aktiv/tanya_aktiv"));
const DataVolunteer = React.lazy(() =>
  import("./views/data_volunteer/data_volunteer")
);
const DetailVolunteer = React.lazy(() =>
  import("./views/data_volunteer/detail_volunteer")
);
const Puskesmas = React.lazy(() => import("./views/puskesmas/puskesmas"));
const TambahPuskesmas = React.lazy(() =>
  import("./views/puskesmas/tambah_puskesmas")
);
const Banner = React.lazy(() => import("./views/pengaturan_umum/banner"));
const IndikatorGejala = React.lazy(() =>
  import("./views/pengaturan_umum/indikator_gejala")
);
const Guidance = React.lazy(() => import("./views/pengaturan_umum/guidance"));
const TambahGuidance = React.lazy(() =>
  import("./views/pengaturan_umum/tambah_guidance")
);
// const KategoriArtikel = React.lazy(() => import('./views/pengaturan_umum/kategori_artikel'));
// const TambahKategoriArtikel = React.lazy(() => import('./views/pengaturan_umum/tambah_kategori_artikel'));
const Profile = React.lazy(() => import("./views/pages/profile"));

var routes;
routes = [{ path: "/", exact: true, name: "Home" }];
if (localStorage.getItem("role") === "admin") {
  routes = [
    { path: "/", exact: true, name: "Home" },
    {
      path: "/dashboard",
      exact: true,
      name: "Dashboard",
      component: Dashboard,
    },
    {
      path: "/medical_record",
      name: "Medical Record",
      component: MedicalRecord,
      exact: true,
    },
    {
      path: "/medical_record/detail_pasien/:akunID/:memberID",
      name: "Detail Pasien",
      component: DetailPasien,
      exact: true,
    },
    {
      path: "/medical_record/detail_pasien/cppt/:akunID/:memberID",
      name: "Cppt",
      component: Cppt,
      exact: true,
    },
    {
      path: "/medical_record/detail_pasien/cppt/cppt_data/:akunID/:memberID",
      name: "Isi Data CPPT",
      component: CpptData,
      exact: true,
    },
    {
      path: "/medical_record/detail_pasien/cppt/cppt_data/:akunID/:memberID/:id",
      name: "Update Data CPPT",
      component: CpptData,
      exact: true,
    },
    {
      path: "/medical_record/detail_pasien/epidemologi/:akunID/:memberID",
      name: "Epidemologi",
      component: Epidemologi,
      exact: true,
    },
    { path: "/edukativ", name: "EduKATIV", component: Educativ, exact: true },

    {
      path: "/edukativ/tambah_artikel",
      name: "Tambah Artikel",
      component: TambahArtikel,
    },
    {
      path: "/edukativ/detail_artikel/:id",
      name: "Update Artikel",
      component: TambahArtikel,
    },
    { path: "/tanya_aktiv", name: "Tanya Aktiv", component: TanyaAktiv },
    {
      path: "/data_volunteer",
      name: "Data Tenaga Kesehatan",
      component: DataVolunteer,
      exact: true,
    },
    {
      path: "/data_volunteer/detail_volunteer/:id",
      name: "Detail Tenaga Kesehatan",
      component: DetailVolunteer,
    },
    {
      path: "/puskesmas",
      name: "Puskesmas",
      component: Puskesmas,
      exact: true,
    },
    {
      path: "/puskesmas/tambah_puskesmas",
      name: "Tambah Puskesmas",
      component: TambahPuskesmas,
    },
    {
      path: "/puskesmas/update_puskesmas/:id",
      name: "Update Puskesmas",
      component: TambahPuskesmas,
    },
    {
      path: "/pengaturan_umum",
      name: "Pengaturan Umum",
      component: Banner,
      exact: true,
    },
    { path: "/pengaturan_umum/banner", name: "Banner", component: Banner },
    {
      path: "/pengaturan_umum/indikator_gejala",
      name: "Indikator Gejala",
      component: IndikatorGejala,
    },
    {
      path: "/pengaturan_umum/guidance",
      name: "Guidance",
      component: Guidance,
      exact: true,
    },
    {
      path: "/pengaturan_umum/guidance/tambah_guidance",
      name: "Tambah Guidance",
      component: TambahGuidance,
    },
    // { path: '/pengaturan_umum/kategori_artikel', name: 'Kategori Artikel', component: KategoriArtikel, exact: true },
    // { path: '/pengaturan_umum/kategori_artikel/tambah_kategori_artikel', name: 'Tambah Kategori Artikel', component: TambahKategoriArtikel },
    { path: "/profile", name: "Profile", component: Profile, exact: true },
    {
      path: "/users/patient",
      name: "List Pasien",
      component: UserPatient,
      exact: true,
    },
    {
      path: "/users/member",
      name: "List Member",
      component: UserMember,
      exact: true,
    },
    {
      path: "/users/member/:akunID",
      name: "List Member",
      component: UserMember,
    },
  ];
} else if (
  localStorage.getItem("role") === "operator" ||
  localStorage.getItem("role") === "dinkes"
) {
  routes = [
    { path: "/", exact: true, name: "Home" },
    {
      path: "/dashboard",
      exact: true,
      name: "Dashboard",
      component: Dashboard,
    },

    { path: "/edukativ", name: "EduKATIV", component: Educativ, exact: true },
    {
      path: "/edukativ/tambah_artikel",
      name: "Tambah Artikel",
      component: TambahArtikel,
    },
    {
      path: "/data_volunteer",
      name: "Data Tenaga Kesehatan",
      component: DataVolunteer,
      exact: true,
    },
    {
      path: "/data_volunteer/detail_volunteer/:id",
      name: "Detail Tenaga Kesehatan",
      component: DetailVolunteer,
    },
    {
      path: "/puskesmas",
      name: "Puskesmas",
      component: Puskesmas,
      exact: true,
    },
    {
      path: "/puskesmas/tambah_puskesmas",
      name: "Tambah Puskesmas",
      component: TambahPuskesmas,
    },
    {
      path: "/puskesmas/update_puskesmas/:id",
      name: "Update Puskesmas",
      component: TambahPuskesmas,
    },
    {
      path: "/pengaturan_umum",
      name: "Pengaturan Umum",
      component: Banner,
      exact: true,
    },
    { path: "/pengaturan_umum/banner", name: "Banner", component: Banner },
    {
      path: "/pengaturan_umum/guidance",
      name: "Guidance",
      component: Guidance,
      exact: true,
    },
    {
      path: "/pengaturan_umum/guidance/tambah_guidance",
      name: "Tambah Guidance",
      component: TambahGuidance,
    },
    // { path: '/pengaturan_umum/kategori_artikel', name: 'Kategori Artikel', component: KategoriArtikel, exact: true },
    // { path: '/pengaturan_umum/kategori_artikel/tambah_kategori_artikel', name: 'Tambah Kategori Artikel', component: TambahKategoriArtikel },
    { path: "/profile", name: "Profile", component: Profile, exact: true },
  ];
} else if (localStorage.getItem("role") === "volunteer") {
  routes = [
    { path: "/", exact: true, name: "Home" },
    {
      path: "/dashboard",
      exact: true,
      name: "Dashboard",
      component: Dashboard,
    },

    {
      path: "/medical_record",
      name: "Medical Record",
      component: MedicalRecord,
      exact: true,
    },
    {
      path: "/medical_record/detail_pasien/:akunID/:memberID",
      name: "Detail Pasien",
      component: DetailPasien,
      exact: true,
    },
    {
      path: "/medical_record/detail_pasien/cppt/:akunID/:memberID",
      name: "Cppt",
      component: Cppt,
      exact: true,
    },
    {
      path: "/medical_record/detail_pasien/cppt/cppt_data/:akunID/:memberID",
      name: "Isi Data CPPT",
      component: CpptData,
      exact: true,
    },
    {
      path: "/medical_record/detail_pasien/cppt/cppt_data/:akunID/:memberID/:id",
      name: "Update Data CPPT",
      component: CpptData,
      exact: true,
    },
    {
      path: "/medical_record/detail_pasien/epidemologi/:akunID/:memberID",
      name: "Epidemologi",
      component: Epidemologi,
      exact: true,
    },
    { path: "/tanya_aktiv", name: "Tanya Aktiv", component: TanyaAktiv },
    {
      path: "/data_volunteer",
      name: "Data Tenaga Kesehatan",
      component: DataVolunteer,
      exact: true,
    },
    {
      path: "/data_volunteer/detail_volunteer/:id",
      name: "Detail Tenaga Kesehatan",
      component: DetailVolunteer,
    },
    { path: "/profile", name: "Profile", component: Profile, exact: true },
  ];
}

export default routes;
