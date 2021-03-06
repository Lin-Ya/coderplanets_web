import styled from 'styled-components'

export const Wrapper = styled.div.attrs((props) => ({
  'data-test-id': props.testId,
}))`
  position: relative;
`
export const MobileWrapper = styled.div`
  width: 100%;
  height: 0px;
`
