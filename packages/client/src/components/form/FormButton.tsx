import styled from 'styled-components'

import buttonStyle from '../mixins/buttonStyle'

const FormButton = styled.button<{ color?: 'default' }>`
  ${buttonStyle}
  ${props => {
    if (props.color === 'default') {
      return `
        border: 2px solid #c0c0c0;
        background-color: #ffffff;
        color: #000000;
        &:active {
          background-color: #f0f0f0;
        }
      `
    }
  }}
`

export default FormButton
