import { useEffect } from 'react'
import { contains, values } from 'ramda'

import { TYPE, EVENT } from '@/constant'

import {
  asyncSuit,
  buildLog,
  unlockPage,
  send,
  Global,
  debounce,
  toggleGlobalBlur,
  clearGlobalBlur,
} from '@/utils'

/* eslint-disable-next-line */
const log = buildLog('L:Preview')

const { SR71, $solver, asyncRes } = asyncSuit
const sr71$ = new SR71({
  receive: [
    ...values(EVENT.DRAWER),
    EVENT.UPLOAD_IMG_START,
    EVENT.UPLOAD_IMG_FINISH,
  ],
})

let store = null
let sub$ = null

// those types will not treat as page link
const FUNCTION_TYPES = [TYPE.DRAWER.C11N_SETTINGS, TYPE.DRAWER.MODELINE_MENU]

/**
 * close current drawer
 */
export const closeDrawer = () => {
  unlockPage()
  store.close()
  store.mark({ imageUploading: false, type: null })

  // force call MDEditor's componentWillUnmount to store the draft
  // wait until drawer move out of the screean
  setTimeout(() => {
    send(EVENT.DRAWER_CLOSED)
    store.setViewing({ viewingThread: null })
  }, 200)

  setTimeout(() => {
    // make sure global blur is closed
    toggleGlobalBlur(false)
  }, 500)
}

// handler swiped event for up/down swipe
// 判断最终是回到原来的位置还是隐藏 panel
export const onSwipedYHandler = (
  ev,
  setSwipeUpY,
  setSwipeDownY,
  ignoreSwipeAviliable = false,
) => {
  const {
    optionsData: options,
    swipeThreshold,
    swipeUpAviliable,
    swipeDownAviliable,
  } = store

  if (options.direction === 'bottom') {
    const swipeDonwY = parseInt(ev.absY, 10)

    if (swipeDonwY < swipeThreshold) {
      setSwipeDownY(0)
      store.mark({ canBeClose: false })
    } else if (
      ev.dir === 'Down' &&
      (swipeDownAviliable || ignoreSwipeAviliable)
    ) {
      closeDrawer()
      setSwipeDownY(null)
    }
  } else {
    // handle top direction situation
    const swipeUpY = parseInt(ev.absY, 10)

    if (swipeUpY < swipeThreshold) {
      setSwipeUpY(0)
      store.mark({ canBeClose: false })
    } else if (ev.dir === 'Up' && (swipeUpAviliable || ignoreSwipeAviliable)) {
      closeDrawer()
      setSwipeUpY(null)
    }
  }
}

const handleClearEffect = debounce(() => {
  clearGlobalBlur(true)
  store.mark({ canBeClose: true })
}, 200)
const handleRestoreEffect = debounce(() => {
  toggleGlobalBlur(true)
  store.mark({ canBeClose: false })
}, 200)

// handler swiping event for up/down swipe
export const onSwipingYHandler = (
  ev,
  setSwipeUpY,
  setSwipeDownY,
  ignoreSwipeAviliable = false,
) => {
  // when top/bottom has no content, the whole panel can be swipeable
  // like tiktok style
  const {
    swipeThreshold,
    optionsData: options,
    swipeUpAviliable,
    swipeDownAviliable,
  } = store

  if ((ignoreSwipeAviliable || swipeUpAviliable) && ev.dir === 'Up') {
    const swipeUpY = parseInt(ev.absY, 10)
    setSwipeUpY(swipeUpY)

    if (
      ignoreSwipeAviliable ||
      (swipeUpAviliable && options.direction !== 'bottom')
    ) {
      swipeUpY >= swipeThreshold ? handleClearEffect() : handleRestoreEffect()
    }
  }

  if ((ignoreSwipeAviliable || swipeDownAviliable) && ev.dir === 'Down') {
    const swipeDonwY = parseInt(ev.absY, 10)
    setSwipeDownY(swipeDonwY)

    if (
      ignoreSwipeAviliable ||
      (swipeDownAviliable && options.direction !== 'top')
    ) {
      swipeDonwY >= swipeThreshold ? handleClearEffect() : handleRestoreEffect()
    }
  }
}

//
export const toggleSwipeAviliable = (type, bool) => {
  type === 'Down'
    ? store.mark({ swipeDownAviliable: bool })
    : store.mark({ swipeUpAviliable: bool })
}

export const toggleHeaderTextVisiable = (bool) => {
  store.mark({ showHeaderText: bool })
}

export const resetSwipeAviliable = () => store.resetSwipeAviliable()

const DataResolver = [
  {
    match: asyncRes(EVENT.DRAWER.OPEN),
    action: (res) => {
      const payload = res[EVENT.DRAWER.OPEN]
      /*
         log('should open payload thread: ', payload.thread)
         log('should open payload id: ', payload.data.id)
         log('payload curCommunity: ', store.curCommunity.raw)
       */
      if (!contains(payload.type, FUNCTION_TYPES) && store.isMobile) {
        const { thread, data } = payload
        const communityRaw = store.curCommunity.raw || data.origialCommunity.raw
        const targetUrl = `/${communityRaw}/${thread}/${data.id}`

        Global.location.href = targetUrl
        return false
      }

      store.open(payload)
    },
  },
  {
    match: asyncRes(EVENT.DRAWER.CLOSE),
    action: () => closeDrawer(),
  },
  {
    match: asyncRes(EVENT.DRAWER.CONTENT_DRAGABLE),
    action: (res) => {
      const payload = res[EVENT.DRAWER.CONTENT_DRAGABLE]
      store.mark({ disableContentDrag: payload.data })
    },
  },
  {
    match: asyncRes(EVENT.UPLOAD_IMG_START),
    action: () => store.mark({ imageUploading: true }),
  },
  {
    match: asyncRes(EVENT.UPLOAD_IMG_FINISH),
    action: () => {
      setTimeout(() => {
        store.mark({ imageUploading: false })
      }, 500)
    },
  },
]

// ###############################
// init & uninit
// ###############################
export const useInit = (_store, windowWidth) => {
  useEffect(() => {
    store = _store
    if (!sub$) {
      sub$ = sr71$.data().subscribe($solver(DataResolver, []))
    }
    store.mark({ windowWidth })

    return () => {
      if (!sub$) return false
      sr71$.stop()
      sub$.unsubscribe()
      sub$ = null
    }
  }, [_store, windowWidth])
}
