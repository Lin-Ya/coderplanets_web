import styled from 'styled-components'

import { theme, css } from '@/utils'

export const Wrapper = styled.div`
  ${css.flexColumn('align-both')}
  width: 100%;
`
export const InnerWrapper = styled.div`
  ${css.flexColumn('align-center', 'justify-between')};
  margin-top: 25px;
  margin-bottom: 40px;
  padding: 15px 25px;
  width: 100%;
  min-height: 88vh;
  border-radius: 8px;
  background: ${theme('haveADrinkPage.bg')};
  box-shadow: rgba(0, 0, 0, 0.04) 0px 1px 4px;
`
export const LoadingSentence = styled.div`
  font-size: 18px;
  color: ${theme('thread.articleTitle')};
`
