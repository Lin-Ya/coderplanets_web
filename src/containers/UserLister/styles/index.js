import styled from 'styled-components'

// import Img from '@components/Img'
import { cs } from '@utils'

export const Wrapper = styled.div`
  height: 600px;
  padding: 20px;
`
export const MsgWrapper = styled.div`
  ${cs.flex('align-both')};
  width: 90%;
  height: 180px;
`
