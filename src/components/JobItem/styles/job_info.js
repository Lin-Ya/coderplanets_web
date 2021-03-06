import styled from 'styled-components'

import { theme, css } from '@/utils'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  flex-grow: 1;
  width: 48%;
  max-width: 60%;
`
export const Header = styled.div`
  ${css.flex('align-center')};
  &:hover {
    cursor: pointer;
  }
`
export const Middle = styled.div`
  ${css.flex('align-end')};
  padding: 5px 0;
  margin-bottom: 2px;
  &:hover {
    cursor: pointer;
  }
`
export const Footer = styled.div`
  color: ${theme('thread.articleDigest')};
`
export const Title = styled.div`
  color: ${theme('thread.articleTitle')};
  font-size: 1rem;
  ${css.media.mobile`
    ${css.cutFrom('150px')};
`};
`
export const CommunitiesWrapper = styled.div`
  margin-left: 5px;
  margin-top: -1px;
`
export const SalaryWrapper = styled.div`
  font-size: 0.9rem;
  color: ${theme('contrastFg')};
  margin-right: 16px;
  margin-top: -1px;
`
export const BackgroundWrapper = styled.div`
  ${css.flex()};
`
export const TagsWrapper = styled.div`
  margin-top: -1px;
`

export const Background = styled.div`
  ${css.flex('align-center')};
  color: ${theme('thread.articleDigest')};
  font-size: 0.85rem;
  ${css.media.mobile`display: none`};
`
export const Degree = styled.div``
export const Exp = styled.div``
export const ExpLabel = styled.span`
  ${css.media.tablet`display: none`};
`

export const Extra = styled.div`
  ${css.flex('align-center')};
  opacity: 0.7;
  transition: opacity 0.2s;
  font-size: 0.8rem;
`
export const ExpDivider = styled.div`
  margin-left: 4px;
  margin-right: 4px;
`

export const PublishInfo = styled.div`
  ${css.flex('align-center')};
  ${css.media.tablet`
display: none;
`};

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`
