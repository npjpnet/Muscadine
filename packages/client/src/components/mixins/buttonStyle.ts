import { css } from 'styled-components'

const buttonStyle = css`
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: #ffffff;
  border: none;
  font: inherit;
  font-weight: bold;
  cursor: pointer;

  &:active {
    background-color: var(--active-color);
  }

  &:disabled {
    background-color: #c0c0c0;
    color: #808080;
  }
`

export default buttonStyle
