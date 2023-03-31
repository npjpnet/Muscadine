import { useEffect, useMemo, useState } from 'react'
import type { MuscadineDocumentRequest } from 'muscadine'

import FormButton from '../../../components/form/FormButton'
import FormItem from '../../../components/form/FormItem'
import FormLabel from '../../../components/form/FormLabel'
import FormRadio from '../../../components/form/FormRadio'
import FormSection from '../../../components/form/FormSection'
import FormTextarea from '../../../components/form/FormTextarea'

import { requestTypes, requestReasons } from './StepContainer'

interface Props {
  request: MuscadineDocumentRequest | undefined
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
          <FormButton onClick={handleSubmit} disabled={!allValid}>内容確認</FormButton>
        </FormItem>
      </FormSection>
    </>
  )
}

export default Input
