import React from 'react'
import {
  TheContentOperator,
  TheSidebarOperator,
  TheFooter,
  TheHeader
} from './indexOperator'

const TheLayoutOperator = () => {
  return (
    <div className="c-app c-default-layout">
      <TheSidebarOperator/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContentOperator/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayoutOperator
