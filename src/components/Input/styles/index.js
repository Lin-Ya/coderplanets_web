import styled from 'styled-components'

import Img from '@/Img'
import { css, theme } from '@/utils'

export const Wrapper = styled.div.attrs((props) => ({
  'data-test-id': props.testId,
}))`
  position: relative;
  width: 100%;
`
const AddOn = styled.div`
  position: absolute;
  top: 0;
  ${css.flex('align-both')};
  display: ${({ show }) => (show ? 'flex' : 'none')};
  width: 30px;
  height: 32px;
  z-index: 1;
`
export const PrefixWrapper = styled(AddOn)`
  left: 0;
`
export const SuffixWrapper = styled(AddOn)`
  right: 0;
`
export const Icon = styled(Img)`
  fill: ${({ active }) =>
    active ? theme('button.primary') : theme('thread.articleDigest')};
  ${css.size(14)};
  opacity: 0.8;

  ${Wrapper}:hover & {
    opacity: 1;
  }
  transition: opacity 0.25s;
`
export const baseInput = `
  outline: none; 
  font-variant: tabular-nums;
  box-sizing: border-box;
  caret-color: #33b7b3;
  margin: 0;
  list-style: none;
  position: relative;
  display: inline-block;
  width: 100%;
  
  background-image: none;
  border: 1px solid;
  border-radius: 5px;
  transition: all 0.25s;
  -webkit-appearance: none; 
`
export const InputWrapper = styled.input`
  ${baseInput};
  padding: 4px 11px;
  height: 36px;
  font-size: 14px;
  line-height: 1.5;
  text-align: left;
  color: ${theme('thread.articleTitle')};
  padding-left: ${({ hasPrefix }) => (hasPrefix ? '26px' : '8px')};
  padding-right: ${({ hasSuffix }) => (hasSuffix ? '26px' : '8px')};
  background-color: #0b2631;
  border-color: ${theme('editor.border')};
  ::placeholder {
    color: ${theme('editor.placeholder')};
  }
  &:hover {
    border-color: ${theme('editor.borderActive')};
  }
  &:focus {
    border-color: ${theme('editor.borderActive')};
    /* box-shadow: -2px 1px 0px 0px rgba(0, 0, 0, 0.2); */
  }
  &:active {
    border-color: ${theme('editor.borderActive')};
    /* box-shadow: -2px 1px 0px 0px rgba(0, 0, 0, 0.2); */
  }
`
