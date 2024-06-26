import { useCallback, useEffect, useMemo, useState } from 'react'

import FormButton from '../../../components/form/FormButton'
import FormInput from '../../../components/form/FormInput'
import FormItem from '../../../components/form/FormItem'
import FormLabel from '../../../components/form/FormLabel'
import FormRadio from '../../../components/form/FormRadio'
import FormSection from '../../../components/form/FormSection'
import FormSelect from '../../../components/form/FormSelect'
import FormTextarea from '../../../components/form/FormTextarea'

import { requestTypes, requestReasons } from './StepContainer'
import type { MuscadineDocumentRequest } from 'muscadine'

const remarksMinLength = 10

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

  const remarksBlock = useMemo(() => {
    if (request.type === 'id-card') {
      return (
        <>
          <p>
            <b>IDカードに印字する名前、及び、顔出しの可否については「登録情報編集」で変更してください。</b>
          </p>
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
        </>
      )
    } else if (request.type === 'business-card') {
      return (
        <p>
          <b>名刺に印字される名前は本名のみとなります。</b>
        </p>
      )
    }
  }, [request.type])

  const normalizeRemarks = useMemo(() => request.remarks.trim().replaceAll(/\s/g, ''), [request.remarks])
  const isRemarksValid = useMemo(() => normalizeRemarks.length >= 10, [normalizeRemarks])

  const allValid = useMemo(() => {
    return request.type && request.reason && isRemarksValid
  }, [request])

  const handleSubmit = useCallback(() => {
    props.nextStep(request)
  }, [request])

  useEffect(() => {
    if (!props.request) return
    setRequest(props.request)
  }, [props.request])

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
      </FormSection>
      <FormSection>
        {remarksBlock}
      </FormSection>
      <FormSection>
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
          <FormTextarea value={request.remarks} onChange={e => setRequest(s => ({ ...s, remarks: e.target.value }))} placeholder="発行申請する理由を10文字以上で簡潔に記入してください。" />
          <FormLabel>{normalizeRemarks.length} / {remarksMinLength}</FormLabel>
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
