import type { MuscadineDocumentRequest } from 'muscadine'
import { getTypeTextByValue, getReasonTextByValue } from './StepContainer'
import FormSection from '../../../components/form/FormSection'
import FormItem from '../../../components/form/FormItem'
import FormButton from '../../../components/form/FormButton'

interface Props {
  request: MuscadineDocumentRequest | undefined
  prevStep: () => void
  submit: () => void
}
const Confirm: React.FC<Props> = (props) => {
  return (
    (props.request && <>
      <h3>内容確認</h3>
      <table>
        <tbody>
          <tr>
            <th>申請書類</th>
            <td>{getTypeTextByValue(props.request.type)}</td>
          </tr>
          <tr>
            <th>申請理由</th>
            <td>{getReasonTextByValue(props.request.reason)}</td>
          </tr>
          <tr>
            <th>備考</th>
            <td>{props.request.remarks || '(空欄)'}</td>
          </tr>
        </tbody>
      </table>
      <FormSection>
        <FormItem>
          <FormButton color="default" onClick={props.prevStep}>修正する</FormButton>
          <FormButton onClick={props.submit}>送信する</FormButton>
        </FormItem>
      </FormSection>
    </>) ?? null
  )
}
export default Confirm
