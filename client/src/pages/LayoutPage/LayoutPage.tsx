import React from 'react'
import { NavbarComponent } from '../../components'

const LayoutPage = () => {
  return (
    <div>
      <div>
        <NavbarComponent />
      </div>
      <div>outlet</div>
    </div>
  )
}

export default LayoutPage
