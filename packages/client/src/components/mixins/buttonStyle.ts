import { css } from 'styled-components'

const buttonStyle = css`
  padding: 8px 20px;
  margin-left: 10px;
  &:first-child {
    margin-left: 0;
  }

  background-color: var(--primary-color);
  border: 2px solid var(--primary-color);
  color: #ffffff;

  font: inherit;
  font-weight: bold;
  cursor: pointer;

  &:active {
    background-color: var(--active-color);
  }

  &:disabled {
    background-color: #e0e0e0;
    border: 2px solid #c0c0c0;
    color: #808080;
    cursor: unset;
  }
`

export default buttonStyle
