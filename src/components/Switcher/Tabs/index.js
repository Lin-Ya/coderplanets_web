/*
 *
 * Tabs
 *
 */

import React from 'react'
import T from 'prop-types'

import { VIEW } from '@/constant'
import { useDevice } from '@/hooks'
import { buildLog } from '@/utils'

import DesktopView from './DesktopView'
import MobileView from './MobileView/index'
import ModelineView from './ModelineView'
import CardView from './CardView'
import DrawerView from './DrawerView'

/* eslint-disable-next-line */
const log = buildLog('c:Tabs:index')

const Tabs = (props) => {
  const { isMobile } = useDevice()

  const { view } = props

  const curMedia = isMobile ? VIEW.MOBILE : VIEW.DESKTOP
  const curView = view === 'auto' ? curMedia : view

  switch (curView) {
    case VIEW.MOBILE: {
      return <MobileView {...props} />
    }

    case VIEW.MODELINE: {
      return <ModelineView {...props} />
    }

    case VIEW.COMMUNITY_CARD: {
      return <CardView {...props} />
    }

    case VIEW.DRAWER: {
      return <DrawerView {...props} />
    }

    default: {
      return <DesktopView {...props} />
    }
  }
}

Tabs.propTypes = {
  view: T.oneOf(['auto', VIEW.COMMUNITY_CARD, VIEW.MODELINE, VIEW.DRAWER]),
}

Tabs.defaultProps = {
  view: 'auto',
}

export default React.memo(Tabs)
