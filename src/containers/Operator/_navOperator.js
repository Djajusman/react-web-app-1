import React from 'react'
import {
  CImg,
} from '@coreui/react'

const _navOperator = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon:  <CImg src="logo/logo_dashboard.svg" className="mr-4"/>,
    badge: {
      color: 'info',
    }
    
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Medical Record',
    to: '/medical_record',
    icon: <CImg src="logo/logo_medical.svg" className="mr-4"/>,
    badge: {
      color: 'info',
    }
  },

  {
    _tag: 'CSidebarNavItem',
    name: <div onClick={()=>{
      window.location.assign('https://dashboard.tawk.to');
    }}>TanyaAktiv</div>,
    // to:'/',
    icon: <div onClick={()=>{
      window.location.assign('https://dashboard.tawk.to');
    }} ><CImg  src="logo/logo_tanya.svg" className="mr-4"/></div>,
    badge: {
      color: 'info',
    }
    
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tenaga Kesehatan',
    to: '/data_volunteer',
    icon: <CImg src="logo/logo_volunteer.svg" className="mr-4"/>,
    badge: {
      color: 'info',
    }
    
  },
  
]

export default _navOperator;
