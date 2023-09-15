import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'

import TitleBar from '../titlebar'

const MainLayout = () => {
  return (
    <Fragment>
      <TitleBar />
      <div id="main">
        <Outlet />
      </div>
    </Fragment>
  )
}

export default MainLayout
