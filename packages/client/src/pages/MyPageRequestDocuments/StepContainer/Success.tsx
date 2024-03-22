import FormButton from '../../../components/form/FormButton'
import FormItem from '../../../components/form/FormItem'
import FormSection from '../../../components/form/FormSection'
import { getTypeTextByValue, getReasonTextByValue } from './StepContainer'
import type { MuscadineDocumentRequest } from 'muscadine'

interface Props {
  request: MuscadineDocumentRequest | undefined
  requestId: string | undefined
  initialize: () => void
}
const Success: React.FC<Props> = (props) => (
  (props.request && <>
    <h3>書類申請が送信されました</h3>
    <p>書類申請の送信が完了しました。</p>
    <table>
      <tbody>
        <tr>
          <th>申請コード</th>
          <td>{props.requestId}</td>
        </tr>
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
        <FormButton onClick={props.initialize}>新しい申請を行う</FormButton>
      </FormItem>
    </FormSection>
  </>) ?? null
)
export default Success
