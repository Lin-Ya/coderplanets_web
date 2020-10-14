import React from 'react'

import { TYPE } from '@/constant'
import { useMedia } from '@/hooks'

import ModeLineMenu from '@/containers/unit/ModeLineMenu'
import CustomScroller from '@/components/CustomScroller'

import {
  AccountViewer,
  PostViewer,
  JobViewer,
  MailsViewer,
  RepoViewer,
  VideoViewer,
  // editors
  AccountEditor,
  PostEditor,
  JobEditor,
  VideoEditor,
  RepoEditor,
  // utils
  C11NSettingPanel,
} from '../dynamics'

import PlaceHolder from './PlaceHolder'

import { Wrapper } from '../styles/content'
import { getMobileContentHeight } from '../styles/metrics'
import { closeDrawer } from '../logic'

const renderContent = (type, attachment, attUser, mmType) => {
  switch (type) {
    case TYPE.DRAWER.ACCOUNT_VIEW:
      return <AccountViewer />

    case TYPE.DRAWER.USER_VIEW:
      return <AccountViewer user={attUser} />

    case TYPE.DRAWER.ACCOUNT_EDIT:
      return <AccountEditor />

    // post
    case TYPE.DRAWER.POST_VIEW:
      return <PostViewer attachment={attachment} />

    case TYPE.DRAWER.POST_CREATE:
      return <PostEditor onClose={closeDrawer} />

    case TYPE.DRAWER.POST_EDIT:
      return <PostEditor onClose={closeDrawer} attachment={attachment} />

    // job
    case TYPE.DRAWER.JOB_CREATE:
      return <JobEditor onClose={closeDrawer} />

    case TYPE.DRAWER.JOB_VIEW:
      return <JobViewer attachment={attachment} />

    case TYPE.DRAWER.JOB_EDIT:
      return <JobEditor onClose={closeDrawer} attachment={attachment} />

    // repo
    case TYPE.DRAWER.REPO_VIEW:
      return <RepoViewer attachment={attachment} />

    case TYPE.DRAWER.REPO_CREATE:
      return <RepoEditor />

    // video
    case TYPE.DRAWER.VIDEO_EDIT:
      return <VideoEditor attachment={attachment} />

    case TYPE.DRAWER.VIDEO_VIEW:
      return <VideoViewer attachment={attachment} />

    case TYPE.DRAWER.VIDEO_CREATE:
      return <VideoEditor />

    case TYPE.DRAWER.MAILS_VIEW:
      return <MailsViewer />

    case TYPE.DRAWER.C11N_SETTINGS:
      return <C11NSettingPanel />

    case TYPE.DRAWER.MODELINE_MENU:
      return <ModeLineMenu type={mmType} />

    default:
      return <PlaceHolder />
  }
}

const Content = ({ options, type, attachment, attUser, mmType }) => {
  const { mobile } = useMedia()

  if (mobile) {
    return (
      <CustomScroller
        direction="vertical"
        height={`calc(${getMobileContentHeight(options)} - 30px)`}
        showShadow={false}
        autoHide
      >
        <Wrapper>{renderContent(type, attachment, attUser, mmType)}</Wrapper>
      </CustomScroller>
    )
  }

  return (
    <Wrapper>
      <CustomScroller direction="vertical" height="100vh" shadowSize="small">
        <div>{renderContent(type, attachment, attUser)}</div>
      </CustomScroller>
    </Wrapper>
  )
}

export default React.memo(Content)