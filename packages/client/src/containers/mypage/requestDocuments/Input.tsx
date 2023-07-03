import { useEffect, useMemo, useState } from 'react'
import type { MuscadineDocumentRequest } from 'muscadine'

import FormButton from '../../../components/form/FormButton'
import FormItem from '../../../components/form/FormItem'
import FormLabel from '../../../components/form/FormLabel'
import FormRadio from '../../../components/form/FormRadio'
import FormSection from '../../../components/form/FormSection'
import FormTextarea from '../../../components/form/FormTextarea'

import { requestTypes, requestReasons } from './StepContainer'
import FormInput from '../../../components/form/FormInput'
import FormSelect from '../../../components/form/FormSelect'

interface Props {
  request: MuscadineDocumentRequest | undefined
  displayName: string | undefined
  allowShownFace: boolean | undefined
  nextStep: (request: MuscadineDocumentRequest) => void
}
const Input: React.FC<Props> = (props) => {
  const [request, setRequest] = useState<MuscadineDocumentRequest>({
    type: '',
    reason: '',
    remarks: ''
  })

  const onInitialize: () => void =
    () => {
      if (!props.request) return
      setRequest(props.request)
    }
  useEffect(onInitialize, [props.request])

  const handleSubmit: () => void =
    () => {
      props.nextStep(request)
    }

  const allValid = useMemo(() => {
    return request.type && request.reason
  }, [request])

  return (
    <>
      <FormSection>
        <FormItem>
          <FormLabel>申請書類</FormLabel>
          <FormRadio
            name="type"
            values={requestTypes}
            value={request.type}
            onChange={(type) => setRequest(s => ({ ...s, type }))} />
        </FormItem>
        <FormItem>
          <FormLabel>申請理由</FormLabel>
          <FormRadio
            name="reason"
            values={requestReasons}
            value={request.reason}
            onChange={(reason) => setRequest(s => ({ ...s, reason }))} />
        </FormItem>
        <FormItem>
          <FormLabel>備考</FormLabel>
          <FormTextarea value={request.remarks} onChange={e => setRequest(s => ({ ...s, remarks: e.target.value }))} />
        </FormItem>
      </FormSection>
      <FormSection>
        <FormItem>
          <FormLabel>表示名</FormLabel>
          <FormInput value={props.displayName} disabled />
        </FormItem>
        <FormItem>
          <FormLabel>顔出し可否</FormLabel>
          <FormSelect disabled>
            <option>顔出し{props.allowShownFace ? 'OK' : 'NG'}</option>
          </FormSelect>
        </FormItem>
        <p>
          <b>書類に印字する名前、及び、顔出しの可否については「登録情報編集」で変更してください。</b>
        </p>
      </FormSection>
      <FormSection>
        <FormItem>
          <FormButton onClick={handleSubmit} disabled={!allValid}>内容確認</FormButton>
        </FormItem>
      </FormSection>
    </>
  )
}

export default Input
