import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      {/* <div>
        <span className="ml-1">&copy; 2021 Arktiv-Web</span>
      </div> */}
    </CFooter>
  )
}

export default React.memo(TheFooter)
