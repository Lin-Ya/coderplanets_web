import styled from 'styled-components'

import Img from '@/Img'
import { css, theme } from '@/utils'

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 75px;
  color: ${theme('thread.articleDigest')};
  background: #022935;
  border: 1px solid;
  border-color: #013648;
  padding-top: 2x;
`
export const Header = styled.div`
  ${css.flex()};
  color: ${theme('thread.articleDigest')};
`
// padding: 10px 2px;
export const Block = styled.div`
  ${css.flexColumn('align-both')};

  &:hover {
    cursor: pointer;
    background: #05303e;
  }
`
export const Icon = styled(Img)`
  ${css.circle(34)};
`
export const Title = styled.div`
  ${css.cutFrom('60px')};
  text-align: center;
  padding-left: 5px;
  color: ${theme('thread.articleDigest')};
`
