import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'

import TitleBar from '../titlebar'

const MainLayout = () => {
  return (
    <Fragment>
      <TitleBar showTitle={false} />
      <div id="main">
        <Outlet />
      </div>
    </Fragment>
  )
}

export default MainLayout
