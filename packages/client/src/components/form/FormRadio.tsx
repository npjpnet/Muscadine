import styled from 'styled-components'
import inputStyle from './mixins/inputStyle'

interface Props {
  name: string
  values: Array<{
    value: string
    text: string
    checked?: boolean
  }>
  value: string
  onChange: (value: string) => void
}
const FormRadio: React.FC<Props> = (props) => {
  return (
    <>
      {props.values.map(i => <StyledRadioItem key={`${props.name}-${i.value}`}>
        <StyledRadio
          name={props.name}
          id={`${props.name}-${i.value}`}

          value={i.value}
          onChange={e => props.onChange(e.target.value)}
          checked={props.value === i.value}
          defaultChecked={i.checked} />
        <StyledRadioLabel htmlFor={`${props.name}-${i.value}`}>{i.text}</StyledRadioLabel>
      </StyledRadioItem>)}
    </>
  )
}

const StyledRadioItem = styled.div`
  margin-bottom: 5px;
  &:last-child {
    margin-bottom: 0;
  }
`

const StyledRadio = styled.input.attrs({ type: 'radio' })`
  display: none;
`

const StyledRadioLabel = styled.label`
  ${inputStyle}
  padding-left: 32px;
  cursor: pointer;

  position: relative;

  &:before {
    display: inline-block;
    position: absolute;

    content: '';
    width: 14px;
    height: 14px;
    border-radius: 50%;
    top: calc(50% - 9px);
    left: 8px;
    border: 2px solid var(--primary-color);
  }

  &:after {
    display: inline-block;
    position: absolute;

    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    top: calc(50% - 4px);
    left: 13px;
    transform: rotate(-45deg);
    background-color: #ffffff;

    opacity: 0;
  }

  input:checked + & {
    background-color: var(--primary-color);
    border: 2px solid var(--primary-color);
    color: #ffffff;
    font-weight: bold;

    &:before {
      border: 2px solid #ffffff;
    }
    &:after {
      opacity: 1;
    }
  }
`

export default FormRadio
