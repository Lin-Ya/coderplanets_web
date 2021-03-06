import React from 'react'
// import T from 'prop-types'

import { ICON } from '@/config'
import { TYPE, EVENT } from '@/constant'
import { send } from '@/utils'
// import Tooltip from '@/components/Tooltip'
// import MorePanel from '../MorePanel'
import { Wrapper, SiteLink, MobileIcon } from '../styles/main_entries'

export const openMobileNaviMenu = () => {
  send(EVENT.DRAWER.OPEN, {
    type: TYPE.DRAWER.MODELINE_MENU,
    data: TYPE.MM_TYPE.GLOBAL_MENU,
    options: { direction: 'top' },
  })
}

const MainEntries = () => {
  return (
    <Wrapper onClick={openMobileNaviMenu}>
      <SiteLink as="span">
        <MobileIcon src={`${ICON}/shape/more-3.svg`} />
      </SiteLink>
    </Wrapper>
  )
}

MainEntries.propTypes = {
  // type: T.oneOfType([T.string, T.instanceOf(null)]),
}

MainEntries.defaultProps = {
  // type: null,
}

export default React.memo(MainEntries)
