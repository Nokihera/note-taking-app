import React from 'react'
import Heading from './Heading'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
        <Heading/>
        <Outlet/>
    </div>
  )
}

export default Layout