/*
 *
 * NaviMenu
 *
 */

import React, { useState } from 'react'
import T from 'prop-types'

import { buildLog } from '@utils'

import GoBack from './GoBack'
import Dashboard from './Dashboard'
import Catalog from './Catalog'
import ChildrenFilter from '../ChildrenFilter'
import MoreOptions from '../MoreOptions'
// import ChildrenItems from './ChildrenItems'

import { Wrapper } from '../styles/children_menu'

/* eslint-disable-next-line */
const log = buildLog('c:NaviMenu:index')

const Content = ({ view, menuItems }) => {
  switch (view) {
    case 'filter': {
      return <ChildrenFilter />
    }
    case 'more': {
      return <MoreOptions />
    }
    default: {
      return <Catalog menuItems={menuItems} />
    }
  }
}

/* <ActiveDot /> */
const ChildrenMenu = ({ menuItems, parentMenuItem, goBack }) => {
  const [dashView, setDashView] = useState('catalog')

  return (
    <Wrapper>
      <GoBack goBack={goBack} />
      <Dashboard
        view={dashView}
        setView={setDashView}
        parentMenuItem={parentMenuItem}
      />
      <Content view={dashView} menuItems={menuItems} />
    </Wrapper>
  )
}

ChildrenMenu.propTypes = {
  goBack: T.func.isRequired,
  menuItems: T.arrayOf(T.any).isRequired,
  parentMenuItem: T.any.isRequired, // TODO
}

ChildrenMenu.defaultProps = {}

export default React.memo(ChildrenMenu)
