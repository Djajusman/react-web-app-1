import React from 'react'
import {
  TheContentAdmin,
  TheSidebarAdmin,
  // TheContent,
  // TheSidebar,
  TheFooter,
  TheHeader
} from './indexAdmin'

const TheLayoutAdmin = () => {
  return (
    <div className="c-app c-default-layout">
      <TheSidebarAdmin/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContentAdmin/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayoutAdmin
