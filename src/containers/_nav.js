import React from "react";
import { CImg } from "@coreui/react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CImg src="logo/logo_dashboard.svg" className="mr-4" />,
    badge: {
      color: "info",
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Medical Record",
    to: "/medical_record",
    icon: <CImg src="logo/logo_medical.svg" className="mr-4" />,
    badge: {
      color: "info",
    },
  },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'EduKATIV',
  //   to: '/edukativ',
  //   icon: <CImg src="logo/logo_educativ.svg" className="mr-4"/>,
  //   badge: {
  //     color: 'info',
  //   }

  // },
  {
    _tag: "CSidebarNavItem",
    name: (
      <div
        onClick={() => {
          window.location.assign("https://aktiv.co.id/wp-admin");
        }}
      >
        EduKATIV
      </div>
    ),
    // to:'/',
    icon: (
      <div
        onClick={() => {
          window.location.assign("https://aktiv.co.id/wp-admin");
        }}
      >
        <CImg src="logo/logo_educativ.svg" className="mr-4" />
      </div>
    ),
    badge: {
      color: "info",
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: (
      <div
        onClick={() => {
          window.location.assign("https://dashboard.tawk.to");
        }}
      >
        TanyaAktiv
      </div>
    ),
    // to:'/',
    icon: (
      <div
        onClick={() => {
          window.location.assign("https://dashboard.tawk.to");
        }}
      >
        <CImg src="logo/logo_tanya.svg" className="mr-4" />
      </div>
    ),
    badge: {
      color: "info",
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Tenaga Kesehatan",
    to: "/data_volunteer",
    icon: <CImg src="logo/logo_volunteer.svg" className="mr-4" />,
    badge: {
      color: "info",
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Puskesmas",
    to: "/puskesmas",
    icon: <CImg src="logo/hospital.svg" className="mr-4" />,
    badge: {
      color: "info",
    },
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Manajemen User",
    route: "/users",
    icon: <CImg src="logo/logo_user.png" className="mr-4" />,
    _children: [
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "Admin dan Dinkes",
      //   to: "/users",
      //   // icon:  <CImg src="logo/logo_dashboard.svg" className="mr-4"/>,
      //   badge: {
      //     color: "info",
      //   },
      // },
      {
        _tag: "CSidebarNavItem",
        name: "Pasien",
        to: "/users/patient",
        // icon:  <CImg src="logo/logo_dashboard.svg" className="mr-4"/>,
        badge: {
          color: "info",
        },
      },
      {
        _tag: "CSidebarNavItem",
        name: "Member",
        to: "/users/member",
        // icon:  <CImg src="logo/logo_dashboard.svg" className="mr-4"/>,
        badge: {
          color: "info",
        },
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Pengaturan Umum",
    route: "/pengaturan_umum",
    icon: <CImg src="logo/logo_pengaturan.svg" className="mr-4" />,
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Banner",
        to: "/pengaturan_umum/banner",
      },
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'Indikator Gejala',
      //   to: '/pengaturan_umum/indikator_gejala',
      // },
      {
        _tag: "CSidebarNavItem",
        name: "Guidance",
        to: "/pengaturan_umum/guidance",
      },
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'Kategori Artikel',
      //   to: '/pengaturan_umum/kategori_artikel',
      // },
    ],
  },
];

export default _nav;
