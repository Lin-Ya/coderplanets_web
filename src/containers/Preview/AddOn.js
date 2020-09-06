import React from 'react'

import { ICON_CMD } from '@/config'
import { useMedia } from '@/hooks'
// import { Wrapper } from './styles'
import {
  Wrapper,
  CloseTab,
  CloserInner,
  UploadingTab,
  UploadImgIcon,
  UploadLoadingIcon,
  MobileCloser,
} from './styles/add_on'

import { closePreview } from './logic'

const AddOn = ({ type, imageUploading }) => {
  const { mobile } = useMedia()

  return (
    <Wrapper>
      {mobile && <MobileCloser onClick={closePreview} />}
      <CloseTab type={type} onClick={closePreview}>
        <CloserInner />
      </CloseTab>
      <UploadingTab show={imageUploading}>
        <UploadImgIcon src={`${ICON_CMD}/preview-tab-image.svg`} />
        <UploadLoadingIcon src={`${ICON_CMD}/preview-tab-loading.svg`} />
      </UploadingTab>
    </Wrapper>
  )
}

export default React.memo(AddOn)
