import styled from 'styled-components'
import inputStyle from './mixins/inputStyle'

const FormTextarea = styled.textarea`
  ${inputStyle}
  min-height: 10em;
  resize: vertical;
`

export default FormTextarea
