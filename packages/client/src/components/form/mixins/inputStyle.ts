import { css } from 'styled-components'

const inputStyle = css`
  display: block;
  width: 100%;
  
  padding: 10px;
  border: 2px solid #c0c0c0;
  outline: none;
  font: inherit;

  &:focus {
    border: 2px solid var(--primary-color);
  }
`

export default inputStyle
